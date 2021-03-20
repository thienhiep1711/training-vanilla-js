export default (el) => {
  const playAgainBtn = document.getElementById('play-button')
  const popup = document.getElementById('popup-container')
  const wrongLetterEl = document.getElementById('wrong-letters')
  const wordEL = document.getElementById('word')
  const notification = document.getElementById('notification-container')
  const finalMessage = document.getElementById('final-message')

  const figurePaths = document.querySelectorAll('.figure__path')

  const words = ['application', 'programing', 'interface', 'wizard']

  let selectedWord = words[Math.floor(Math.random() * words.length)]

  const correctLetter = []
  const wrongLetter = []

  // Show hidden word
  function displayWord () {
    wordEL.innerHTML = `
      ${selectedWord
        .split('')
        .map(letter => `
          <span class="letter">
            ${correctLetter.includes(letter) ? letter : ''}
          </span>
        `).join('')
      }
    `
    const innerWord = wordEL.innerText.replace(/\n/g, '')
    if (innerWord === selectedWord) {
      finalMessage.innerText = 'Congratulations! You won'
      popup.style.display = 'flex'
    }
  }

  // Update the wrong letter
  function updateWrongLettersEl () {
    wrongLetterEl.innerHTML = `
      ${wrongLetter.length > 0 ? '<p>Wrong</p>' : ''}
      ${wrongLetter.map(letter => `<span>${letter}</span>`)}
    `

    figurePaths.forEach((path, index) => {
      const errors = wrongLetter.length

      if (index < errors) {
        path.style.display = 'block'
      } else {
        path.style.display = 'none'
      }
    })

    // Check if lost
    console.log(wrongLetter, figurePaths)
    if (wrongLetter.length === figurePaths.length) {
      finalMessage.innerText = 'Unfortunately you lost'
      popup.style.display = 'flex'
    }
  }

  // Show notification
  function showNotification () {
    notification.classList.add('show')

    setTimeout(() => {
      notification.classList.remove('show')
    }, 2000)
  }

  // Keydown letter press
  window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key
      if (selectedWord.includes(letter)) {
        if (!correctLetter.includes(letter)) {
          correctLetter.push(letter)
          displayWord()
        } else {
          showNotification()
        }
      } else {
        if (!wrongLetter.includes(letter)) {
          wrongLetter.push(letter)
          updateWrongLettersEl()
        } else {
          showNotification()
        }
      }
    }
  })

  playAgainBtn.addEventListener('click', () => {
    correctLetter.splice(0)
    wrongLetter.splice(0)

    selectedWord = words[Math.floor(Math.random() * words.length)]
    displayWord()
    updateWrongLettersEl()
    popup.style.display = 'none'
  })

  displayWord()
}
