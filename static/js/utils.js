function dataURItoFile(dataURI, tempFileName) {
  // Convert base64 to raw binary data held in a string.
  const byteString = atob(dataURI.split(',')[1]);

  // Separate out the mime component.
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // Write the bytes of the string to an ArrayBuffer.
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new File([ab], tempFileName, { type: mimeString });
}
