import requests
from bs4 import BeautifulSoup
import re
from bisect import bisect_left

class Stock:
    id: str          
    name: str        
    first_buy: int   
    second_buy: int  
    first_sell: int  
    second_sell: int 

    def __init__(self, id: str, name: str, first_buy: int, second_buy: int, first_sell: int, second_sell: int):
        self.id = id
        self.name = name
        self.first_buy = first_buy
        self.second_buy = second_buy
        self.first_sell = first_sell
        self.second_sell = second_sell


def check_stock(stock):
    try:

        result = {}
        url = 'https://finance.naver.com/item/main.nhn?code=' + stock.id
        response = requests.get(url)
        response.raise_for_status()
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')

        curr_price = soup.select_one('#chart_area > div.rate_info > div').select_one('.blind')
        curr_price = int(re.sub(',','',curr_price.get_text()))
        stock_prices = [
            stock.first_buy, stock.second_buy,
            stock.first_sell, stock.second_sell,
            stock.third_sell, stock.fourth_sell,
            stock.fifth_sell
        ]
        sorted_prices = sorted(stock_prices)

        # 현재 가격이 들어갈 위치 계산
        position = bisect_left(sorted_prices, curr_price) + 1  # 1-based index


        is_under_must_sell = False
        if curr_price <= stock.must_sell :
            is_under_must_sell = True

        data = {'name' : stock.name, 'curr_price': curr_price, 'position' : position, 'under_must_sell' : is_under_must_sell}

        result[stock.id] = data

        return result
    
    except:
        return {stock.id: "error"}

