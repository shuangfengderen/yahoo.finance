## There is a download link for each stock, but I am not sure how to 
# from http.client import HTTPConnection

from yahoo_finance import Share
import numpy as np
import csv
import time

def dateString(year = 2016, month = 0, day = 0):
    assert 0 <= month and month <= 12
    assert 0 <= day and day <= 31
    return '{year}-{month}-{day}'.format(year = year, month = month, day = day) 

def readShare(symbol, startDate = '2000-05-12', endDate = '2016-05-12', savepath = '../data/data_from_server/'):

    print symbol + ' start...'

    # read historical data for each share.

    response = Share(symbol).get_historical(startDate, endDate)  # in DICT format
    
    # save response to .csv file
    with open(savepath + symbol + '.csv', 'w') as f:
        f.write(','.join(response[0].keys()) + '\n')
        for e in response:
            f.write(','.join(e.values()) + '\n')
            
    print symbol + ' done'


def substractDate(date1, date2):
    d1 = map(int, date1.split('-'))
    d2 = map(int, date2.split('-'))
    return abs((d2[0] - d1[0])*365 + (d2[1] - d1[1])*30 + d2[2] - d1[2])


def calcOneYear(symbol, label, readpath, savepath):

    res = []
    l = []

    with open(readpath + symbol + '.csv', 'rb') as f:
        reader = csv.reader(f)
        l = list(reader)
        if len(l) < 2:
            return res

        date = l[0].index("Date")
        if label == 'l':
            idx = l[0].index('Low')
        else:
            idx = l[0].index('High')

        curExtremes = []
        times = []
        for i in xrange(2, len(l)):

            if label == 'l':
                while curExtremes and float(curExtremes[-1][idx]) >= float(l[i][idx]): curExtremes.pop()
            if label == 'h':
                while curExtremes and float(curExtremes[-1][idx]) <= float(l[i][idx]): curExtremes.pop()

            curExtremes.append(l[i])

            times.append(l[i])

            if substractDate(times[0][date], times[-1][date]) >= 365:
                e = times.pop(0)
                res.append(curExtremes[0][idx])

                if e == curExtremes[0]:
                    curExtremes.pop(0)

    # Write results to file

    with open(savepath + symbol + '.csv', 'w') as f:
        if label == 'l':
            f.write('Symbol,Date,Low\n')
        else:
            f.write('Symbol,Date,High\n')

        for i in xrange(len(res)):
            f.write(symbol + ',' + l[i+1][date] + ',' + res[i] + '\n')

    return res

def calcProfitOneYear(symbol, lowPricePath, highPricePath, savepath):

    with open(lowPricePath + symbol + '.csv', 'rb') as r1:
        with open(highPricePath + symbol + '.csv', 'rb') as r2:
            with open(savepath + symbol + '.csv', 'w') as f:
                l1 = list(csv.reader(r1))
                l2 = list(csv.reader(r2))
                f.write('Symbol,Date,Profit\n')
                for i in xrange(1, len(l1)):
                    f.write(symbol + ',' + l1[i][1] + ',' + str(float(l2[i][2]) - float(l1[i][2])) + '\n')


def get_symbol(path, symbol):

    endDate = time.strftime("%Y-%m-%d")
    startDate = '-'.join(['2000'] + endDate.split('-')[1:])

    historical_path = path + 'data_from_server/'
    readShare(symbol, startDate, endDate, historical_path)

    lowest_price_path = path + 'lowest_price/'
    calcOneYear(symbol, 'l', historical_path, lowest_price_path)

    highest_price_path = path + 'highest_price/'
    calcOneYear(symbol, 'h', historical_path, highest_price_path)

    highest_profit_path = path + 'highest_profit/'
    calcProfitOneYear(symbol, lowest_price_path, highest_price_path, highest_profit_path)


if __name__ == '__main__':

    symbols = ['AAPL', 'YHOO', 'GOOG', 'MSFT', 'AMZN', 'TWTR', 'FB', 'LNKD', 'TSLA', 'QCOM']
    startDate  = '2000-5-12'
    endDate = '2016-5-12'

    read_from_server = False
    calc_min_in_one_year = True
    calc_max_in_one_year = True
    calc_max_profit_in_one_year = True

    # symbols = ['AAPL']

    # 1. Read historical data from server, and store it locally
    if read_from_server:
        savepath = 'examples/data_from_server/'
        for symbol in symbols:
            readShare(symbol, startDate, endDate, savepath)


    ## test
    # res1 = calcOneYear('FB', 'l', 'examples/data_from_server/', 'examples/lowest_price/')
    # res2 = calcOneYear('FB', 'h', 'examples/data_from_server/', 'examples/highest_price/')
    # plt.plot(map(float,res1))
    # plt.plot(map(float, res2))
    # plt.show()

    # 2. Calculate lowest price within one year (365 days) before the current day
    if calc_min_in_one_year:
        readpath = 'examples/data_from_server/'
        savepath = 'examples/lowest_price/'
        for symbol in symbols:
            calcOneYear(symbol, 'l', readpath, savepath)

    # 3. Calculate highest price within one year (365 days) before the current day
    if calc_max_in_one_year:
        readpath = 'examples/data_from_server/'
        savepath = 'examples/highest_price/'
        for symbol in symbols:
            calcOneYear(symbol, 'h', readpath, savepath)

    # 4. Calculate highest profit with one year (365 days) before the current day
    if calc_max_profit_in_one_year:
        lowPricePath = 'examples/lowest_price/'
        highPricePath = 'examples/highest_price/'
        savepath = 'examples/highest_profit/'
        for symbol in symbols:
            calcProfitOneYear(symbol, lowPricePath, highPricePath, savepath)



