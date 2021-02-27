
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

    const checkEmail = (input) => {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(String(input.value).toLowerCase())) {
        showSuccess(input)
      } else {
        showError(input, `${getFieldName(input)} is not vaild`)
      }
    }

    const getFieldName = (input) => {
      const inputWrap = input.parentElement
      const label = inputWrap.querySelector('label') && inputWrap.querySelector('label').innerText
        ? inputWrap.querySelector('label').innerText
        : input.id.charAt(0).toUpperCase() + input.id.slice(1)
      return label
    }

    const checkLength = (input, min, max) => {
      if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min}`)
      } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max}`)
      } else {
        showSuccess(input)
      }
    }

    const checkRequired = (inputs) => {
      if (inputs) {
        inputs.map((item) => {
          if (item.value.trim() === '') {
            showError(item, `${getFieldName(item)} is required`)
            isEmpty(item)
          } else {
            isHasValue(item)
            showSuccess(item)
          }
        })
      }
    }

    const checkPasswordMatch = (input1, input2) => {
      const inputFirst = input1.value
      const inputSecond = input2.value

      if (inputFirst !== inputSecond) {
        showError(input2, 'Passwords do not match')
      }
    }

    el.addEventListener('submit', (e) => {
      e.preventDefault()
      checkRequired([fullName, userName, email, password, confirmPassword])
      checkLength(fullName, 10, 25)
      checkLength(userName, 6, 25)
      checkEmail(email)
      checkPasswordMatch(password, confirmPassword)
    })
  }
}
