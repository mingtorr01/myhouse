import pandas as pd
import glob
import os
from urllib.parse import quote  # URL을 구성 요소로 구문 분석


path = './apartment_trade_data_all.csv'
data = pd.read_csv(path, header=None, skiprows=[0])  # 외부 text 파일, csv 파일을 불러와서 DataFrame으로 저장

processed_data = pd.DataFrame()

new = pd.DataFrame()
new = pd.concat([new, data[13]])
new.to_csv(r'./apartment_trade_data_all.csv', index=False, encoding='utf-8-sig')
