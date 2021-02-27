
export default (el) => {
  if (el) {
    const fullName = el.querySelector('#fullname')
    const userName = el.querySelector('#username')
    const email = el.querySelector('#email')
    const password = el.querySelector('#password')
    const confirmPassword = el.querySelector('#confirm_password')

    const showError = (input, message) => {
      const inputWrap = input.parentElement
      inputWrap.classList.add('input--error')
      const messageEl = inputWrap.querySelector('.input__message')
      messageEl.innerText = message
    }

    const showSuccess = (input) => {
      const inputWrap = input.parentElement
      inputWrap.classList.remove('input--error')
      inputWrap.classList.add('success')
      const messageEl = inputWrap.querySelector('.input__message')
      messageEl.innerText = ''
    }

    const isHasValue = (input) => {
      const inputWrap = input.parentElement
      inputWrap.classList.add('has-value')
    }

    const isEmpty = (input) => {
      const inputWrap = input.parentElement
      inputWrap.classList.remove('has-value')
    }

    const isValidEmail = (email) => {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(String(email).toLowerCase())
    }

    el.addEventListener('submit', (e) => {
      e.preventDefault()
      if (fullName && fullName.value === '') {
        showError(fullName, 'Fullname is required')
        isEmpty(fullName)
      } else {
        isHasValue(fullName)
        showSuccess(fullName)
      }
      if (userName && userName.value === '') {
        showError(userName, 'Username is required')
        isEmpty(userName)
      } else {
        showSuccess(userName)
        isHasValue(userName)
      }
      if (email && email.value === '') {
        showError(email, 'Email is required')
        isEmpty(email)
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Email is not valid')
      } else {
        showSuccess(email)
        isHasValue(email)
      }
      if (password && password.value === '') {
        showError(password, 'Password is required')
        isEmpty(password)
      } else {
        showSuccess(password)
        isHasValue(password)
      }
      if (confirmPassword && confirmPassword.value === '') {
        showError(confirmPassword, 'Confirm Password is required')
        isEmpty(confirmPassword)
      } else {
        showSuccess(confirmPassword)
        isHasValue(confirmPassword)
      }
    })
  }
}
