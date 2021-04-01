import pandas as pd
import os

path_dir = './인구총조사_주택'
file_list = os.listdir(path_dir)

for file in file_list:

    data = pd.read_csv(path_dir+'/' + file, sep='^')[['base_year', 'tot_oa_cd', 'item', 'value']]
    state = data['value'] == 'NaN'
    print(data.isnull().sum())
    data.dropna(inplace=True)
    print('==============================================')
    print(data.isnull().sum())

    result_path = './' + path_dir+'2/' + file.split('.')[0] + '.csv'
    data.to_csv(result_path)

print('작업완료')
