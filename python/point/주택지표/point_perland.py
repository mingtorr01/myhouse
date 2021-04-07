import pandas as pd


file_name = './인구1인당_도시지역_면적.csv'
df = pd.read_csv(file_name)[['시도']]
#df = pd.read_csv(file_name)[['시도', '시군구', '인구', '면적', '1인당면적', '주거지역', '상업지역', '공업지역', '녹지지역']]

df = df.fillna(0)


df_s = df.sort_values(by=["1인당면적", "도시지역 면적 (㎡)", '도시지역 인구 (명)'],  ascending=[False, False, False])
df_s = df_s.reset_index(drop=True)
df_s.index.name = "rank"
print(df_s)
result_path = './1인당면적.csv'
df_s.to_csv(result_path, encoding='utf-8-sig')
print("작업완료")
