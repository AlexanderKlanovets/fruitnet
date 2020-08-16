const dropArea = document.getElementById("drop-area");

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

function highlight(e) {
  dropArea.classList.add('highlight');
}

function unhighlight(e) {
  dropArea.classList.remove('highlight');
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDrop(e) {
  const fileField = document.querySelector('input[type="file"]');
  fileField.files = e.dataTransfer.files;
  handleFiles(fileField.files);
}

function handleFiles(files) {
  fruitImage = files[0];
  previewFile(fruitImage);
}

function previewFile(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    const gallery = document.getElementById('gallery');
    const classifyButton = document.getElementById('classify-btn');
    const previewImage = document.createElement('img');
    gallery.innerHTML = '';
    previewImage.src = reader.result;
    gallery.appendChild(previewImage);
    classifyButton.style.display = 'block';
  }
}
