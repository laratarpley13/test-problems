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

const graph = function (x, y) {
    let xVal;
    let yVal = handleAddition(y);
    
    if(x === '') {
        xVal = 0;
    } else {
        xVal = handleAddition(x);
    }

    let prevX = xVal;
    let prevY = yVal;

    let data = [];

    for(let i=0; i<100; i+=10) {
        if(xVal === 0) {
            data.push({x: 0, y: prevY})
            prevY += 10;
            continue;
        }
        else {
            data.push({x: prevX, y: prevY});
            prevX += 10;
            prevY += 10;
        }
    }

    return(data);
}

//chart set up
$('#graph-form').submit((e) => {
    e.preventDefault();
    let yExpression = $('#y').val();
    let xExpression = $('#x').val();
    makeChart(xExpression, yExpression);
})

const makeChart = function (xExpression, yExpression) {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        zoomEnabled: true,
        title:{
            text: "Calculate Given Points"
        },
        axisX: {
            title:"X",
            minimum: -50,
            maximum: 50
        },
        axisY:{
            title: "Y",
            minimum: -50,
            maximum: 50
        },
        data: [{
            type: "scatter",
            dataPoints: graph(xExpression, yExpression)
        }]
    });
    chart.render();
    
}