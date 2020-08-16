{
  let width = 320;
  let height = 0;
  let streaming = false;

  let video = null;
  let canvas = null;

  function startUp() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log('An error occurred: ' + err);
      });

    video.addEventListener('canplay', function (e) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        if (isNaN(height)) {
          height = width / (4 / 3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    document.addEventListener('keypress', function (e) {
      if (e.key === 'f')
        takePictureAndClassify();
    });
  }

  function takePictureAndClassify() {
    const context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL('image/jpeg', 1);
      const shotFile = dataURItoFile(data, 'shot.jpg');
      const fd = new FormData();
      fd.append("file", shotFile);
      classifyFromCam(fd);
    } else {
      clearphoto();
    }
  }

  window.addEventListener('load', startUp, false);
}
