### curl to Node.js

https://curl.trillworks.com/#node-request

엘라스틱 서치 사용법

1. 생성하기 전 인덱스가 있는지 없는지 판단하기
   curl -XGET http://localhost:9200/index_name

깔끔하게 보기 ?pretty

2. 인덱스 생성하기
   `오피스텔 매매 : curl -XPUT http://localhost:9200/office_trades?pretty`

"\제거해야함"
`curl -XPUT "http://localhost:9200/offices_trades/office_trade/_mapping?include_type_name=true&pretty" -d @apart_trade_mapping.json -H "Content-Type: application/json" `

인덱스명/클래스타입/\_mapping

3. 스키마 매핑하기
   `curl -XPUT "http://localhost:9200/apart_trade/_mapping" -d @apart_trade.json -H "Content-Type: application/json"`

4. 인덱스 생성 후 documents 넣기  
   `curl -XPOST http://localhost:9200/classess/class/1/ -d @one.json`

5. bulk로 넣기
   `curl -XPOST http://localhost:9200/_bulk?pretty --data-binary @apart_trade.csv -H "Content-Type: application/json" `

=======================================================================
삭제하기
curl -XDELETE http://localhost:9200/classes?pretty

생성하기
curl -XPUT http://localhost:9200/classes?pretty

확인하기
curl -XGET http://localhost:9200/classes?pretty
