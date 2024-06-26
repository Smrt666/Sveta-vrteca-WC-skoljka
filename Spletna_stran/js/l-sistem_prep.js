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
        str += separators[0]; //add any separator on the first call to make sure the last char is not ignored
    }
    str = removeStartingChars(str, separators);

    let tmpStr = "";
    for(let i = 0; i < str.length; i++){
        let current = str.charAt(i);
        if(!separators.includes(current)){
            tmpStr += current; //save the char to a string and don't push
        } else{
            arr.push(tmpStr); //push to array if separator found
            return toArray(str.slice(i), separators, arr); //remove the newly found chars and pass the new string to the function recursively
        }
    }
    return arr; //the function returns when the string has length 0 and sends the array up the recursion call list
}

function canvasPrep(){
    let width = window.innerWidth; //window height and width
    let height = window.innerHeight;

    let minimum = Math.min(width, height);

    if(minimum == height){minimum *= 0.7;} //if height is chosen, scale it down

    canvas.width = minimum; //set resolution to minimum of window height and width
    canvas.height = minimum;

    canvas.style.height = canvas.height; //scale canvas with css
    canvas.style.width = canvas.width;
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
        "koch-curve" : ["F = naprej\n+ = levo 120\n- = desno 60", "F = F - F + F - F", "F", 0],
        "koch-snowflake" : ["F = naprej\n+ = levo 120\n- = desno 60", "F = F - F + F - F", "F + F + F", 0],
        "binary-tree": ["B = naprej\nT = naprej\n[ = shrani, levo 20\n] = povrni, desno 20\nF = naprej", "T = B B [ T ] T\nB = B F", "T", 0],
        "square" : ["F = naprej\n+ = levo 90\n- = desno 90", "F = F + F - F - F + F", "F - F - F - F", 0],
        "dragon-curve" : ["F = naprej\n+ = desno 90\n- = levo 90\nD = naprej", "F = F + D\nD = F - D", "F", 0],
        "Levy-C-curve" : ["F = naprej\n+ = desno 45\n- = levo 90", "F = + F - F +", "- - F", 0],
        "koch2" : ["F = naprej\n+ = levo 80\n- = desno 160\nz = desno 90", "F = F + F - F + F", "z F", 0],
        "wierd-flower" : ["F = naprej\n[ = shrani\n] = povrni\n+ = levo 30\n- = desno 30", "F = F [ + F F ] [ - F F ] F [ - F ] [ + F ] F", "F", 0],
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