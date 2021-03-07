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
        play.innerHTML = 'Pause'
      }
    }

    const updateProgress = () => {
      progress.value = (video.currentTime / video.duration) * 100

      let mins = Math.floor(video.currentTime / 60)

      if (mins < 10) {
        mins = '0' + String(mins)
      }

      let secs = Math.floor(video.currentTime % 60)

      if (secs < 10) {
        secs = '0' + String(secs)
      }

      timestamp.innerHTML = `${mins}:${secs}`
    }

    const stopVideo = () => {
      video.currentTime = 0
      video.pause()
    }

    const setVideoProgress = () => {
      video.currentTime = (+progress.value * video.duration) / 100
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
