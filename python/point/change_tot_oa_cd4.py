import pandas as pd
import os

path_dir = './인구총조사_주택2'
file_list = os.listdir(path_dir)


table = pd.read_csv("./adm_code.csv")[['시도코드', '시도명칭', '시군구코드', '시군구명칭', '읍면동코드', '읍면동명칭']]
table2 = pd.read_csv("./SGIS_집계구별_통계항목코드_2019_3.csv")[['종목', '통계항목', '코드']]

for file in file_list:
    print(file)
    df = pd.read_csv(path_dir+'/' + file)[['base_year', 'tot_oa_cd', 'item', 'value']]

    df = df.drop(["base_year"], axis=1)
    pivoted = df.pivot(index='tot_oa_cd', columns='item', values='value')\
        .reset_index()

    for i in list(pivoted.columns):
        # print(i)

        state = table2['코드'].astype(str) == i
        try:
            if list(table2['종목'][state])[0] not in {'건축년도별 주택(~2010년)', '사업체수(2000년~2005년)/ 8차 산업분류', '사업체수(2006년~2015년)/ 9차 산업분류', '종사자수(2000년~2005년)/ 8차 산업분류', '종사자수(2000년~2005년)/ 9차 산업분류'}:
                pivoted.rename(columns={i: list(table2['통계항목'][state])[0]}, inplace=True)
            else:
                pivoted.drop(i, axis=1, inplace=True)
        except:
            print("없음")
    print(pivoted)
    city = []
    goon = []
    dong = []

    list2 = pivoted['tot_oa_cd'].astype(str).str[:7]  # 읍면동 코드만 남기고 집계구 코드 절삭

    for code in list2:
        state = table['읍면동코드'].astype(str) == code
        city.append(list(table['시도명칭'][state])[0])
        goon.append(list(table['시군구명칭'][state])[0])
        dong.append(list(table['읍면동명칭'][state])[0])
    result2 = pd.DataFrame({'시도명칭': city, '시군구명칭': goon, '읍면동명칭': dong})

    frame = pd.concat([pivoted, result2], axis=1)  # 데이터 합치기

    result_path = path_dir[:-1]+'3/' + file
    if os.path.isdir(path_dir[:-1]+'3') == False:
        os.mkdir(path_dir[:-1]+'3')
    frame.to_csv(result_path, encoding='utf-8-sig')
print('작업완료')
