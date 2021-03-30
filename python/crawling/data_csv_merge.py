import pandas as pd
import glob

l = glob.glob(r'./crawling/data/apartment_trade_data/apartment_trade_20*.csv')
for i, path in enumerate(l):
    print(path)
    if i == 0:
        processed_data = pd.read_csv(path, header=None, skiprows=[0])
    else:
        data = pd.read_csv(path, header=None, skiprows=[0])
        processed_data = pd.concat([processed_data, data])

processed_data.to_csv(r'./apartment_trade_data_all.csv', index=False,encoding='utf-8-sig')