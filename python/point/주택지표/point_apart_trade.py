import pandas as pd

import pandas as pd
from bs4 import BeautifulSoup
from urllib.request import urlopen
import datetime
from imp import reload
from time import sleep
import os
from urllib.error import URLError, HTTPError
from http.client import IncompleteRead
import sys
from urllib import parse

file_name = './시세통계_면적당평균가_202103_6170599950646687.csv'
df = pd.read_csv(file_name)[['시도'	, '구시군',	'동읍면',	'값',	'202003',	'202004',	'202005',	'202006',	'202007',	'202008',	'202009',	'202010',	'202011',	'202012',	'202101',	'202102',	'202103']]


def request2(address):
    end_point = 'http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address='
    parameter = '&simple=false&format=xml&type=road&key=4B965C29-19B8-3860-99A6-F18FD4CD79C7'
    query = parse.quote(address)
    url = end_point + query + parameter

    print(url)
    try:
        resultXML = urlopen(url)
    except HTTPError as e:
        print("502 error caused reply" + e)
        request2(address)
    except IncompleteRead:
        # Oh well, reconnect and keep trucking
        print("_chunk_size Error")
        request2(address)
    except URLError as e:
        print(e.reason)
        request2(address)
    else:
        result = resultXML.read()
        xmlsoup = BeautifulSoup(result, 'lxml-xml')
        items = xmlsoup.findAll("point")
        print(items)
        df = pd.DataFrame()

        for item in items:
            nx = item.find("x").text
            ny = item.find("y").text
            temp = pd.DataFrame({'nx': nx, 'ny': ny})
            df = pd.concat([df, temp])
            '''
            try:
                _nx = item.find("x").text
                _ny = item.find("y").text
                temp = pd.DataFrame({'nx': _nx, 'ny': _ny})
                df = pd.concat([df, temp])
            except:
                print("error")'''

    df = df.reset_index(drop=True)
    return df

    '''
        rows = []
        for node in xtree:
            print(node)
            nx = node.find("x").text
            ny = node.find("y").text
            rows.append({"nx": nx, "ny": ny})
            print(rows)'''


df = request2('제주특별자치도 제주시 화북일동')
print(df)

'''
arr = df['시도'] + " " + df['구시군'] + " "+df['동읍면']

for data in arr:
    if data not in '-':
        print(data)


df = df.fillna(0)
drop_values = ['㎡당 매매평균가']
data = []
cu = df[(df['값'].str.contains('㎡당 매매평균가'))]

df_s = cu.sort_values(by=["202103", "202102", '202101', '202012', '202011'],  ascending=[False, False, False, False, False])
df_s = df_s.reset_index(drop=True)
print(df_s)
result_path = './아파트매매가격.csv'
df_s.to_csv(result_path, encoding='utf-8-sig')
print("작업완료")
'''
