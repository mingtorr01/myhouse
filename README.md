# 공공데이터를 활용한 사용자 선택기반 부동산 추천 플랫폼

## 작업일지

---


2020.02.19 카카오맵 연동 및 검색화면 구축  
2020.02.20 공공데이터 전처리  
2021.03.09 main 화면 프런트작업(뉴스,검색,매뉴바)  
2021.03.11 지표설정수정  
2021.03.13 몽고디비 연결.  
2021.03.16 데이터시각화를 위한 그래프 완성  
2021.03.19 아파트, 오피스텔, 단독주택, 연립다세대의 매매/전월세 크롤링 코드 작성완료  
2021.03.30 지표설정후 지역추천 시스템 프런트작업(표,추천리스트)
2021.04.09 지표 추천 알고리즘 완성  
2021.04.11 지표 추천 알고리즘 FLASK로 변경


---

### Intro

집을 고르기 위해 대부분의 경우 직방과 다방과 같은 부동산 어플리케이션을 이용한다. 하지만 대부분의 일반 부동산 중개 애플리케이션의 경우 매물에 대한 정보만 얻을 수 있을 뿐, 집 주변의 정보를 확인할 수 없다. 해당 구역의 상권, 환경, 의료, 편의시설, 안전, 등의 주변정보를 확인하기 위해서는 사용자가 일일이 검색을 해야 하는 번거로움이 존재한다. 집을 한번 구할 경우 최소 1년이상 살아야 한다는 점에서 집을 구하는 다수가 집 내부의 인테리어 뿐만이 아닌 집주의 환경까지 고려한다고 생각한다. 이 플랫폼에서는 사용자가 원하는 지역의 정보를 선택하고 가중치를 두어 지역을 추천한다.
 이 플랫폼에서는 전국의 지역을 법정동 단위로 나누고 각 지역의 정보를 지표로 제공한다. 지표는 크게 환경, 교육, 의료시설, 편의시설, 안전, 교통으로 나뉘며 지표 중 최대 10개를 사용자가 선택하면 해당 지표에 따라 지역을 추천한다. 추천 결과로 그 지역의 지표 정보와 최근 매물들의 실 거래가를 확인할 수 있다. 또한 지가지수, 집 주변의 상가, 학군, CCTV 정보 및 부동산 계산기를 통해 해당 지역의 집을 구매할 경우 발생하는 세금 등의 데이터 등도 제공된다. 지표로 사용되는 데이터는 공공데이터 포털, 통계청 등록 센서스, 국가 공간 정보 포털 오픈마켓 등에서 제공되는 공공데이터를 사용한다. 데이터 전처리는 결측치 제거, 지오코딩 등을 거치며 파이썬을 이용하여 진행한다. 지역추천 알고리즘은 선택된 각 지표의 상위 10개 지역의 데이터에 가중치를 곱하여 최종 추천 지역을 선택하며 자바스크립트를 이용해 진행한다. 지표의 가중치는 0~2사이의 실수 값을 사용하며 기본값은 1이다. 1이상 선택할 경우 상위 10개의 데이터를 선택하며 1미만으로 선택할 경우 하위 10개의 데이터를 선택한다. 1.1의 가중치는 상위 10개의 데이터에 10%의 가중치를 곱하고, 0.9의 가중치는 하위 10개의 데이터에 10%의 가중치를 곱한다. 해당 플랫폼에 어디서나 쉽게 접근이 가능하도록 웹페이지 형식으로 제작하며 Front-end는 자바스크립트로 작성되는 REACT라이브러리를 통해 제작한다. 
 
 
### 기대효과

 집을 고를 때 가장 오래 걸리는 시간은 ‘어느 지역이 나에게 맞는가?’ 혹은 ‘이 집이 적장한 가격인가’를 검색하는 시간일 것이다. 이 플랫폼에서는 각 지역의 데이터를 사용자 가중치에 맞춰 추천하기 때문에 그 시간을 줄일 수 있다. 또한, 각 지역의 정보를 차트와 표를 통해 한눈에 비교할 수 있기 때문에 귀촌, 귀농 혹은 이사를 고려하는 사람들의 지역 선택에 도움을 줄 수 있다.  현재 대한민국 인구의 1/5는 서울에 살고 있으며 서울공s화국이라는 단어를 통해 풍자되고 있다. 각 지역 정보를 이용자들이 더 쉽게 확인함으로써 지방으로 이주 가능성을 높여 지역경쟁력에 이바지할 수 있을 것으로 기대한다.


## 0. 사용언어

Front-end : REACT  
Back-end : Node.js - 실거래가, FALSK - 지역 추천  
DB : MongoDB  
search engine : elastic search  
data Visualization : QGIS 3.16.5
python - 3.x
development IDE : Jupyter Notebook, Visual Studio Code
## USE

### 1. Data Processing

#### 아파트 실거래가
**version**  : python  - 3.x  ,   elastic search 7.11.2
**NEED API** : Data.go.kr 실거래가 API   ,   kakao API

/python/cwawling/crawling 파일들을 이용해 실거래가 데이터들을 crawling 한다.   
API_KEY_01 에 키 저장해야 하며 각 파일들은 3달을 크롤링한다.   
이는 하나의 API KEY 가 하루 100,000 요청 가능한데 3달이 최대이기 때문이다.     
4개를 병렬로 처리하여 1년의 크롤링 가능하나 4개의 key 필요  
*주석처리 지울 경우 1년 한번에 크롤링 가능*


/python/preprocessing/Preprocessing_apartment_trade.ipynb 에서 지오코딩 및 data cleaning 실시.   
크롤링 결과 파일 preproceesing으로 이동 후 jypter Notebook 에서 .ipynb 파일 실행  
2번 셀의 APP_KEY에 KAKAO API KEY를 입력해야 함.

> 13번셀 `unique_date_df = filter_df.groupBy(filter_df.year,filter_df.month, filter_df.day).agg(count("day").alias('count'))` 에서 에러 발생할 경우 크롤링 결과파일에 index 필요  

결과 mycsv2.csv로 저장되며 csv_to_json.py 파일 실행하여 elatic search에 저장가능한 JSON 형태로 저장.  

##### Getting started with Elasticsearch local version  

Execution in windows 10 : ~ elastic search foler/bin/elasticsearch.bat 

1. 생성하기 전 인덱스가 있는지 없는지 판단하기  
   `curl -XGET http://localhost:9200/index_name`  

깔끔하게 보기 `?pretty` parameter 추가  
ex) `curl -XGET http://localhost:9200/index_name?pretty`

2. 인덱스 생성하기  
    `오피스텔 매매 : curl -XPUT http://localhost:9200/office_trades?pretty`  
    `curl -XPUT "http://localhost:9200/offices_trades/office_trade/_mapping?include_type_name=true&pretty" -d @apart_trade_mapping.json -H "Content-Type: application/json" `

    인덱스명/클래스타입/\_mapping

3. 스키마 매핑하기  
   `curl -XPUT "http://localhost:9200/apart_trade/_mapping" -d @apart_trade.json -H "Content-Type: application/json"`

4. 인덱스 생성 후 documents 넣기   
   `curl -XPOST http://localhost:9200/classess/class/1/ -d @one.json`

5. 대용량 파일일 경우 bulk로 넣기  
   `curl -XPOST http://localhost:9200/_bulk?pretty --data-binary @apart_trade.csv -H "Content-Type: application/json" `


#### 지표 추천 알고리즘
**version**  : python  - 3.x  ,   mongoDB

DATA LIST

![datalist](https://github.com/Mingtorr/myhouse/blob/master/iamges/data_list.png)
데이터 필요 시 Mingtorr@gmail.com 으로 연락하세요.


### 2. Run

**엘라스틱 서치 실행 필요.** project root folder에서 `npm run start , npm run start_flask , cd server && node server.js` 각각 입력하여 react , node.js, flask 서버 실행  
/src/.env 파일에 아래 항목 작성
```
REACT_APP_KAKAOMAP_API_URL = "YOUR KAKAOMAP API KEY"
REACT_APP_FONT_AWESOME= "font awesome"
REACT_APP_MONGO_URI = "YOUR MONGODB KEY"
REACT_APP_KAKAOMAP_APP_KEY = "YOUR KEY"
```

/server/.env 에 flask server 용 환경설정 작성
```
Flask_APP = app.py
FLASK_ENV=development
FLASK_MONGO= "YOUR MONGO KEY"
```
####Sequence Diagram


marker for Apartment trading :
![marker for Apartment trading](https://github.com/Mingtorr/myhouse/blob/master/iamges/diagram.png)

Recommand System:
![Recommand System](https://github.com/Mingtorr/myhouse/blob/master/iamges/diagram2.png)

### 3. result

Main Page:
![main](https://github.com/Mingtorr/myhouse/blob/master/iamges/main.png)

Main Page marker clustering:
![main2](https://github.com/Mingtorr/myhouse/blob/master/iamges/main2.png)

Select Point Weight Page:
![Select Point Weight Page](https://github.com/Mingtorr/myhouse/blob/master/iamges/point.png)

result Page:
![result Page](https://github.com/Mingtorr/myhouse/blob/master/iamges/result.png)






