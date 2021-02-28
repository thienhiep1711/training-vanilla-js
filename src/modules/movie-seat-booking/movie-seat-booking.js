/* global localStorage */

export default (el) => {
  const ticketPrice = el.querySelector('#movie')
  const container = el.querySelector('.container')
  const seats = el.querySelectorAll('.row .seat:not(.occupied)')
  const ticketCount = el.querySelector('#count')
  const ticketTotal = el.querySelector('#total')

  const populateUI = () => {
    const selectedSeats = localStorage.getItem('selectedSeats')
    if (selectedSeats && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected')
        }
      })
    }

    const selectedMovieIndexs = localStorage.getItem('selectedMovieIndexs')
    if (selectedMovieIndexs !== null) {
      ticketPrice.selectedIndex = selectedMovieIndexs
    }
  }

  populateUI()

  let ticketPriceValue = ticketPrice.value

  const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndexs', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
  }

  const updateSelectedCount = () => {
    const seletedSeats = container.querySelectorAll('.row .seat.selected')
    const seatsIndex = [...seletedSeats].map((item) => {
      return [...seats].indexOf(item)
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    const selectedSeatsCount = seletedSeats.length
    ticketCount.innerText = selectedSeatsCount
    ticketTotal.innerText = selectedSeatsCount * ticketPriceValue
  }

  ticketPrice.addEventListener('change', (e) => {
    ticketPriceValue = e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
  })

  if (container) {
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateSelectedCount()
      }
    })
    updateSelectedCount()
  }
}
