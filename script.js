function generateQRCode() {
  const text = document.getElementById('text').value.trim();
  const qrcodeContainer = document.getElementById('qrcode');

  if (!text) {
    alert('Please enter some text or URL');
    return;
  }

  qrcodeContainer.innerHTML = '';
  new QRCode(qrcodeContainer, {
    text: text,
    width: 200,
    height: 200,
  });
}
