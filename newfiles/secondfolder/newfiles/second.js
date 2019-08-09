const fs = require("fs");
var projDir = "/home/netzwelt/Desktop/allwork/search/files/";
var onlyDir="files";
//var directoryPath = "./files";
var allDir = ["/home/netzwelt/Desktop/allwork/search/files/"];
var noOfDir = 1;

async function update(directoryPath) {
    
    fs.readdir(directoryPath, async function (err, files) {
        
        var count = 0;
        if (err) {
            return 
        }
        files.forEach(function (file) {
            count++;
            var found = file.search(".js");
            if (found == -1) {
                var name = directoryPath + file + "/";
                allDir.push(name);
            } else {
                
                await fs.readFile("./files/" + file + "",  (err, data) => {
                    if (err) throw err;
                    data = data.toString();
                    var newStr = data.replace(/console\.log\(([^)]+)\);/img, "");
                    var filename=projDir.replace(onlyDir,"newfiles");
                    
                    await fs.writeFile(filename + file + "", newStr, function (err) {
                        if (err) {
                            return 
                        }

                    });
                })
            }
            if (count === files.length) {
                if(allDir.length!=0){
                    allDir.shift();
                    noOfDir=allDir.length;
                    
                    directoryPath = allDir[0];
                    update(directoryPath);
                }
               
            }
        });
    })
}

update(allDir[0]);   





