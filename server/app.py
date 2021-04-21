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

app = Flask(__name__)
CORS(app)

load_dotenv(verbose=True)
FLASK_MONGO = os.getenv('FLASK_MONGO')

client = MongoClient(FLASK_MONGO)
mydb = client["myhouse"]

gets = {'location': '전국-전체선택', 'point': [{'bigname': '지역인구', 'name': '인구밀도', 'range': 1}, {'bigname': '지역인구', 'name': '총인구', 'range': 1},
                                         {'bigname': '지역인구', 'name': '평균나이', 'range': 1}, {'bigname': '지역인구', 'name': '평균가구원수', 'range': 1}, {'bigname': '지역인구', 'name': '노령화지수', 'range': 1}]}


@app.route('/posts', methods=['GET', 'POST'])
def postTest():
    content = request.json
    print(content)
    poi = []
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

    for points in content["point"]:
        name = points["name"]
        poi.append(name)
        df[name] = df[name].astype(float)*float(points["range"])

    dfd = df.loc[:, poi].astype(float).sum(axis=1)
    df = pd.concat([df, dfd], axis=1)
    dfs = df.sort_values(by=[0],  ascending=[False]).head(10)
    print(dfs)

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
    print(df)
    jsonfiles = df.to_json(orient='records')
    return jsonfiles


@app.route('/getpolygon', methods=['GET', 'POST'])
def poster():
    content = request.json
    result = list(mydb["polygon"].find({"properties.EMD_NM": content["city"]}))
    poly = result[0]["geometry"]["coordinates"]
    return json.dumps(poly, default=json_util.default)

# 한국부동산뉴스 크롤링
# http://www.karnews.or.kr/news/articleList.html?sc_section_code=S1N1&view_type=sm


@app.route('/getNews', methods=['GET'])
def poster():
    raw = requests.get("http://www.karnews.or.kr/news/articleList.html?sc_section_code=S1N1&view_type=sm",
                       headers={'User-Agent': 'Mozilla/5.0'})
    if raw.status_code == 200:
        html = BeautifulSoup(raw.text, "html.parser")
        title = html.select_one()


if __name__ == '__main__':

    app.run(host='127.0.0.1:5000')
