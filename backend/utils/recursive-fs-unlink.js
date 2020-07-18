const fs = require("fs");

function fsRecursiveUnlink(directory) {
  return new Promise((resolve, reject) =>
    fs.readdir(directory, { withFileTypes: true }, async (err, files) => {
      if (err) reject();
      const result = await Promise.all(
        files.map(async (file) => {
          const filePath = `${directory}/${file.name}`;
          if (file.isDirectory()) {
            return await fsRecursiveUnlink(filePath);
          } else {
            console.log(`Deleting file ${filePath}`);
            return await fs.unlink(filePath, (err) => {
              if (err) throw err;
            });
          }
        })
      );
      resolve(result);
    })
  );
}

module.exports = fsRecursiveUnlink;
