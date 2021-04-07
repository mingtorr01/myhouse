import pandas as pd


file_name = './녹지(녹피)면적비율.csv'
df = pd.read_csv(file_name)[['시도', '시군구',	'녹지(녹피)면적비율(%)',	'총 녹지(녹피)면적(㎢)',	'행정구역면적(㎢)']]

df = df.fillna(0)

arr = df['녹지(녹피)면적비율(%)']

normalization_df = (arr - arr.min()) / (arr.max() - arr.min())
# print(normalization_df.sort_values())

result2 = pd.DataFrame({'녹지면적지표': normalization_df})
frame = pd.concat([df, result2], axis=1)  # 데이터 합치기

df_s = frame.sort_values(by=["녹지면적지표", '총 녹지(녹피)면적(㎢)', "행정구역면적(㎢)", ],  ascending=[False, False, False])
df_s = df_s.reset_index(drop=True)
df_s.index.name = "rank"
print(df_s)
result_path = './녹지비율.csv'
df_s.to_csv(result_path, encoding='utf-8-sig')
print("작업완료")
