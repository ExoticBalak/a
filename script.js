function generateQRCode() {
  const text = document.getElementById("text").value.trim();
  const label = document.getElementById("labelText").value.trim();
  const size = parseInt(document.getElementById("size").value);
  const fgColor = document.getElementById("fgColor").value;
  const bgColor = document.getElementById("bgColor").value;
  const ecLevel = document.getElementById("ecLevel").value;
  const labelColor = document.getElementById("labelColor").value;
  const labelSize = parseInt(document.getElementById("labelSize").value);

  const canvas = document.getElementById("qrCanvas");

  if (!text) {
    alert("Please enter text to generate QR.");
    return;
  }

  const fullHeight = label ? size + labelSize + 20 : size;
  canvas.width = size;
  canvas.height = fullHeight;

  QRCode.toCanvas(
    text,
    {
      errorCorrectionLevel: ecLevel,
      width: size,
      color: {
        dark: fgColor,
        light: bgColor,
      },
    },
    function (err, tempCanvas) {
      if (err) {
        alert("QR Generation failed.");
        console.error(err);
        return;
      }

      const ctx = canvas.getContext("2d");

      // Fill background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw QR code
      ctx.drawImage(tempCanvas, 0, 0);

      // Draw label
      if (label) {
        ctx.fillStyle = labelColor;
        ctx.font = `${labelSize}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(label, size / 2, size + labelSize);
      }
    }
  );
}

function downloadQRCode() {
  const canvas = document.getElementById("qrCanvas");
  const link = document.createElement("a");
  link.download = "qr-code.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "light" ? "dark" : "light";
}
