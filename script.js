function generateQRCode() {
  const canvas = document.getElementById("qrCanvas");
  const text = document.getElementById("text").value.trim();
  const label = document.getElementById("labelText").value;
  const size = parseInt(document.getElementById("size").value);
  const fgColor = document.getElementById("fgColor").value;
  const bgColor = document.getElementById("bgColor").value;
  const ecLevel = document.getElementById("ecLevel").value;
  const labelSize = parseInt(document.getElementById("labelSize").value);
  const labelColor = document.getElementById("labelColor").value;

  if (!text) {
    alert("Please enter text to encode.");
    return;
  }

  const fullHeight = label ? size + labelSize + 20 : size;

  // Set canvas size
  canvas.width = size;
  canvas.height = fullHeight;

  // Generate QR to temporary canvas
  const tempCanvas = document.createElement("canvas");
  QRCode.toCanvas(tempCanvas, text, {
    width: size,
    color: {
      dark: fgColor,
      light: bgColor,
    },
    errorCorrectionLevel: ecLevel,
  }, function (error) {
    if (error) {
      alert("QR generation failed!");
      console.error(error);
      return;
    }

    const ctx = canvas.getContext("2d");

    // Draw QR code onto main canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);

    // Draw label
    if (label) {
      ctx.fillStyle = labelColor;
      ctx.font = `${labelSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(label, size / 2, size + labelSize);
      document.getElementById("labelPreview").innerText = label;
    } else {
      document.getElementById("labelPreview").innerText = '';
    }
  });
}

function downloadQRCode() {
  const canvas = document.getElementById("qrCanvas");
  const link = document.createElement("a");
  link.download = "qr-code.png";
  link.href = canvas.toDataURL();
  link.click();
}

function toggleTheme() {
  const html = document.documentElement;
  const newTheme = html.dataset.theme === 'light' ? 'dark' : 'light';
  html.dataset.theme = newTheme;
}
