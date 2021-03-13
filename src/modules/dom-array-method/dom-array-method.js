/* global fetch */

export default el => {
  if (el) {
    const main = document.getElementById('main')
    const addUserBtn = document.getElementById('add-user')
    const doubleBtn = document.getElementById('double')
    const showMilionairesBtn = document.getElementById('show-millionaires')
    const sortBtn = document.getElementById('sort')
    const calculateWealth = document.getElementById('calculate-wealth')

    let users = []

    const getRandomUser = async () => {
      const res = await fetch('https://random-data-api.com/api/users/random_user')
      const user = await res.json()

      const newUser = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        money: Math.floor(Math.random() * 100000),
        avatar: user.avatar
      }

      addUser(newUser)
    }

    const addUser = (obj) => {
      users.push(obj)
      updateDOM()
    }

    const updateDOM = (providedData = users) => {
      main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'

      providedData.forEach((user) => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${user.name}</strong>${formatMoney(user.money)}`
        main.appendChild(element)
      })
    }

    const formatMoney = (value) => {
      return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    const doubleMoney = () => {
      users = users.map(user => {
        return {
          ...user,
          money: user.money * 2
        }
      })
      updateDOM()
    }

    const sortRichest = () => {
      users = users.sort((a, b) => b.money - a.money)
      updateDOM()
    }

    const sortMillionaires = () => {
      users = users.filter((user) => user.money >= 1000000)
      updateDOM()
    }

    const calculateTotalMoney = () => {
      const total = users.reduce((acc, user) => (acc += user.money), 0)
      const wealthEl = document.createElement('div')
      wealthEl.innerHTML = `<h3>Total: <strong>${formatMoney(total)}</strong></h3>`
      main.appendChild(wealthEl)
    }

    addUserBtn.addEventListener('click', getRandomUser)
    doubleBtn.addEventListener('click', doubleMoney)
    sortBtn.addEventListener('click', sortRichest)
    showMilionairesBtn.addEventListener('click', sortMillionaires)
    calculateWealth.addEventListener('click', calculateTotalMoney)
  }
}
