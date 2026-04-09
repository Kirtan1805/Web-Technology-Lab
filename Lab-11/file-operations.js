const fs = require("fs");

const fileName = "sample.txt";
const initialContent = "This is the initial file content.\n";
const appendedContent = "This line is appended later.\n";

// 1) Create (or overwrite) file
fs.writeFile(fileName, initialContent, (writeError) => {
  if (writeError) {
    console.error("Error creating file:", writeError);
    return;
  }
  console.log("File created successfully.");

  // 2) Read file content
  fs.readFile(fileName, "utf8", (readError, data) => {
    if (readError) {
      console.error("Error reading file:", readError);
      return;
    }
    console.log("File content after creation:");
    console.log(data);

    // 3) Append data to file
    fs.appendFile(fileName, appendedContent, (appendError) => {
      if (appendError) {
        console.error("Error appending file:", appendError);
        return;
      }
      console.log("Data appended successfully.");

      // Read again to show updated content
      fs.readFile(fileName, "utf8", (secondReadError, updatedData) => {
        if (secondReadError) {
          console.error("Error reading updated file:", secondReadError);
          return;
        }
        console.log("File content after appending:");
        console.log(updatedData);

        // 4) Delete file
        fs.unlink(fileName, (deleteError) => {
          if (deleteError) {
            console.error("Error deleting file:", deleteError);
            return;
          }
          console.log("File deleted successfully.");
        });
      });
    });
  });
});

