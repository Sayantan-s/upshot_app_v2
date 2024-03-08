const fs = require('fs');
const path = require('path');

function createFolderInAPIBuild() {
  const directoryPath = './dist/apps/api';
  const folderName = 'prisma';

  const doesBuildDirExists = fs.existsSync(directoryPath);

  if (!doesBuildDirExists) {
    console.log(
      `Cannot create folder cause buildDir doesn't exists \n\nPlease run "yarn run build:api"`
    );
    return;
  }

  const folderFullPath = path.join(directoryPath, folderName);

  if (!fs.existsSync(folderFullPath)) {
    fs.mkdirSync(folderFullPath);
    console.log(
      `Folder '${folderName}' created successfully in ${directoryPath}`
    );
  } else {
    console.log(`Folder '${folderName}' already exists in ${directoryPath}`);
  }
}

createFolderInAPIBuild();
