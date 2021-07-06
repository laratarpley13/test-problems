// handle addition
const handleAddition = function (equation) {
    const strings = handleParanthesis(equation, '+');

    const toNumbers = strings.map(e => handleSubtraction(e));
    const result = toNumbers.reduce((acc, num) => acc + num, 0);
    return result;
}

// handle substraction
const handleSubtraction = function (equation) {
    const strings = handleParanthesis(equation, '-');

    const toNumbers = strings.map(e => handleDivision(e));
    const result = toNumbers.slice(1).reduce((acc, num) => acc - num, toNumbers[0]);
    return result;
}

// handle multiplication
const handleMultiplication = function (equation) {
    const strings = handleParanthesis(equation, '*');

    const toNumbers = strings.map(e => {
        if(e[0] === '(') {
            return handleAddition(e.substr(1, e.length - 2));
        }
        return parseInt(e);
    });
    const result = toNumbers.reduce((acc, num) => acc * num, 1);
    return result;
}

// handle division
const handleDivision = function (equation) {
    const strings = handleParanthesis(equation, '/');

    const toNumbers = strings.map(e => handleMultiplication(e));
    const result = toNumbers.slice(1).reduce((acc, num) => acc / num, toNumbers[0]);
    return result;
}

//handle paranthesis
const handleParanthesis = function (equation, sign) {
    const result = [];
    let paranthesis = 0;
    let currentSection = "";
    
    for(let i = 0; i < equation.length; i++) {
        const current = equation[i];
        if(current === '(') {
            paranthesis ++;
        }
        else if(current === ')') {
            paranthesis --;
        }
        if(paranthesis === 0 && sign === current) {
            result.push(currentSection);
            currentSection = "";
        }
        else {
            currentSection += current;
        }
    }
    if(currentSection !== "") {
        result.push(currentSection);
    }
    return result
}

const prompt = require('prompt-sync')();

const equation = prompt('Enter a valid equation: ');
console.log(handleAddition(equation));