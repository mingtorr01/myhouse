import csv
import json

trade_csv_filename = './office_rents.csv'
count = 0
cnt = 400000
li = []
with open(trade_csv_filename, newline='', encoding='UTF8') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    print(reader)
    for address, detailed_address, year, month, day, build_year, deposit, rental_fee, city, \
            sub_city, dong, code, name, floor, exclusive_private_area, date, latitude, longitude in reader:

        count += 1
        json_result = "{ \"index\" : { \"_index\": \"office_rents\", \"_type\": \"office_rent\"} } \n"
        json_result += "{"
        json_result += "\"address\":" + "\"" + address + "\"" + ","
        json_result += "\"detailed_address\":" + "\"" + detailed_address + "\"" + ","
        json_result += "\"year\":" + year + ","
        json_result += "\"month\":" + month + ","
        json_result += "\"build_year\":" + build_year + ","
        json_result += "\"deposit\":" + deposit + ","
        json_result += "\"rental_fee\":" + rental_fee + ","
        json_result += "\"city\":" + "\"" + city + "\"" + ","
        json_result += "\"sub_city\":" + "\"" + sub_city + "\"" + ","
        json_result += "\"dong\":" + "\"" + dong + "\"" + ","
        json_result += "\"code\":" + "\"" + code + "\"" + ","
        json_result += "\"name\":" + "\"" + name + "\"" + ","
        json_result += "\"floor\":" + floor + ","
        json_result += "\"exclusive_private_area\":" + exclusive_private_area + ","
        json_result += "\"date\":" + "\"" + date + "\"" + ","
        json_result += "\"location\":" + "{"
        json_result += "\"lat\":" + latitude + ","
        json_result += "\"lon\":" + longitude
        json_result += "}"
        json_result += "}\n"
        li.append(json_result)

        if count == cnt:
            print("hi")
            trade_csv_out_filename = 'result' + str(cnt) + '.csv'
            with open(trade_csv_out_filename, "w", encoding='UTF8') as f:
                for e in li:
                    f.write(e)
            print(str(cnt)+" 저장")
            cnt = cnt + 400000
            li = []
       # print("count : ", count, ", address : ", address, "lat,lng ", latitude, ", ", longitude)


print(count)
trade_csv_out_filename = 'result2.csv'
with open(trade_csv_out_filename, "w", encoding='UTF8') as f:
    for e in li:
        f.write(e)
print("#complte")
