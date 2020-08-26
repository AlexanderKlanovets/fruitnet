const videoWidth = 320;
let videoHeight = 0;
let streaming = false;

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

async function webcamSetUp() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: true, audio: false 
    });
    video.srcObject = stream;
    video.play();
  } catch(e) {
    console.log('An error has ocurred: ', e.message);
  }
}

function configureVideo() {
  if (!streaming) {
    videoHeight = video.videoHeight / (video.videoWidth / videoWidth);

    if (isNaN(videoHeight)) {
      videoHeight = videoWidth / (4 / 3);
    }

    video.setAttribute('width', videoWidth);
    video.setAttribute('height', videoHeight);
    canvas.setAttribute('width', videoWidth);
    canvas.setAttribute('height', videoHeight);
    streaming = true;
  }
}

function startUp() {
  webcamSetUp();
  video.addEventListener('canplay', configureVideo, false);

  const webcamClassifyButton = document.getElementById('webcam-classify-btn');
  webcamClassifyButton.addEventListener('click', function (e) {
    takePictureAndClassify();
  });
}

function takePictureAndClassify() {
  const context = canvas.getContext('2d');
  if (videoWidth && videoHeight) {
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    context.drawImage(video, 0, 0, videoWidth, videoHeight);

    const data = canvas.toDataURL('image/jpeg', 1);
    const shotFile = dataURItoFile(data, 'shot.jpg');
    const fd = new FormData();
    fd.append("file", shotFile);
    classifyFromCam(fd);
  } else {
    alert('Video is not available.');
  }
}

window.addEventListener('load', startUp, false);
