# 공공데이터를 활용한 사용자 선택기반 부동산 추천 플랫폼

## 작업일지

---

2020.02.19 카카오맵 연동 및 검색화면 구축  
2020.02.20 공공데이터 전처리  
2021.03.09 main 화면 프런트작업(뉴스,검색,매뉴바)  
2021.03.11 지표설정수정
2021.03.13 몽고디비 연결

## 1. 과제 도출 배경

집을 고르기 위해 대부분의 경우 직방과 다방과 같은 부동산 어플리케이션을 이용합니다. 하지만 집을 고르기 위해 대부분 일반 부동산 중개 애플리케이션의 경우 집 매물에 대한 정보만 얻을수 있을 뿐 집 주변의 정보를 알 수 없습니다. 해당 구역의 상권, 환경, 의료, 편의시설, 안전, 등의 주변정보를 확인하기 위해서는 사용자가 일일이 검색을 해야 하는 번거로움이 존재합니다. 집을 한번 구할 경우 최소 1년이상 살아야 한다는 점에서 집을 구하는 다수가 집 내부의 인테리어 뿐만이 아닌 집주면의 환경까지 고려한다고 생각하여 확실한 타겟층이 있을 것이라 생각하여 아이디어를 도출하게 되었습니다.

## 2. 활용방안

매매, 전세, 월세를 사용자가 선택하고, 환경, 교육, 의료시설, 편의시설, 안전, 교통 지표의 가중치를 사용자가 선택하면 사용자에게 지역을 추천해줍니다. 사용자가 살기 원하는 지역이 존재할 수 있으므로 지역 명으로 검색하여 지표를 확인할 수도 있습니다. 지역이 추천될 경우 해당 지역의 최근 뉴스를 크롤링하며 최근 매물들의 실 거래가 를 알려줍니다. 또한 실제 그 지역에 살고 있는 사용자가 올린 글들을 통해 해당 지역에서 실제 거주하고 있는 사용자의 의견도 들어볼 수 있습니다. 이를 통해 더 효과적으로 집을 구입하고 매매할 수 있습니다.

## 3.최종목표

공공데이터에서 제공하는 각 지역별 데이터를 수집하고 전처리하여 순위데이터로 구성합니다. 해당 순위 데이터를 토대로 사용자의 선택에 기반한 지역을 추천할 수 있습니다. REACT와 CSS를 사용하여 프론트엔드를 구축하고 NODE.JS 와 플라스크를 사용하여 백엔드를 구축합니다. AWS를 이용하여 웹서버를 배포하며 대용량의 디비 데이터를 SELECT해야 하기 때문에 NONSQL 언어를 사용한 디비를 사용합니다. 전국 POI 데이터를 수집하여 지도 데이터를 구축하고 구축한 순위 데이터와 지도 데이터를 사용자가 편리하게 볼 수 있도록 데이터 시각화도 완료해야 합니다.
