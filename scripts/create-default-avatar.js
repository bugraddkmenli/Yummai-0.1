const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Ensure assets directory exists
// Update the assets directory path to point to the Yummai project
const assetsDir = path.join(__dirname, '..', 'Yummai', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Create default avatar
const avatarCanvas = createCanvas(200, 200);
const avatarCtx = avatarCanvas.getContext('2d');

// Draw circle background
avatarCtx.fillStyle = '#E1E1E1';
avatarCtx.beginPath();
avatarCtx.arc(100, 100, 100, 0, Math.PI * 2);
avatarCtx.fill();

// Draw person silhouette
avatarCtx.fillStyle = '#A1A1A1';
// Head
avatarCtx.beginPath();
avatarCtx.arc(100, 80, 40, 0, Math.PI * 2);
avatarCtx.fill();
// Body
avatarCtx.beginPath();
avatarCtx.moveTo(100, 120);
avatarCtx.quadraticCurveTo(100, 200, 100, 200);
avatarCtx.quadraticCurveTo(100, 200, 160, 200);
avatarCtx.quadraticCurveTo(130, 130, 100, 120);
avatarCtx.fill();

const avatarBuffer = avatarCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(assetsDir, 'default-avatar.png'), avatarBuffer);

// Create empty favorites image
const favCanvas = createCanvas(300, 300);
const favCtx = favCanvas.getContext('2d');

// Draw heart outline
favCtx.strokeStyle = '#E1E1E1';
favCtx.lineWidth = 10;
favCtx.beginPath();
// Heart shape
const x = 150;
const y = 150;
const size = 100;

favCtx.moveTo(x, y - size * 0.4);
favCtx.bezierCurveTo(
  x, y - size * 0.8,
  x - size, y - size * 0.8,
  x - size, y - size * 0.1
);
favCtx.bezierCurveTo(
  x - size, y + size * 0.6,
  x, y + size * 0.8,
  x, y + size * 0.8
);
favCtx.bezierCurveTo(
  x, y + size * 0.8,
  x + size, y + size * 0.6,
  x + size, y - size * 0.1
);
favCtx.bezierCurveTo(
  x + size, y - size * 0.8,
  x, y - size * 0.8,
  x, y - size * 0.4
);
favCtx.stroke();

// Add text
favCtx.fillStyle = '#A1A1A1';
favCtx.font = '20px Arial';
favCtx.textAlign = 'center';
favCtx.fillText('No favorites yet', 150, 220);
favCtx.font = '16px Arial';
favCtx.fillText('Your favorite recipes will appear here', 150, 250);

const favBuffer = favCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(assetsDir, 'empty-favorites.png'), favBuffer);

// Create logo
const logoCanvas = createCanvas(400, 400);
const logoCtx = logoCanvas.getContext('2d');

// Draw background circle
logoCtx.fillStyle = '#f4511e';
logoCtx.beginPath();
logoCtx.arc(200, 200, 150, 0, Math.PI * 2);
logoCtx.fill();

// Draw fork and knife
logoCtx.strokeStyle = 'white';
logoCtx.lineWidth = 15;

// Fork
logoCtx.beginPath();
logoCtx.moveTo(150, 100);
logoCtx.lineTo(150, 300);
// Fork tines
logoCtx.moveTo(150, 100);
logoCtx.lineTo(130, 140);
logoCtx.moveTo(150, 100);
logoCtx.lineTo(150, 140);
logoCtx.moveTo(150, 100);
logoCtx.lineTo(170, 140);
logoCtx.stroke();

// Knife
logoCtx.beginPath();
logoCtx.moveTo(250, 100);
logoCtx.lineTo(250, 300);
logoCtx.lineTo(270, 280);
logoCtx.lineTo(270, 120);
logoCtx.closePath();
logoCtx.fillStyle = 'white';
logoCtx.fill();

const logoBuffer = logoCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(assetsDir, 'logo.png'), logoBuffer);
console.log('Images created successfully in the assets directory');