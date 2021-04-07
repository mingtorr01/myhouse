import pandas as pd


file_name = './노후주택비율.csv'
df = pd.read_csv(file_name)[['tot_oa_cd',	'1979년 이전',	'1980년~1989년', '1990년~1999년',	'2000년~2004년',	'2005년~2009년',	'2010년',	'2011년',
                             '2012년',	'2013년',	'2014년',	'2015년',	'2016년',	'2017년',	'2018년',	'2019년', '자료없는 집계구',	'시도명칭',	'시군구명칭',	'읍면동명칭', '총주택(거처)수', 'old_rank']]

df = df.fillna(0)
df = df.sort_values(by=['tot_oa_cd'],  ascending=[True])
df = df.reset_index(drop=True)
print(df)
result_path = './노후주택비율2.csv'
df.to_csv(result_path, encoding='utf-8-sig')
print("작업완료")
