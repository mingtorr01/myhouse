import pandas as pd
import os

path_dir = './인구총조사_가구3'
file_list = os.listdir(path_dir)


table = pd.read_csv("./SGIS_집계구별_통계항목코드_2019.csv")[['종목', '통계항목', '코드']]

for file in file_list:
    print(file)
    data = pd.read_csv(path_dir+'/' + file)[['base_year', 'item', 'value', '시도명칭', '시군구명칭', '읍면동명칭']]

    item_code = []
    item_class = []

    for code in data['item']:
        state = table['코드'] == code
        item_code.append(list(table['통계항목'][state])[0])
        item_class.append(list(table['종목'][state])[0])
    result = pd.DataFrame({'종목': item_class, '통계항목': item_code})

    data.drop(['item'], axis=1, inplace=True)
    frame = pd.concat([data, result], axis=1)  # 데이터 합치기
    result_path = path_dir[:-1]+'4/' + file
    if os.path.isdir(path_dir[:-1]+'4') == False:
        os.mkdir(path_dir[:-1]+'4')
    frame.to_csv(result_path, encoding='utf-8-sig')
print('작업완료')
