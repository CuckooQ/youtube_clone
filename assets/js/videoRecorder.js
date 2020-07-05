const recorderContainer = document.getElementById('recorderContainer')
const recordButton = document.getElementById('recordButton')
const previewVideo = document.getElementById('previewVideo')

const handleVideoStream = (event) => {
  const {
    data: videoFile
  } = event

  const link = document.createElement('a')
  link.href = URL.createObjectURL(videoFile)
  link.download = 'recorded.mp4'
  document.body.appendChild(link)
  link.click()
}

const stopRecording = (videoRecorder) => {
  videoRecorder.stop()
  recordButton.removeEventListener('click', _ => {
    stopRecording(videoRecorder)
  })
  recordButton.addEventListener('click', takeVideo)
  recordButton.innerHTML = 'Start Recording'
}

const startRecording = (stream) => {
  const videoRecorder = new MediaRecorder(stream)
  videoRecorder.addEventListener('dataavailable', handleVideoStream)
  videoRecorder.start()
  recordButton.addEventListener('click', _ => {
    stopRecording(videoRecorder)
  })
}

const takeVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    })
    previewVideo.srcObject = stream
    previewVideo.muted = true
    previewVideo.play()
    recordButton.innerHTML = 'Stop Recording'
    startRecording(stream)
  } catch (error) {
    recordButton.innerHTML = "Can't Record"
  } finally {
    recordButton.removeEventListener('click', takeVideo)
  }
}

const init = () => {
  recordButton.addEventListener('click', takeVideo)
}

recorderContainer && init()
