import pandas as pd
import glob
import os

l = glob.glob(r'./crawling/data/123/apartment_trade_20*.csv')
# glob 모듈의 glob 함수는 사용자가 제시한 조건에 맞는 파일명을 리스트 형식으로 반환한다.
# 원시(raw) 문자열 옵션

file_path = os.getcwd() + "/crawling/data2/apartment_trade_data"

for i, path in enumerate(l):
    print(path)
    if i == 0:
        processed_data = pd.read_csv(path, header=None, skiprows=[0], low_memory=False)
        processed_data.to_csv(path, encoding='utf-8-sig')
