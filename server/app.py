from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import pandas as pd
import os
import operator


app = Flask(__name__)
CORS(app)

load_dotenv(verbose=True)
FLASK_MONGO = os.getenv('FLASK_MONGO')

client = MongoClient(FLASK_MONGO)
mydb = client["myhouse"]

gets = {'location': '경상북도-청도군', 'point': [{'bigname': '주택', 'name': '다세대주택수', 'range': 1.5}, {'bigname': '주택', 'name': '단독주택수', 'range': 1.2}]}


@app.route('/posts', methods=['GET', 'POST'])
def postTest():
    content = request.json
    print(content)
    loc = content["location"].split('-')
    poi = []
    result = mydb["point"].find({"sido": loc[0], "city": loc[1]})
    df = pd.DataFrame(result)

    for points in content["point"]:
        name = points["name"]
        print(name)
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
    poi.append("tot_oa_cd")
    poi.append("dong")
    df = df.loc[:, poi]

    sorterIndex = dict(zip(locat, range(len(locat))))
    df["sorter"] = df["tot_oa_cd"].map(sorterIndex)
    df.sort_values("sorter", inplace=True)
    df.drop('sorter', 1, inplace=True)  # sorter 열 삭제
    print(df)
    jsonfiles = df.to_json(orient='records')
    return jsonfiles


if __name__ == '__main__':

    app.run(host='127.0.0.1:5000')
