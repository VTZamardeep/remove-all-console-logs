const fs = require("fs");

/**please change onlyDir value to name of your project folder */
var onlyDir = "files";
/**enter the path of your project here */
var allDir=["/home/netzwelt/Desktop/allwork/search/files/"];
/**you have to create a new folder with name newfiles in same directory where project is present */
/**it will run recursively to loop through all folders and files you can see status in command terminal 
 */
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
            console.log("Reading file-------" + file);
            var data = fs.readFileSync(folder + file);
            data = data.toString();
            var newStr = data.replace(/console\.log\(([^)]+)\);/img, "");
            var filename = folder.replace(onlyDir, "newfiles");
            fs.writeFileSync(filename + file, newStr);
            console.log("Writing file-------" + filename + file);
        }
        count++;
        if(count===aa.length){
            allDir.shift();
            if(allDir.length!=0){    
                update(allDir[0]);
            }
           
        }
    });
}

update(allDir[0]);