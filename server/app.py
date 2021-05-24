from flask import Flask, request, jsonify, json
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import pandas as pd
import os
import operator
from bson import json_util
from bs4 import BeautifulSoup
import requests
from datetime import datetime
from pandas import json_normalize
from collections import OrderedDict
import numpy as np
import re
import json


app = Flask(__name__)
CORS(app)

load_dotenv(verbose=True)
FLASK_MONGO = os.getenv('FLASK_MONGO')

client = MongoClient(FLASK_MONGO)
mydb = client["myhouse"]

gets = {'location': '강원도-전체선택', 'point': [{'bigname': '이웃', 'name': '노령화지수', 'view': '노령화지수가 낮은 지역이면 좋겠어요!.', 'sido': 1, 'Positive': 0}, {'bigname': '취업/창업', 'name': '순이동인구', 'view': '순이동 인구가 많은 지역이면 좋겠어요!.', 'sido': 0,
                                                                                                                                          'Positive': 1}, {'bigname': '안전', 'name': '스트레스인지율', 'view': '스트레스 인지율이 낮은 지역이면 좋겠어요!.', 'sido': 0, 'Positive': 0}, {'bigname': '안전', 'name': 'cctv', 'view': 'CCTV 감시 취약 지수가 낮은 지역이면 좋겠어요!.', 'sido': 1, 'Positive': 0}]}


@app.route('/posts', methods=['GET', 'POST'])
def postTest():
    content = request.json
    #content = gets
    print(content)
    poi = []
    sid = pd.DataFrame()
    loc = content["location"].split('-')

    if "전국" in content["location"]:
        result = mydb["point"].find({})
        df = pd.DataFrame(result)
    elif "전체선택" in content["location"]:
        result = mydb["point"].find({"sido": loc[0]})
        df = pd.DataFrame(result)
    else:
        result = mydb["point"].find({"sido": loc[0], "city": loc[1]})
        df = pd.DataFrame(result)

    df = df.replace('0', np.NaN)
    important = 100
    cnt = 0
    for i, points in enumerate(content["point"]):
        if points["sido"] == 1:  # 읍면동
            name = points["name"]
            poi.append(name)
            temp = important/330
            if points["Positive"] == 0:
                df[name] = (1 - df[name].astype(float))*temp
            else:
                df[name] = df[name].astype(float)*temp
        elif "전국" == loc[0]:
            #sido = list(mydb[points["name"]].find({}))
            nm = points["name"]
            sido = mydb[nm].find({}).sort(nm, -1).limit(10)
            tp = pd.DataFrame(sido)
            sid = pd.concat([tp, sid], ignore_index=True)
            cnt = cnt + 1
        else:
            nm = points["name"]
            sido = mydb[nm].find({"sido": loc[0]}, {"_id": 0}).sort(nm, -1).limit(10)
            tp = pd.DataFrame(sido)
            sid = pd.concat([tp, sid], ignore_index=True)
            cnt = cnt + 1
        important = important - 20
    if cnt == len(content["point"]):
        df = pd.DataFrame()
    else:
        dfd = df.loc[:, poi].astype(float).sum(axis=1)
        # print(dfd)
        df = pd.concat([df, dfd], axis=1)
        dfs = df.sort_values(by=[0],  ascending=[False]).head(10)
        # 상위 10개 지역 추출 완료
    #########################################################################
        locat = list(dfs["tot_oa_cd"])
        results = mydb["val"].find({"tot_oa_cd": {"$in": locat}})
        df = pd.DataFrame(results)
        poi.append("city")
        poi.append('tot_oa_cd')
        poi.append("dong")
        df = df.loc[:, poi]

        sorterIndex = dict(zip(locat, range(len(locat))))
        df["sorter"] = df["tot_oa_cd"].map(sorterIndex)
        df.sort_values("sorter", inplace=True)
        df.drop('sorter', 1, inplace=True)  # sorter 열 삭제

    res = pd.concat([df, sid])
    res.reset_index(drop=True, inplace=True)
    res = res.replace(np.NaN, '0')
    print(res)
    tem = res.to_json(orient="records")

    return tem


@app.route('/getpolygon', methods=['GET', 'POST'])
def poster():
    content = request.json
    code = content["city"][0:7]
    result = list(mydb["polygon"].find({"properties.ADM_DR_CD": code}))
    poly = result[0]["geometry"]["coordinates"]
    return json.dumps(poly, default=json_util.default)

# 한국부동산뉴스 크롤링
# http://www.karnews.or.kr/news/articleList.html?sc_section_code=S1N1&view_type=sm


@app.route('/getNews', methods=['GET'])
def postery():
    req = requests.get("http://www.karnews.or.kr/news/articleList.html?sc_section_code=S1N1&view_type=sm",
                       headers={'User-Agent': 'Mozilla/5.0'})
    if req.status_code == 200:
        date = str(datetime.now())
        date = date[:date.rfind(':')].replace(' ', '_')
        date = date.replace(':', '시') + '분'
        soup = BeautifulSoup(req.text, "html.parser")

        articles = soup.select("ul.type2 > li")
        print(articles[0])
        l = []
        for item in articles:
            d = {}
            title = item.select("li > div > h4 > a")
            d["tile"] = title[0].text
            link = item.select("li > div > a")
            d["link"] = "http://www.karnews.or.kr" + link[0]['href']
            text = item.select("li > div > p > a")
            try:
                d["text"] = str(text[0]).split(" = ")[1]
            except:
                d["text"] = text[0].text.lstrip()
            l.append(d)
        return jsonify(l)


if __name__ == '__main__':

    app.run(host='127.0.0.1:5000')
