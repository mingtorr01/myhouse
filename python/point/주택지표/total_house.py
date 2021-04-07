import pandas as pd


file_name = './2020년기준_2019년_주택총괄_총주택(거처)수.csv'
df = pd.read_csv(file_name)[['tot_oa_cd',	'총주택(거처)수',	'시도명칭',	'시군구명칭',	'읍면동명칭']]

df = df.fillna(0)

arr = df['총주택(거처)수']

normalization_df = (arr - arr.min()) / (arr.max() - arr.min())
# print(normalization_df.sort_values())

result2 = pd.DataFrame({'총주택수지표': normalization_df})
frame = pd.concat([df, result2], axis=1)  # 데이터 합치기
df = frame.sort_values(by=['총주택수지표'],  ascending=[False])


df = df.reset_index(drop=True)
df.index.name = "rank"
result_path = './결과/총주택수.csv'
df.to_csv(result_path, encoding='utf-8-sig')
print("작업완료")
