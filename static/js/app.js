const SERVER_IP = 'http://localhost:5000';

particlesJS("particles-js", particlesConfig);

const selectElement = document.getElementById('options');
const dragDropElement = document.getElementById('drag-n-drop');
const webcamElement = document.getElementById('webcam');
const resultElement = document.getElementById('result');
const resultMessageElement = document.getElementById('result-msg');

function selectOption() {
  resultElement.style.display = 'none';
  if (selectElement.value === 'drag-n-drop') {
    dragDropElement.style.display = 'block';
    webcamElement.style.display = 'none';
  } else {
    dragDropElement.style.display = 'none';
    webcamElement.style.display = 'block';
  }
}

function classify(e) {
  e.preventDefault();
  const formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');
  formData.append('file', fileField.files[0]);
  classifyFromCam(formData);
}

async function classifyFromCam(shot) {
  const response = await fetch(SERVER_IP, {
    method: 'POST',
    body: shot
  });
  const result = await response.json();
  if (response.status === 400)
    alert(result.message);
  else
    outputResult(result);
}

function outputResult(result) {
  resultElement.style.display = 'block';
  resultMessageElement.innerHTML = `I think it\'s a <b>${result.label}</b> with `;
  resultMessageElement.innerHTML += `<b>${result.percentage}%</b> confidence.`;
  speak(`I think it\'s a ${result.label} with ${result.percentage}% confidence.`);
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synthesis.speak(utterance);
  } else {
    console.log('Text-to-speech not supported.');
  }
}
