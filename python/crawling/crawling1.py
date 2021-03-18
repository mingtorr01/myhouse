# -*- coding: utf-8 -*-

import pandas as pd
from bs4 import BeautifulSoup
from urllib.request import urlopen
import datetime
from imp import reload
from time import sleep
import os
from urllib.error import URLError, HTTPError
from http.client import IncompleteRead
import sys


def collect_apartment_trade(API_KEY, year_month, city_info):
    end_point = "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade"
    service_key = "serviceKey"
    year_parameter = "DEAL_YMD"
    area_code_parameter = "LAWD_CD"
    # num_of_rows = "numOfRows" 생략가능
    # 행 갯수 1000

    area_code = city_info[0]
    city = city_info[1]
    sub_city = city_info[2]

    url = end_point + "?&" + area_code_parameter + "=" + area_code + "&" + year_parameter + "=" + year_month + "&" + service_key + "=" + API_KEY
    try:
        resultXML = urlopen(url)
    except HTTPError as e:
        print("502 error caused reply" + e)
        collect_apartment_trade(API_KEY, year_month, city_info)
    except IncompleteRead:
        # Oh well, reconnect and keep trucking
        print("_chunk_size Error")
        collect_apartment_trade(API_KEY, year_month, city_info)
    except URLError as e:
        print(e.reason)
        collect_apartment_trade(API_KEY, year_month, city_info)
    else:
        result = resultXML.read()
        xmlsoup = BeautifulSoup(result, 'lxml-xml')
        items = xmlsoup.findAll("item")

        df = pd.DataFrame()
        for item in items:
            build_year = item.find(u"건축년도").text
            trade_price = item.find(u"거래금액").text
            year = item.find(u"년").text
            month = item.find(u"월").text
            day = item.find(u"일").text
            dong = item.find(u"법정동").text
            code = item.find(u"지역코드").text
            name = item.find(u"아파트").text
            floor = item.find(u"층").text
            exclusvie_private_area = item.find(u"전용면적").text
            detailed_address = item.find(u"지번").text
            if '-' in detailed_address:
                detailed_address = detailed_address.replace("-", "=")
            try:
                fire = item.find(u"해제사유발생일").text
            except:
                detailed_address = ""
            if '-' in detailed_address:
                detailed_address = detailed_address.replace("-", "=")
            temp = pd.DataFrame(([[build_year, trade_price, year, month, day, city, sub_city, dong, code,
                                   name, floor, exclusvie_private_area, city + " " + sub_city + " " + dong, detailed_address]]),
                                columns=["build_year", "trade_price", "year", "month", "day", "city", "sub_city", "dong",
                                         "code",
                                         "name", "floor", "exclusive_private_area", "address", "detailed_address"])

            df = pd.concat([df, temp])

        df = df.reset_index(drop=True)

        return df


def collect_apartment_rent(API_KEY, year_month, city_info):
    end_point = "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptRent"

    service_key = "serviceKey"
    year_parameter = "DEAL_YMD"
    area_code_parameter = "LAWD_CD"
    # num_of_rows = "numOfRows" 생략가능
    # 행 갯수 1000

    area_code = city_info[0]
    city = city_info[1]
    sub_city = city_info[2]

    url = end_point + "?&" + area_code_parameter + "=" + area_code + "&" + year_parameter + "=" + year_month + "&" + service_key + "=" + API_KEY
    try:
        resultXML = urlopen(url)
    except HTTPError as e:
        print("502 error caused reply" + e)
        collect_apartment_rent(API_KEY, year_month, city_info)
    except IncompleteRead:
        # Oh well, reconnect and keep trucking
        print("_chunk_size Error")
        collect_apartment_rent(API_KEY, year_month, city_info)
    except URLError as e:
        print(e.reason)
        collect_apartment_rent(API_KEY, year_month, city_info)
    else:
        result = resultXML.read()
        xmlsoup = BeautifulSoup(result, 'lxml-xml')
        items = xmlsoup.findAll("item")
        df = pd.DataFrame()

        for item in items:
            try:
                build_year = item.find(u"건축년도").text
            except:
                build_year = ""
            deposit = item.find(u"보증금액").text
            rental_fee = item.find(u"월세금액").text
            year = item.find(u"년").text
            month = item.find(u"월").text
            day = item.find(u"일").text
            code = item.find(u"지역코드").text
            dong = item.find(u"법정동").text
            name = item.find(u"아파트").text
            try:
                floor = item.find(u"층").text
            except:
                floor = ""
            try:
                exclusvie_private_area = item.find(u"전용면적").text
            except:
                exclusvie_private_area = ""
            try:
                detailed_address = item.find(u"지번").text
            except:
                detailed_address = ""
            if '-' in detailed_address:
                detailed_address = detailed_address.replace("-", "=")
            temp = pd.DataFrame(([[build_year, deposit, rental_fee, year, month, day, code, city, sub_city, dong,
                                   name, floor, exclusvie_private_area, city + " " + sub_city + " " + dong, detailed_address]]),
                                columns=["build_year", "deposit", "rental_fee", "year", "month", "day", "code", "city",
                                         "sub_city", "dong",
                                         "name", "floor", "exclusive_private_area", "address", "detailed_address"])

            df = pd.concat([df, temp])

        df = df.reset_index(drop=True)

        return df


def collect_office_trade(API_KEY, year_month, city_info):
    end_point = "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcOffiTrade"

    service_key = "serviceKey"
    year_parameter = "DEAL_YMD"
    area_code_parameter = "LAWD_CD"
    # num_of_rows = "numOfRows" 생략가능
    # 행 갯수 1000

    area_code = city_info[0]
    city = city_info[1]
    sub_city = city_info[2]

    url = end_point + "?&" + area_code_parameter + "=" + area_code + "&" + year_parameter + "=" + year_month + "&" + service_key + "=" + API_KEY
    try:
        resultXML = urlopen(url)
    except HTTPError as e:
        print("502 error caused reply" + e)
        collect_office_trade(API_KEY, year_month, city_info)
    except IncompleteRead:
        # Oh well, reconnect and keep trucking
        print("_chunk_size Error")
        collect_office_trade(API_KEY, year_month, city_info)
    except URLError as e:
        print(e.reason)
        collect_office_trade(API_KEY, year_month, city_info)
    else:
        result = resultXML.read()
        xmlsoup = BeautifulSoup(result, 'lxml-xml')

        items = xmlsoup.findAll("item")

        df = pd.DataFrame()

        for item in items:
            trade_price = item.find(u"거래금액").text
            year = item.find(u"년").text
            month = item.find(u"월").text
            day = item.find(u"일").text
            dong = item.find(u"법정동").text
            code = item.find(u"지역코드").text
            name = item.find(u"단지").text
            floor = item.find(u"층").text
            exclusvie_private_area = item.find(u"전용면적").text
            try:
                detailed_address = item.find(u"지번").text
            except:
                detailed_address = ""

            try:
                build_year = item.find(u"건축년도").text
            except:
                build_year = ""
            if '-' in detailed_address:
                detailed_address = detailed_address.replace("-", "=")
            temp = pd.DataFrame(([[build_year, trade_price, year, month, day, city, sub_city, dong, code,
                                   name, floor, exclusvie_private_area, city + " " + sub_city + " " + dong, detailed_address]]),
                                columns=["build_year", "trade_price", "year", "month", "day", "city", "sub_city", "dong",
                                         "code",
                                         "name", "floor", "exclusive_private_area", "address", "detailed_address"])
            temp['detailed_address'].astype(str)
            df = pd.concat([df, temp])

        df = df.reset_index(drop=True)

        return df


def collect_office_rent(API_KEY, year_month, city_info):
    end_point = "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcOffiRent"

    service_key = "serviceKey"
    year_parameter = "DEAL_YMD"
    area_code_parameter = "LAWD_CD"
    # num_of_rows = "numOfRows" 생략가능
    # 행 갯수 1000

    area_code = city_info[0]
    city = city_info[1]
    sub_city = city_info[2]

    url = end_point + "?&" + area_code_parameter + "=" + area_code + "&" + year_parameter + "=" + year_month + "&" + service_key + "=" + API_KEY
    try:
        resultXML = urlopen(url)
    except HTTPError as e:
        print("502 error caused reply" + e)
        collect_office_rent(API_KEY, year_month, city_info)
    except IncompleteRead:
        # Oh well, reconnect and keep trucking
        print("_chunk_size Error")
        collect_office_rent(API_KEY, year_month, city_info)
    except URLError as e:
        print(e.reason)
        collect_office_rent(API_KEY, year_month, city_info)
    else:
        result = resultXML.read()
        xmlsoup = BeautifulSoup(result, 'lxml-xml')

        items = xmlsoup.findAll("item")

        df = pd.DataFrame()

        for item in items:
            deposit = item.find(u"보증금").text
            rental_fee = item.find(u"월세").text
            year = item.find(u"년").text
            month = item.find(u"월").text
            day = item.find(u"일").text
            code = item.find(u"지역코드").text
            dong = item.find(u"법정동").text
            name = item.find(u"단지").text
            floor = item.find(u"층").text
            exclusvie_private_area = item.find(u"전용면적").text
            try:
                detailed_address = item.find(u"지번").text
            except:
                detailed_address = ""
            try:
                build_year = item.find(u"건축년도").text
            except:
                build_year = ""
            if '-' in detailed_address:
                detailed_address = detailed_address.replace("-", "=")
            temp = pd.DataFrame(([[build_year, deposit, rental_fee, year, month, day, city, sub_city, dong, code,
                                   name, floor, exclusvie_private_area, city + " " + sub_city + " " + dong, detailed_address]]),
                                columns=["build_year", "deposit", "rental_fee", "year", "month", "day", "city", "sub_city",
                                         "dong", "code",
                                         "name", "floor", "exclusive_private_area", "address", "detailed_address"])

            df = pd.concat([df, temp])

        df = df.reset_index(drop=True)

        return df


if __name__ == "__main__":
    # 크롤링 시작년도 2011 마지막 년도 2021
    from_year = 2020
    to_year = 2021

    today = datetime.datetime.now()

    if from_year > to_year:
        print("wrong input")
        sys.exit(1)
    elif to_year > today.year:
        print("wrong input")
        sys.exit(1)

    API_KEY_LIST = []

    # traffic limitaion 100,000
    API_KEY_01 = ""

    API_KEY_LIST.append(API_KEY_01)

    # file path setting
    path = os.getcwd() + "/data"
    apartment_trade_path = path + "/apartment_trade_data"
    apartment_rent_path = path + "/apartment_rent_data"
    office_trade_path = path + "/office_trade_data"
    office_rent_path = path + "/office_rent_data"

    pre = os.path.dirname(os.path.realpath(__file__))
    fname = '3313.xlsx'
    path2 = os.path.join(pre, fname)
    area_code = pd.read_excel(path2)  # 파일 불러오기

    city_list = area_code[u"시도명"].unique().tolist()

    year_month_list = []

    print("number of Do&Si(city): " + str(len(city_list)))

    apartment_trade_df = pd.DataFrame()
    apartment_rent_df = pd.DataFrame()
    office_trade_df = pd.DataFrame()
    office_rent_df = pd.DataFrame()

    print(("crawling ") + str(from_year) + " ~ " + str(to_year))

    # collect from date ~ to_date data

    for y in range(from_year, to_year, 1):
        # for m in range(1, 10, 1):
        for m in range(1, 4, 1):
            year_month_list.append(str(y) + "0" + str(m))
        # for m in range(10, 13, 1):
        #    year_month_list.append(str(y) + str(m))

    # this year
    # if to_year == today.year:
    #    for m in range(1, today.month + 1, 1):
    #        year_month_list.append(str(today.year) + "0" + str(m))

    print(("달: ") + str(year_month_list))

    # print str(city_list)

    selected_city_list = []

    for city in city_list:
        selected_city = area_code[area_code[u"시도명"] == city]
        selected_city = selected_city[selected_city[u"읍면동명"].isnull() == True]
        selected_city = selected_city[selected_city[u"시군구명"].isnull() == False]
        selected_city["selected_code"] = selected_city[u"법정동코드"].astype(str).str[0:5]
        selected_city = (selected_city[["selected_code", u"시도명", u"시군구명"]])
        selected_city_list.extend(selected_city.values.tolist())

    # Number of traffic required to collect all city data per month
    print("number of monthly traffic(number of sub_city)  : " + str(len(selected_city_list)))

#########################################################################################################################
    print("start collecting apartment_trade data")

    for ym in year_month_list:
        for city in selected_city_list:
            print(city)
            temp = collect_apartment_trade(API_KEY_LIST[0], ym, city)
            apartment_trade_df = pd.concat([apartment_trade_df, temp])
        print(ym + "완료")

        if not os.path.exists(apartment_trade_path):
            os.makedirs(apartment_trade_path)
        file_path = apartment_trade_path + "/" + "apartment_trade_" + ym + ".csv"
        # records : list like [{column -> value}, ... , {column -> value}]
        apartment_trade_df.to_csv(file_path, encoding='utf-8-sig', date_format=None)
        # clear
        apartment_trade_df = pd.DataFrame()

#############################################################################################################################
    print("start collecting apartment_rent data")
    for ym in year_month_list:
        for city in selected_city_list:
            print(city)
            temp = collect_apartment_rent(API_KEY_LIST[0], ym, city)
            apartment_rent_df = pd.concat([apartment_rent_df, temp])
        print(ym + "완료")

        if not os.path.exists(apartment_rent_path):
            os.makedirs(apartment_rent_path)
        file_path = apartment_rent_path + "/" + "apartment_rent_" + ym + ".csv"
        # records : list like [{column -> value}, ... , {column -> value}]
        apartment_rent_df.to_csv(file_path, encoding='utf-8-sig')
        # clear
        apartment_rent_df = pd.DataFrame()
#############################################################################################################################
    print("start collecting office_trade data")

    for ym in year_month_list:
        for city in selected_city_list:
            print(city)
            temp = collect_office_trade(API_KEY_LIST[0], ym, city)
            office_trade_df = pd.concat([office_trade_df, temp])
        print(ym + "완료")

        if not os.path.exists(office_trade_path):
            os.makedirs(office_trade_path)
        file_path = office_trade_path + "/" + "office_trade_" + ym + ".csv"
        # records : list like [{column -> value}, ... , {column -> value}]
        office_trade_df.to_csv(file_path, encoding='utf-8-sig')
        # clear
        office_trade_df = pd.DataFrame()
#############################################################################################################################
    print("start collecting office_rent data")

    for ym in year_month_list:
        for city in selected_city_list:
            print(city)
            temp = collect_office_rent(API_KEY_LIST[0], ym, city)
            office_rent_df = pd.concat([office_rent_df, temp])
        print(ym + "완료")

        if not os.path.exists(office_rent_path):
            os.makedirs(office_rent_path)
        file_path = office_rent_path + "/" + "office_rent_" + ym + ".csv"
        # records : list like [{column -> value}, ... , {column -> value}]
        office_rent_df.to_csv(file_path, encoding='utf-8-sig')
        # clear
        office_rent_df = pd.DataFrame()
