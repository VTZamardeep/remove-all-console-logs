const fs = require("fs");
var projDir = "/home/netzwelt/Desktop/allwork/search/files/";
var onlyDir="files";
//var directoryPath = "./files";
var allDir = ["/home/netzwelt/Desktop/allwork/search/files/"];
var noOfDir = 1;

async function update(directoryPath) {
    
    fs.readdir(directoryPath, async function (err, files) {
        
        var count = 0;
        var firsttime=0;
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
                
                
                fs.readFile(directoryPath + file + "", (err, data) => {
                    if (err) throw err;
                    data = data.toString();
                    var newStr = data.replace(/console\.log\(([^)]+)\);/img, "");
                    var filename=directoryPath.replace(onlyDir,"newfiles");
                    
                    if(firsttime===0){
                        
                        fs.mkdirSync(filename);
                    }
                    firsttime++;
                    fs.writeFile(filename + file + "", newStr, function (err) {
                        if (err) {
                            return 
                        }
                        
                    });
                })
            }
            if (count === files.length) {
                allDir.shift();
                if(allDir.length!=0){
                   
                    noOfDir=allDir.length;
                    
                    directoryPath = allDir[0];
                    update(directoryPath);
                }
               
            }
        });
    })
}

update(allDir[0]);   





