import pandas as pd


file_name = './2020년기준_2019년_주택유형별주택.csv'
df = pd.read_csv(file_name)[['tot_oa_cd',	'다세대',	'단독주택',	'아파트',	'연립주택',	'영업용 건물 내 주택', '주택이외 거처',	'자료없는 집계구',	'시도명칭',	'시군구명칭',	'읍면동명칭', '총주택(거처)수']]

df = df.fillna(0)
_sum = df['다세대']+df['아파트']+df['연립주택']
result = _sum / df['총주택(거처)수']*100
# print(result)

normalization_df = (result - result.min()) / (result.max() - result.min())
result2 = pd.DataFrame({'지수': normalization_df, 'sum': _sum})

frame = pd.concat([df, result2], axis=1)  # 데이터 합치기

df_s = frame.sort_values(by=["지수", "sum", '총주택(거처)수'],  ascending=[False, False, False])
df_s = df_s.reset_index(drop=True)
df_s.index.name = "rank"
print(df_s)
result_path = './결과/다세대주택수.csv'
df_s.to_csv(result_path, encoding='utf-8-sig')
print("#작업완료")
