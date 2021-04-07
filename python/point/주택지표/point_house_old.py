import pandas as pd


file_name = './2020년기준_2019년_건축년도별주택.csv'
df = pd.read_csv(file_name)[['tot_oa_cd',	'1979년 이전',	'1980년~1989년', '1990년~1999년',	'2000년~2004년',	'2005년~2009년',	'2010년',	'2011년',
                             '2012년',	'2013년',	'2014년',	'2015년',	'2016년',	'2017년',	'2018년',	'2019년', '자료없는 집계구',	'시도명칭',	'시군구명칭',	'읍면동명칭', '총주택(거처)수']]

df = df.fillna(0)
_sum = df['1979년 이전']+df['1980년~1989년']+df['1990년~1999년']
result = (df['1979년 이전']+df['1980년~1989년']+df['1990년~1999년'])/df['총주택(거처)수']*100
print(result)

normalization_df = (result - result.min()) / (result.max() - result.min())

# print(normalization_df)

result2 = pd.DataFrame({'old_point': normalization_df, 'sum': result})

frame = pd.concat([df, result2], axis=1)  # 데이터 합치기
df_s = frame.sort_values(by=["old_point", "sum", '총주택(거처)수'],  ascending=[False, False, False])
df_s = df_s.reset_index(drop=True)
df_s.index.name = "rank"
print(df_s)
result_path = './결과/노후주택비율.csv'
df_s.to_csv(result_path, encoding='utf-8-sig')
print("#작업완료")
