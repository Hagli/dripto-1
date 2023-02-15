import {create, all} from "mathjs";

const config = {};
const math = create(all, config);

let lookupTable = math.matrix();
lookupTable.resize([0]);

const createLookupTable = function(input_size) {
    const a = math.matrix();
    const max = Math.pow(2, input_size-2);
    a.resize([4, max]);
    a.forEach(function (value, index, matrix) {
        matrix.set(index, Math.floor(Math.random() * max));
    })
    return a;
}

const substitution = function(input, input_size) {
    if(input_size > 2){
        lookupTable = createLookupTable(input_size);

        let cypher = "";
        for (let i = 0; i < input.length; i++){
            let currentLetter = (input[i].codePointAt() >>> 0).toString(2);
            let diff = 8 - currentLetter.length;
            for (let j = 0; j < diff; j++){
                currentLetter = 0+currentLetter;
            }
            cypher += currentLetter;
        }

        let bitDiff = cypher.length % input_size;
        if (bitDiff!==0){
            for (let i = 0; i < input_size - bitDiff; i++){
                cypher += 0;
            }
        }

        let binary_cypher = "";
        for (let i = 0; i < cypher.length; i += Number(input_size)){
            let currentByte = cypher.substring(i, i+input_size);
            let x = parseInt(currentByte.substring(1, input_size - 1), 2);
            let y = parseInt(currentByte[0] + currentByte[input_size - 1], 2);
            let s = (lookupTable.get([y, x]) >>> 0).toString(2);
            let diff = input_size - 2 - s.length;
            for (let j = 0; j < diff; j++){
                s = 0+s;
            }
            binary_cypher += s;
        }

        bitDiff = binary_cypher.length % 8;
        if (bitDiff!==0){
            for (let i = 0; i < 8 - bitDiff; i++){
                binary_cypher += 0;
            }
        }
        let unicode_cypher = "";
        for (let i = 0; i < binary_cypher.length; i++) {
            unicode_cypher += String.fromCodePoint(parseInt(binary_cypher.substring(i, i+8), 2));
        }

        return [binary_cypher, lookupTable, unicode_cypher];
    }
    else {
        lookupTable.resize([0]);
        return ["∅", lookupTable, "∅"];
    }
}

export {substitution};