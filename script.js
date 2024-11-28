let running_total = 0;
let buffer = '0';
let previous_operator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
    if(isNaN(value))
        handleSymbol(value);
    else
        handleNumber(value);
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            running_total = 0;
           break;
        case '=':
            if(previous_operator === null)
                return
            flushOperation(parseInt(buffer));
            previous_operator = null;
            buffer = running_total;
            running_total = 0;
            break;
        case '←':
            if(buffer.length === 1)
                buffer = '0';
            else
                buffer = buffer.substring(0, buffer.length - 1);
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }   
}

function handleMath(symbol){
    if(buffer === '0')
        return;

    const intBuffer = parseInt(buffer);

    if(running_total === 0)
        running_total = intBuffer;
    else
        flushOperation(intBuffer);
    previous_operator = symbol;
    buffer = '0';
}

function flushOperation(int_buffer){
    if(previous_operator === '+')
        running_total += int_buffer;
    else if(previous_operator === '−')
        running_total -= int_buffer;
    else if(previous_operator === '×')
        running_total *= int_buffer;
    else if(previous_operator === '÷')
        running_total /= int_buffer;
}

function handleNumber(number_string){
    if(buffer === '0')
        buffer = number_string;
    else
        buffer += number_string;
}

function init(){
    document.querySelector('.calc__buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

init();