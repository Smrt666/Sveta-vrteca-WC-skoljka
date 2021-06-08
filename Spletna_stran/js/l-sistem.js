function generate(sequence, rules, n){
    for(let i = 0; i < n; i++){
        let tmpArray = [];
        for (let j = 0; j < sequence.length; j++) {
            let current = sequence[j]
            if(current in rules){ //if current element is a variable and not a constant
                tmpArray = tmpArray.concat(rules[current]); //add elements of array, not the entire array
            } else {
                tmpArray = tmpArray.concat(current); //add elements of array, not the entire array
            }
        }
        sequence = tmpArray; //update sequence
    }
    return sequence;
}

function LDraw(sequence, defs, dist, draw=true){
    let meanings = { //give each string its function
        "naprej" : forward,
        "levo" : left,
        "desno" : right,
        "shrani" : save,
        "povrni" : restore
    }
    let [minX, minY, maxX, maxY] = [0, canvas.height, 0, canvas.height]; //y values are set to canvas.height, beacause of coordinate system flip

    for(let i = 0; i < sequence.length; i++){
        let current = sequence[i];
        if(current in defs){ //if the element has a definition
            defs[current].forEach(definition => { //the current sequence element may be defined as multiple axtions
                let currentArray = toArray(definition, " \t"); //separate the definition from its value
                let currentDef = currentArray[0];
                if(currentDef == "naprej"){
                    if(draw){ //draw and move
                        pendown();
                        meanings[currentDef](dist); //move forward with dist
                        penup();
                    } else{ //only move
                        meanings[currentDef](dist); //move forward with dist
                        if(pos()[0] > maxX){maxX = pos()[0]}; //finding maximum and minimum x, y values
                        if(pos()[0] < minX){minX = pos()[0]};
                        if(pos()[1] > maxY){maxY = pos()[1]};
                        if(pos()[1] < minY){minY = pos()[1]};
                    }
                }
                if(currentDef == "levo" || currentDef == "desno"){
                    let currentValue = currentArray[1]; //rotations have a value, so the currentArray is 2 long and we can get the second element
                    meanings[currentDef](parseFloat(currentValue)); //rotate for value in definition
                }
                if(currentDef == "shrani" || currentDef == "povrni"){ //save() and restore() require no arguments
                    meanings[currentDef]();
                }
            });
        }
    }

    if(!draw){return [[minX, minY], [maxX, maxY]];} //return only if searching for min/max x and y
}

function fullDraw(sequence, defs){
    let [[minX, minY], [maxX, maxY]] = LDraw(sequence, defs, 1, false);
    let xRatio = canvas.width / (maxX - minX); //width and height of canvas are not the same, so we can check the difference in picture length/height and canvas width/height with a ratio
    let yRatio = canvas.height / (maxY - minY);
    
    let dist = Math.min(xRatio, yRatio); //if the ratio is smaller, the difference in length/height is smaller, meaning the picture should be scaled in that direction

    reset(); //return to origin after searching for min/max x, y values
    move_to(-minX*dist, canvas.height - (maxY - canvas.height)*dist); //move to a new origin where the whole picture can be seen (minX and [maxY - canvas.height] are the smallest x and y positions)

    LDraw(sequence, defs, dist); //draw the picture with the new distance at a new origin
}