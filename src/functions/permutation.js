import {create, all} from "mathjs";

const config = {};
const math = create(all, config);

let permutationTable = math.matrix();
permutationTable.resize([0]);

const createPermutationTable = function(box_width, box_height) {
    const a = math.matrix();
    let m = box_width*box_height;
    a.resize([m]);
    let i = 0;
    a.forEach(function (value, index, matrix) {
        matrix.set(index, i);
        i++;
    })
    
    //fisher-yates shuffle
    while (m) {
        i = Math.floor(Math.random() * m--);
        let t = a.get([m]);
        a.set([m], a.get([i]));
        a.set([i], t);
    }
    return a;
}

const permutation = function(input, box_width, box_height) {
    let box_size = box_width*box_height;
    if(box_size > 0){
        permutationTable = createPermutationTable(box_width, box_height);

        let cypher = "";
        for (let i = 0; i < input.length; i++){
            let currentLetter = (input[i].codePointAt() >>> 0).toString(2);
            let diff = 8 - currentLetter.length;
            for (let j = 0; j < diff; j++){
                currentLetter = 0+currentLetter;
            }
            cypher += currentLetter;
        }

        let bitDiff = cypher.length % box_size;
        if (bitDiff!==0){
            for (let i = 0; i < box_size - bitDiff; i++){
                cypher += 0;
            }
        }

        let binary_cypher = "";
        for (let i = 0; i < cypher.length; i += Number(box_size)){
            let currentByte = cypher.substring(i, i+box_size);
            for (let j = 0; j < box_size; j++){
                let s = currentByte[permutationTable.get([j])];
                binary_cypher += s;
            }
        }

        /*bitDiff = binary_cypher.length % 8;
        if (bitDiff!==0){
            for (let i = 0; i < 8 - bitDiff; i++){
                binary_cypher += 0;
            }
        }*/

        let unicode_cypher = "";
        for (let i = 0; i < binary_cypher.length; i += 8) {
            unicode_cypher += String.fromCodePoint(parseInt(binary_cypher.substring(i, i+8), 2));
        }

        return [binary_cypher, permutationTable, unicode_cypher];
    }
    else {
        permutationTable.resize([0]);
        return ["∅", permutationTable, "∅"];
    }
}

export {permutation};