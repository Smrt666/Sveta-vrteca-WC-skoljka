function generate(sequence, rules, n){
    for(let i = 0; i < n; i++){
        let tmpArray = [];
        for (let j = 0; j < sequence.length; j++) {
            // console.log(sequence, sequence[j]);
            if(sequence[j] in rules){
                tmpArray = tmpArray.concat(rules[sequence[j]]);
            } else {
                tmpArray = tmpArray.concat(sequence[j]);
            }
        }
        sequence = tmpArray;
    }
    return sequence;
}

function LDraw(sequence, defs, dist, draw=true){
    let meanings = { //give each string its function
        "naprej" : forward,
        "levo" : left,
        "desno" : right
    }

    for(let i = 0; i < sequence.length; i++){
        let current = sequence[i];
        if(current in defs){ //if the element has a definition
            let currentArray = toArray(defs[current], " \t"); //separate the definition from its value
            let currentDef = currentArray[0];
            if(currentDef == "naprej"){
                if(draw){ //draw and move
                    pendown();
                    meanings[currentDef](dist); //move forward with dist
                    penup();
                } else{ //only move
                    meanings[currentDef](dist); //move forward with dist
                }
            }
            if(currentDef == "levo" | currentDef == "desno"){
                let currentValue = currentArray[1]; //rotations have a value, so the currentArray is 2 long and we can get the second element
                meanings[currentDef](parseInt(currentValue)); //rotate for value in definition
            }
        }
    }
}