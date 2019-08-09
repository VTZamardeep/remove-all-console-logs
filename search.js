/**
 * To remove all console.log() please create a folder named newfiles on your computer in the same directory where 
 * project is present.
 */


const fs = require("fs");

/**onlyDir variable shouls be your name of project folder */
var onlyDir = "files";
/**alldir is array it must contain first element as path to your project folder */
var allDir=["/home/netzwelt/Desktop/allwork/search/files/"];

async function update(folder){
    var count=0;
    var aa = fs.readdirSync(folder);
    aa.forEach(file => {
        var found = file.search(".js");
        if (found == -1) {
            console.log("DIRECTORY FOUND-----"+file);
            var name = folder + file + "/";
            allDir.push(name);
            var filename = name.replace(onlyDir, "newfiles");
            console.log("CREATING DIRECTORY------"+filename);
            fs.mkdirSync(filename);
           
        }else{
            console.log("Reading-------" + file);
            var data = fs.readFileSync(folder + file);
            data = data.toString();
            var newStr = data.replace(/console\.log\(([^)]+)\);/img, "");
            var filename = folder.replace(onlyDir, "newfiles");
            fs.writeFileSync(filename + file, newStr);
            console.log("wririnf file-------" + filename + file);
        }
        count++;
        if(count===aa.length){
            allDir.shift();
            console.log(allDir);
            if(allDir.length!=0){
                update(allDir[0]);
            }
           
        }
    });
}

update(allDir[0]);