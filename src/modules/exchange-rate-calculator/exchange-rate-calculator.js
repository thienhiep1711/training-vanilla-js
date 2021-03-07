/* global fetch */

export default (el) => {
  if (el) {
    const currencyBase = document.getElementById('currency-one')
    const currencyBaseValue = document.getElementById('amount-one')
    const currencyExchange = document.getElementById('currency-two')
    const currencyExchangeValue = document.getElementById('amount-two')
    const rateEl = document.getElementById('rate')
    const swap = document.getElementById('swap')

    const calculator = () => {
      const currentBase = currencyBase.value
      const exchangeBase = currencyExchange.value

      fetch(`https://api.exchangerate.host/latest?base=${currentBase}`)
        .then(res => res.json())
        .then((data) => {
          if (data) {
            const rate = data.rates[exchangeBase]
            rateEl.innerText = `1 ${currentBase} = ${rate} ${exchangeBase}`
            currencyExchangeValue.value = (currencyBaseValue.value * rate).toFixed(2)
          }
        })
    }

    currencyBase.addEventListener('change', calculator)
    currencyBaseValue.addEventListener('input', calculator)
    currencyExchange.addEventListener('change', calculator)
    currencyExchangeValue.addEventListener('input', calculator)

    swap.addEventListener('click', () => {
      const temp = currencyBase.value
      currencyBase.value = currencyExchange.value
      currencyExchange.value = temp
      calculator()
    })
  }
}
