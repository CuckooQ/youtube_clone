// import getBlobDuration from 'get-blob-duration'

const videoContainer = document.getElementById('videoPlayer')
const videoPlayer = document.querySelector('#videoPlayer video')
const playBtn = document.getElementById('playButton')
const volumeBtn = document.getElementById('volumeButton')
const volumeRange = document.getElementById('volume')
const fullScreenBtn = document.getElementById('fullScreenButton')
const currentTime = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')

const DEFAULT_VOLUME = 0.5

const registerView = () => {
  const videoId = window.location.href.split('/videos/')[1]
  fetch(`/api/${videoId}/view`, {
    method: 'POST'
  })
}

const play = () => {
  videoPlayer.play()
  playBtn.innerHTML = '<i class="fas fa-pause"></i>'
}

const pause = () => {
  videoPlayer.pause()
  playBtn.innerHTML = '<i class="fas fa-play"></i>'
}

const handelPlayClick = () => {
  if (videoPlayer.paused) {
    play()
  } else {
    pause()
  }
}

const handleVolumeClick = () => {
  volumeBtn.innerHTML = (videoPlayer.muted) ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>'
  videoPlayer.muted = !videoPlayer.muted
  if (videoPlayer.muted) {
    setVolumeRange(0)
  } else {
    setVolumeRange(videoPlayer.volume)
    setVolume(videoPlayer.volume)
  }
}

const setVolumeRange = (volume) => {
  volumeRange.value = volume
}

const setVolume = (volume) => {
  videoPlayer.volume = volume
}

const handleVolume = (event) => {
  const {
    target: {
      value
    }
  } = event

  setVolume(value)

  if (value >= 0.5) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>'
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>'
  }
}

const setNormalScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }

  fullScreenBtn.removeEventListener('click', setNormalScreen)
  fullScreenBtn.addEventListener('click', setFullScreen)
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>'
}

const setFullScreen = () => {
  if (videoContainer.requestFullscreen) {
    videoContainer.webkitRequestFullscreen()
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullscreen()
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen()
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen()
  }

  fullScreenBtn.removeEventListener('click', setFullScreen)
  fullScreenBtn.addEventListener('click', setNormalScreen)
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>'
}

const formatDate = (totalSeconds) => {
  let totalSecondsNumber = parseInt(totalSeconds, 10)
  totalSecondsNumber = totalSecondsNumber ? Math.floor(totalSecondsNumber) : 0
  let hours = Math.floor(totalSecondsNumber / 3600)
  let minutes = Math.floor((totalSecondsNumber - hours * 3600) / 60)
  let seconds = totalSecondsNumber - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = `0${hours}`
  }

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${hours}:${minutes}:${seconds}`
}

const setCurrentTime = () => {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime))
}

const setTotalTime = async () => {
  /*
  let duration
  try {
    console.log('test:' + videoPlayer.src)
    const blob = await fetch(videoPlayer.src).then(response => response.blob())
    duration = await getBlobDuration(blob)
  } catch (error) {
    console.log('test1:' + error)
  }
  */
  const totalTimeStr = formatDate(videoPlayer.duration)
  totalTime.innerHTML = totalTimeStr
  setInterval(setCurrentTime, 500)
}

const handleEnded = () => {
  videoPlayer.currentTime = 0
  pause()
  registerView()
}

const init = () => {
  playBtn.addEventListener('click', handelPlayClick)
  volumeBtn.addEventListener('click', handleVolumeClick)
  volumeRange.addEventListener('input', handleVolume)
  fullScreenBtn.addEventListener('click', setFullScreen)
  videoPlayer.addEventListener('loadeddata', setTotalTime)
  videoPlayer.addEventListener('ended', handleEnded)
  setVolume(DEFAULT_VOLUME)
}

videoContainer && init()
