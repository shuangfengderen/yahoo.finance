from flask import Flask, render_template, request

from py.is_valid_symbol import is_valid_symbol as isValid
from py.get_symbol import get_symbol

import json, os

app = Flask(__name__)

@app.route("/")
def main():
    return "Welcome!"

@app.route("/index")
def index():
    return render_template('index.html', name = 'index')

@app.route("/typeahead")
def typeahead():

    return render_template('typeahead.html', name = 'typeahead')

@app.route("/typeaheadSymbol", methods = ['POST'])
def typeaheadSymbol():
    try:
        symbol = request.form['inputSymbol']
        symbol = symbol.strip().upper()

        print symbol

        if isValid(symbol):
            get_symbol('static/data/', symbol)
            return "ready"
        else:
            return "Error: Not valid symbol"
    except Exception as e:
        return json.dumps({'error':str(e)})


if __name__ == "__main__":
    
    with open('static/data/symbols.csv', 'w') as f:
        names = [x.split('.')[0] for x in os.listdir('static/data/lowest_price/') if '.csv' in x]
        f.write(','.join(names));

    app.run(debug = True)