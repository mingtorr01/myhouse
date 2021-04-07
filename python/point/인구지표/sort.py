import pandas as pd


file_name = './생산가능나이.csv'
df = pd.read_csv(file_name)[['rank', 'tot_oa_cd',	'시도명칭',	'시군구명칭',	'읍면동명칭', 'total', '총인구', 'result']]

df = df.fillna(0)
df = df.sort_values(by=['tot_oa_cd'],  ascending=[True])
df = df.reset_index(drop=True)
print(df)
result_path = './생산가능나이2.csv'
df.to_csv(result_path, encoding='utf-8-sig')
print("작업완료")
