export default (el) => {
  const ticketPrice = el.querySelector('#movie')
  const container = el.querySelector('.container')
  const ticketCount = el.querySelector('#count')
  const ticketTotal = el.querySelector('#total')
  const showCase = el.querySelector('.showcase')

  let ticketPriceValue = ticketPrice.value

  const updateSelectedCount = () => {
    const seletedSeats = container.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = seletedSeats.length
    ticketCount.innerText = selectedSeatsCount
    ticketTotal.innerText = selectedSeatsCount * ticketPriceValue
  }

  ticketPrice.addEventListener('change', (e) => {
    ticketPriceValue = e.target.value
    updateSelectedCount()
  })

  if (container) {
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateSelectedCount()
      }
    })
  }
}
