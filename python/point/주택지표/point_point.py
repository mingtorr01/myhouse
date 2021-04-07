import pandas as pd


file_name = './지가지수.csv'
df = pd.read_csv(file_name)[['지역1',	'지역2',	'지역3',	'2020년 10월'	, '2020년 11월',	'2020년 12월',	'2021년 01월',	'2021년 02월']]

df = df.fillna(0)


result = df['2021년 02월']

normalization_df = (result - result.min()) / (result.max() - result.min())
result2 = pd.DataFrame({'지수': normalization_df})

frame = pd.concat([df, result2], axis=1)  # 데이터 합치기

df_s = frame.sort_values(by=["지수", "2021년 01월", '2020년 12월'],  ascending=[False, False, False])
df_s = df_s.reset_index(drop=True)
df_s.index.name = "rank"
result_path = './결과/지가지수.csv'
df_s.to_csv(result_path, encoding='utf-8-sig')
print("#작업완료")
