export default (el) => {
  if (el) {
    const video = document.getElementById('video')
    const play = document.getElementById('play')
    const stop = document.getElementById('stop')
    const progress = document.getElementById('progress')
    const timestamp = document.getElementById('timestamp')

    const toggleVideoStatus = () => {
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
    }

    const updatePlayIcon = () => {
      if (video.paused) {
        play.innerHTML = 'Play'
      } else {
        play.innerHTML = "Pause"
      }
    }

    const updateProgress = () => {

    }

    const stopVideo = () => {
      video.currentTime = 0
      video.pause()
    }

    const setVideoProgress = () => {

    }

    video.addEventListener('click', toggleVideoStatus)
    video.addEventListener('pause', updatePlayIcon)
    video.addEventListener('play', updatePlayIcon)
    video.addEventListener('timeupdate', updateProgress)

    play.addEventListener('click', toggleVideoStatus)
    stop.addEventListener('click', stopVideo)
    progress.addEventListener('change', setVideoProgress)
  }
}
