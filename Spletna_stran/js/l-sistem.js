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

// function string(array){
//     let result = '';
//     for (let i = 0; i < array.length; i++){
//         result += array[i];
//     }
//     return result;
// }