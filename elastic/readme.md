### curl to Node.js

https://curl.trillworks.com/#node-request

# 엘라스틱 서치 사용법

깔끔하게 보기 ?pretty

생성하기 전 인덱스가 있는지 없는지 판단하기
`curl -XGET http://localhost:9200/index_name`

삭제하기
`curl -XDELETE http://localhost:9200/classes?pretty`

생성하기
`curl -XPUT http://localhost:9200/classes?pretty`

확인하기
`curl -XGET http://localhost:9200/classes?pretty`

# 아파트 매매 데이터

1. 인덱스 생성하기
   `오피스텔 매매 : curl -XPUT http://localhost:9200/apart_trades?pretty`

2. 스키마 생성하기
   `curl -XPUT "http://localhost:9200/apart_trades/apart_trade/_mapping?include_type_name=true&pretty" -d @apart_trade_mapping.json -H "Content-Type: application/json" `


3. 스키마 매핑하기
   `curl -XPUT "http://localhost:9200/apart_trades/_mapping" -d @apart_trade.json -H "Content-Type: application/json"`

4. bulk로 넣기
   `curl -XPOST http://localhost:9200/_bulk?pretty --data-binary @apart_trade.csv -H "Content-Type: application/json" `

- 인덱스 생성 후 documents 넣기  
   `curl -XPOST http://localhost:9200/classess/class/1/ -d @one.json`

# 아파트 전월세 데이터

1. 인덱스 생성하기
   `오피스텔 매매 : curl -XPUT http://localhost:9200/apart_rents?pretty`

2. 스키마 생성하기
   `curl -XPUT "http://localhost:9200/apart_rents/apart_rent/_mapping?include_type_name=true&pretty" -d @apart_rent_mapping.json -H "Content-Type: application/json" `


3. 스키마 매핑하기
   `curl -XPUT "http://localhost:9200/apart_rents/_mapping" -d @apart_rent.json -H "Content-Type: application/json"`

4. 대량의 데이터 bulk로 넣기  
   `curl -XPOST http://localhost:9200/_bulk?pretty --data-binary @apart_rent.csv -H "Content-Type: application/json" `

- 인덱스 생성 후 documents 넣기  
   `curl -XPOST http://localhost:9200/classess/class/1/ -d @one.json`

# 오피스텔 매매 데이터

1. 인덱스 생성하기
   `오피스텔 매매 : curl -XPUT http://localhost:9200/office_trades?pretty`

2. 스키마 생성하기
   `curl -XPUT "http://localhost:9200/office_trades/office_trade/_mapping?include_type_name=true&pretty" -d @office_trade_mapping.json -H "Content-Type: application/json" `


3. 스키마 매핑하기
   `curl -XPUT "http://localhost:9200/office_trades/_mapping" -d @office_trade.json -H "Content-Type: application/json"`

4. bulk로 넣기
   `curl -XPOST http://localhost:9200/_bulk?pretty --data-binary @office_trade.csv -H "Content-Type: application/json" `

- 인덱스 생성 후 documents 넣기  
   `curl -XPOST http://localhost:9200/classess/class/1/ -d @one.json`

# 오피스텔 전월세 데이터

1. 인덱스 생성하기
   `오피스텔 매매 : curl -XPUT http://localhost:9200/office_rents?pretty`

2. 스키마 생성하기
   `curl -XPUT "http://localhost:9200/office_rents/office_rent/_mapping?include_type_name=true&pretty" -d @office_rent_mapping.json -H "Content-Type: application/json" `



3. 스키마 매핑하기
   `curl -XPUT "http://localhost:9200/office_rents/_mapping" -d @office_rent.json -H "Content-Type: application/json"`

4. 대량의 데이터 bulk로 넣기  
   `curl -XPOST http://localhost:9200/_bulk?pretty --data-binary @office_rent.csv -H "Content-Type: application/json" `

- 인덱스 생성 후 documents 넣기  
   `curl -XPOST http://localhost:9200/classess/class/1/ -d @one.json`


# 학교데이터 
1. 인덱스 생성하기 
`curl -XPUT http://localhost:9200/schools?pretty`

2. 스키마 생성하기
`curl -XPUT "http://localhost:9200/schools/school/_mapping?include_type_name=true&pretty" -d @school_mapping.json -H "Content-Type: application/json"`



3. 스키마 매핑하기
   `curl -XPUT "http://localhost:9200/schools/_mapping" -d @school_mapping.json -H "Content-Type: application/json"`

4. 대량의 데이터 bulk로 넣기  
   `curl -XPOST http://localhost:9200/_bulk?pretty --data-binary @school2.csv -H "Content-Type: application/json" `

- 인덱스 생성 후 documents 넣기  
   `curl -XPOST http://localhost:9200/classess/class/1/ -d @one.json`
