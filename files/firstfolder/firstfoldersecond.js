const fs = require("fs");
var projDir = "/home/netzwelt/Desktop/allwork/search/files/";
var onlyDir="files";
//var directoryPath = "./files";
var allDir = ["/home/netzwelt/Desktop/allwork/search/files/"];
var noOfDir = 1;

async function update(directoryPath) {
    console.log("this is path given"+directoryPath);
    fs.readdir(directoryPath, async function (err, files) {
        console.log("no of files"+files.length);
        var count = 0;
        var firsttime=0;
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            count++;
            var found = file.search(".js");
            if (found == -1) {
                var name = directoryPath + file + "/";
                allDir.push(name);
            } else {
                
                console.log("now reading file");
                fs.readFile(directoryPath + file + "", (err, data) => {
                    if (err) throw err;
                    data = data.toString();
                    var newStr = data.replace(/console\.log\(([^)]+)\);/img, "");
                    var filename=directoryPath.replace(onlyDir,"newfiles");
                    console.log(filename);
                    if(firsttime===0){
                        console.log("making dirctory");
                        fs.mkdirSync(filename);
                    }
                    firsttime++;
                    fs.writeFile(filename + file + "", newStr, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        
                    });
                })
            }
            if (count === files.length) {
                allDir.shift();
                if(allDir.length!=0){
                   
                    noOfDir=allDir.length;
                    console.log("This is array"+allDir);
                    directoryPath = allDir[0];
                    update(directoryPath);
                }
               
            }
        });
    })
}

update(allDir[0]);   





