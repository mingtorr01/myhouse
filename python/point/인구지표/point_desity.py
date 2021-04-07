import pandas as pd


file_name = './2020년기준_2019년_인구총괄(인구밀도).csv'
df = pd.read_csv(file_name)[['tot_oa_cd',	'인구밀도',	'시도명칭',	'시군구명칭',	'읍면동명칭']]

df = df.fillna(0)


result = df['인구밀도']

normalization_df = (result - result.min()) / (result.max() - result.min())
result2 = pd.DataFrame({'지수': normalization_df})

frame = pd.concat([df, result2], axis=1)  # 데이터 합치기

df_s = frame.sort_values(by=["지수"],  ascending=[False])
df_s = df_s.reset_index(drop=True)
df_s.index.name = "rank"
print(df_s)
result_path = './결과/인구밀도.csv'
df_s.to_csv(result_path, encoding='utf-8-sig')
print("#작업완료")
