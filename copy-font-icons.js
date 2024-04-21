const fs = require('fs-extra');

async function copyFiles() {
  try {
    await fs.copy(
      './node_modules/@fortawesome/fontawesome-svg-core/styles.css',
      './public/fonts/fontawesome/styles.css'
    );
    await fs.copy(
      './node_modules/@fortawesome/free-solid-svg-icons',
      './public/fonts/fontawesome/solid'
    );
    await fs.copy(
      './node_modules/@fortawesome/free-brands-svg-icons',
      './public/fonts/fontawesome/brands'
    );
    console.log('Font files copied successfully.');
  } catch (err) {
    console.error('Error copying font files:', err);
    process.exit(1);
  }
}

copyFiles();
