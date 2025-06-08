let qrcode;

function generateQRCode() {
  const text = document.getElementById('text').value.trim();
  const size = parseInt(document.getElementById('size').value);
  const fgColor = document.getElementById('fgColor').value;
  const bgColor = document.getElementById('bgColor').value;
  const ecLevel = document.getElementById('ecLevel').value;

  if (!text) {
    alert('Please enter some text or URL');
    return;
  }
  if (isNaN(size) || size < 100 || size > 500) {
    alert('Size must be a number between 100 and 500');
    return;
  }

  const qrcodeContainer = document.getElementById('qrcode');
  qrcodeContainer.innerHTML = ''; // clear previous
  document.getElementById('downloadBtn').style.display = 'none'; // hide download initially

  qrcode = new QRCode(qrcodeContainer, {
    text,
    width: size,
    height: size,
    colorDark: fgColor,
    colorLight: bgColor,
    correctLevel: QRCode.CorrectLevel[ecLevel]
  });

  // Show download button after a small delay for QR generation
  setTimeout(() => {
    document.getElementById('downloadBtn').style.display = 'inline-block';
  }, 300);
}

function downloadQRCode() {
  if (!qrcode) return alert('Generate a QR code first!');

  // Find the generated img or canvas inside #qrcode
  const qrImg = document.querySelector('#qrcode img');
  if (qrImg) {
    // Create a link and trigger download
    const a = document.createElement('a');
    a.href = qrImg.src;
    a.download = 'qr-code.png';
    a.click();
  } else {
    // Some browsers render QR code as canvas instead of img
    const qrCanvas = document.querySelector('#qrcode canvas');
    if (qrCanvas) {
      const a = document.createElement('a');
      a.href = qrCanvas.toDataURL('image/png');
      a.download = 'qr-code.png';
      a.click();
    } else {
      alert('Unable to find QR code image to download.');
    }
  }
}
