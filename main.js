const URL = 'https://www.cbr-xml-daily.ru/daily_json.js'
const rates = {}
const valutes = ['USD', 'EUR', 'GBP', 'PLN']

const elementUSD = getCurrencySelector('USD')
const elementEUR = getCurrencySelector('EUR')
const elementGBP = getCurrencySelector('GBP')
const elementPLN = getCurrencySelector('PLN')

const input = document.getElementById('input')
const select = document.getElementById('select')
const result = document.getElementById('result')


getCurrency()

async function getCurrency() {
    try {
        const response = await fetch(URL)
        const data = await response.json()
        currency = await data
        converterCurrency(currency)
    } catch (e) {
        console.error(`Error: ${e}`)
    }
}

function converterCurrency(currency) {
    addRates(valutes)

    elementUSD.textContent = rates.USD.Value.toFixed(2)
    elementEUR.textContent = rates.EUR.Value.toFixed(2)
    elementGBP.textContent = rates.GBP.Value.toFixed(2)

    const elementRates = [elementUSD, elementEUR, elementGBP]

    setStateValutes(elementRates)
}

input.oninput = () => {
    convertValute()
}

select.oninput = () => {
    convertValute()
}

function convertValute() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2)
}

function getCurrencySelector(dataValue) {
    return document.querySelector(`[data-value="${dataValue}"]`)
}

function addRates(arrayRates) {
    arrayRates.map(rate => {
        rates[rate] = currency.Valute[rate]
    })
}

function setStateValutes(elementRates) {
    elementRates.map((el, idx) => {
        if (rates[valutes[idx]].Value > rates[valutes[idx]].Previous)
            el.classList.add('top')
        else
            el.classList.add('bottom')
    })
}