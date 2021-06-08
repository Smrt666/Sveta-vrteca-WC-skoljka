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

function toArray(str, separators, arr=[]){
    if(arr.length == 0){
        str += separators[0]; //add any separator to make sure the last char is not ignored
    }
    str = removeStartingChars(str, separators);

    let tmpStr = "";
    for(let i = 0; i < str.length; i++){
        let current = str.charAt(i);
        if(!separators.includes(current)){
            tmpStr += current;
        } else{
            arr.push(tmpStr); //push to array if separator found
            return toArray(str.slice(i), separators, arr);
        }
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
        let defLine = toArray(defsArray[i], "=:"); //turn each line into an array

        let actions = toArray(defLine[1], ","); //array of actions 
        actions.forEach((element, index, arr) => {arr[index] = element.trim();}); //trim each action

        defsDict[defLine[0].trim()] = actions; //write to dict
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
        return [defsDict, rulesDict, axiomArray, 0]; //end the function
    }

    return [defsDict, rulesDict, axiomArray, iterValue];
}

function change(object){
    let values = {
        "custom" : ["", "", "", 0],
        "s-triangle" : ["F = naprej\nG = naprej\n+ = levo 120\n- = desno 120", "F = F - G + F + G - F\nG = G G", "F - G - G", 0],
        "koch-curve" : ["F = naprej\n+ = levo 120\n- = desno 60", "F = F - F + F - F", "F", 0]
    }

    let definitions = document.getElementById('definitions');
    let rules = document.getElementById('rules');
    let axiom = document.getElementById('axiom');
    let iterations = document.getElementById('iterations');

    definitions.value = values[object.value][0];
    rules.value = values[object.value][1];
    axiom.value = values[object.value][2];
    iterations.value = values[object.value][3];
}