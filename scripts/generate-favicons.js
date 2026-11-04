const fs = require('fs');
const path = require('path');
const sharp = require('../node_modules/sharp');

const SVG_CONTENT = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Brand Forest Green Background Tile (#1A4A2E) -->
  <rect width="512" height="512" rx="112" fill="#1A4A2E" />
  
  <!-- Subtle Architectural Inset Border -->
  <rect x="14" y="14" width="484" height="484" rx="100" stroke="#F8F8F6" stroke-opacity="0.16" stroke-width="3" />

  <!-- Monogram "R" in Editorial Warm Off-White (#F8F8F6) -->
  <path fill="#F8F8F6" fill-rule="evenodd" clip-rule="evenodd" d="
    M 126 136
    H 276
    C 334 136 376 166 376 212
    C 376 250 346 276 304 284
    L 370 366
    C 376 374 382 376 390 376
    V 382
    H 322
    L 256 286
    H 214
    V 354
    C 214 366 222 372 242 376
    V 382
    H 126
    V 376
    C 146 372 154 366 154 354
    V 164
    C 154 152 146 146 126 142
    V 136
    Z
    M 214 158
    V 262
    H 272
    C 306 262 328 242 328 212
    C 328 178 306 158 272 158
    H 214
    Z
  " />
</svg>
`;

function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let currentOffset = headerSize;

  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width === 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height === 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bit depth
    entry.writeUInt32LE(item.buffer.length, 8); // image size
    entry.writeUInt32LE(currentOffset, 12); // image offset
    entries.push(entry);
    currentOffset += item.buffer.length;
  }

  const dir = Buffer.alloc(6);
  dir.writeUInt16LE(0, 0); // reserved
  dir.writeUInt16LE(1, 2); // ICO format
  dir.writeUInt16LE(count, 4); // count

  return Buffer.concat([dir, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

async function generateAll() {
  const rootDir = path.resolve(__dirname, '..');
  const appDir = path.join(rootDir, 'app');
  const publicDir = path.join(rootDir, 'public');

  console.log('Writing SVG files...');
  fs.writeFileSync(path.join(appDir, 'icon.svg'), SVG_CONTENT.trim());
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), SVG_CONTENT.trim());

  console.log('Generating PNG raster assets...');
  const svgBuffer = Buffer.from(SVG_CONTENT);

  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  console.log('Packaging multi-resolution favicon.ico (16x16, 32x32, 48x48)...');
  const icoBuffer = buildIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  console.log('Writing Apple touch icons and PWA icons...');
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);

  console.log('All favicon and icon assets generated successfully!');
}

generateAll().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});

