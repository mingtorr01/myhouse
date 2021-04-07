import pandas as pd


file_name = './시세통계_면적당평균가_202103_6170599950646687.csv'
df = pd.read_csv(file_name)[['시도'	, '구시군',	'동읍면',	'값',	'202003',	'202004',	'202005',	'202006',	'202007',	'202008',	'202009',	'202010',	'202011',	'202012',	'202101',	'202102',	'202103']]

df = df.fillna(0)
drop_values = ['㎡당 매매평균가']
data = []
cu = df[(df['값'].str.contains('㎡당 전세평균가'))]

df_s = cu.sort_values(by=["202103", "202102", '202101', '202012', '202011'],  ascending=[False, False, False, False, False])
df_s = df_s.reset_index(drop=True)
print(df_s)
result_path = './아파트전세가격.csv'
df_s.to_csv(result_path, encoding='utf-8-sig')
print("작업완료")
