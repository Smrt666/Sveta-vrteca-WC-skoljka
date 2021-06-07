function removeStartingChars(str, chars){
    let newStr = str; //if the string does not contain a space in front
    for(let i = 0; i < str.length; i++){
        if(chars.includes(str.charAt(i))){
            newStr = str.slice(i+1); //slice return a new string including the char at the given index
        } else{
            break;
        }
    }
    return newStr;
}

function toArray(str, separators){
    str += separators[0]; //add any separator to make sure the last char is not ignored

    let arr = [];
    let tmpStr = "";
    while(str){
        str = removeStartingChars(str, separators); //if the for loop was broken, delete the next separators
        for(let i = 0; i < str.length; i++){
            let current = str.charAt(i);
            if(!separators.includes(current)){
                tmpStr += current;
            } else{
                arr.push(tmpStr); //push to array if separator found
                break
            }
        }
        str = str.slice(tmpStr.length); //remove chars added before break
        tmpStr = ""; //reset tmpStr
    }
    return arr;
}

function prep(){
    let definitions = document.getElementById('definitions').value;
    let rules = document.getElementById('rules').value;
    let axiom = document.getElementById('axiom').value;
    let iterations = document.getElementById('iterations').value;

    let defsDict = {}
    let defsArray = toArray(definitions, "\n;"); //turn definitions into array with newline and ; as separators
    for(let i = 0; i < defsArray.length; i++){
        let def = toArray(defsArray[i], "=:"); //turn each line into an array
        defsDict[def[0].trim()] = def[1].trim(); //write to dict
    }

    let rulesDict = {}
    let rulesArray = toArray(rules, "\n;");
    for(let i = 0; i < rulesArray.length; i++){
        let rule = toArray(rulesArray[i], "=:"); //turn each line into an array
        rulesDict[rule[0].trim()] = toArray(rule[1], " \t"); //write to dict
    }

    let axiomArray = toArray(axiom, " \t");

    let iterValue = parseInt(iterations)
    if(!(iterValue > 0 && iterValue != NaN)){ //if iterations input is not a positive integer or is NaN
        alert("Število iteracij naj bo 0 ali več (ne priporočam iti višje kot 8)");
        return; //end the function
    }

    return [defsDict, rulesDict, axiomArray, iterValue];
}