import csv
import json

trade_csv_filename = './resl.csv'
count = 0
li = []
with open(trade_csv_filename, newline='', encoding='UTF8') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    print(reader)
    for sido, city, dong in reader:

        json_result = "{ \"index\" : { \"_index\": \"autocomplete\", \"_id\": \"" + str(count) + "\"} } \n"
        json_result += "{"
        json_result += "\"word\":" + "\"" + sido + " " + city + " " + dong + "\""
        json_result += "}"
        json_result += "}\n"
        count += 1
        li.append(json_result)


trade_csv_out_filename = 'result2.csv'
with open(trade_csv_out_filename, "w", encoding='UTF8') as f:
    for e in li:
        f.write(e)
print("#complte")
