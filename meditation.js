/*
Peter likes numbers. As a meditation exercise, he likes to write down all the numbers starting
with 1 whose digits are sorted in ascending order. For example, 11235888 is such a number. After a
while, he stops.
*/

const meditation = function (n) {
    if(String(n).length === 1) {
        return n;
    }

    let toList = String(n).split("");

    for(let i = 0; i<toList.length; i++) {
        if(toList[i + 1] < toList[i]) {
            for(let j = i+1; j<toList.length; j++) {
                toList[j] = 9;
            }

            if(i === toList.length - 1) {
                return(toList.join(""));
            }
            else {
                toList[i] --;
                for(let j=i; j>0; j--) {
                    if(toList[j-1] > toList[j]) {
                        toList[j] = 9;
                        toList[j-1] --;
                    }
                }
            }
            for(let j=0; j<toList.length; j++) {
                if(toList[j] === 0) {
                    toList.splice(j, 1);
                }
            }
        }
    }

    return(toList.join(""));
}

const prompt = require('prompt-sync')();

const n = prompt('Enter a number: ');
console.log(meditation(n));