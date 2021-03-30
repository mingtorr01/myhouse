import pandas as pd
import os

path_dir = './인구총조사_가구2'
file_list = os.listdir(path_dir)


table = pd.read_csv("./adm_code.csv")[['시도코드', '시도명칭', '시군구코드', '시군구명칭', '읍면동코드', '읍면동명칭']]

for file in file_list:
    print(file)
    data = pd.read_csv(path_dir+'/' + file)[['base_year', 'tot_oa_cd', 'item', 'value']]

    city = []
    goon = []
    dong = []

    data['tot_oa_cd'] = data['tot_oa_cd'].astype(str).str[:7]  # 읍면동 코드만 남기고 집계구 코드 절삭

    for code in data['tot_oa_cd']:
        state = table['읍면동코드'].astype(str) == code
        city.append(list(table['시도명칭'][state])[0])
        goon.append(list(table['시군구명칭'][state])[0])
        dong.append(list(table['읍면동명칭'][state])[0])
    result = pd.DataFrame({'시도명칭': city, '시군구명칭': goon, '읍면동명칭': dong})

    data.drop(['tot_oa_cd'], axis=1, inplace=True)
    frame = pd.concat([data, result], axis=1)  # 데이터 합치기
    result_path = path_dir[:-1]+'3/' + file
    if os.path.isdir(path_dir[:-1]+'3') == False:
        os.mkdir(path_dir[:-1]+'3')
    frame.to_csv(result_path, encoding='utf-8-sig')
print('작업완료')
