//Basic math functions

function addition(a,b){
    return a + b;
}

function subtraction(a,b){
    return a - b;
}

function multiplication(a,b){
    return a * b;
}

function division(a,b){
    return a / b;
}


//DOM selectors & Global Variables
const numKeys = document.querySelectorAll(".numbers")
const mainScreen = document.querySelector(".main-screen")
const topScreen = document.querySelector(".top-screen")
const opKeys = document.querySelectorAll(".operators")
const defaultValue = 0;
let isNewSequence = false;  //Bolean will change to true when equal sign(=) is clicked/pressed, This resets to a new Entry for the user
let numHolder = defaultValue;
let currentOperandNum;
let prevOperandNum;



//DOM events to listen
numKeys.forEach(key => key.addEventListener("click", activateNumber))
opKeys.forEach(key => key.addEventListener("click", operatorOn))
document.querySelector(".equal").addEventListener("click", consolidate)
document.querySelector(".backspace").addEventListener("click", backSpace)
document.querySelector(".clear-all").addEventListener("click", clear)
document.querySelector(".clear-entries").addEventListener("click", clear)
document.querySelector(".reverse-sign").addEventListener("click", reverseSign)



function backSpace() {
    if(mainScreen.innerHTML === defaultValue || mainScreen.innerHTML === "0"){
        mainScreen.innerHTML = "0";
    } else {
        let displayValue = mainScreen.innerHTML;
        // let n = 3;
        if (displayValue.length > 3) {
            const i = Math.floor((displayValue.length/3))
            for (let x=0; x < i; x++){
                displayValue = displayValue.replace(",","");              
            } 
            displayValue = Array.from(displayValue);                            
            displayValue.pop();
        } else {
            displayValue = Array.from(displayValue);
            displayValue.pop();
        }        
        if (displayValue.length === 0){
            mainScreen.innerHTML = "0";
        } else{ 
            currentOperandNum = parseFloat(displayValue.join(""));
            mainScreen.innerHTML = parseFloat(displayValue.join("")).toLocaleString("en-US");
        }
        displayValue.unshift("0");
        numHolder = displayValue.join("");
    }
}



function clear(){
    mainScreen.innerHTML = defaultValue;
    topScreen.innerHTML = "";
    numHolder = defaultValue;
}


function activateNumber(e){ 
    if (isNewSequence === false){        
        if (e.target.textContent === "." && Array.from(numHolder).includes(".") === true){
            return
        }
        if (e.target.textContent === "." && mainScreen.innerHTML === "0"){
            numHolder = e.target.textContent;
            mainScreen.innerHTML = "0."
        } else {
            numHolder += e.target.textContent;
            console.log(numHolder)
            let displayValue = numHolder;
            if (displayValue.length >=10 && displayValue.length <13){
                mainScreen.style.fontSize = "2.7rem";
                mainScreen.style.marginBottom = 0;                                                                                                                             
            } else if ( displayValue.length > 12) return
            let stringNum = displayValue.toString();           
            let decimalDigit = stringNum.split(".")[1];
            let integerDigit = parseFloat(stringNum.split(".")[0])
            if (Array.from(displayValue)[Array.from(displayValue).length-1] === "."){
                displayValue = parseFloat(displayValue)
                currentOperandNum = displayValue
                let formatNum = displayValue.toLocaleString("en-US")
                mainScreen.innerHTML = `${formatNum}.`
            } else{
                displayValue = parseFloat(displayValue);
                currentOperandNum = displayValue;
                if (Number(displayValue) < 1) {
                    if (decimalDigit === undefined){
                        displayValue = `0`;                                 
                    } else {
                        displayValue = `0.${decimalDigit}`;
                    }    
                } else {
                    if (decimalDigit === undefined){
                        displayValue = `${integerDigit.toLocaleString("en-US")}`          
                    } else {
                        displayValue = `${integerDigit.toLocaleString("en-US")}.${decimalDigit}`;
                    }
                }
                mainScreen.innerHTML = displayValue;
            }
        }
            
        
    } else {
        numHolder = 0;
        numHolder += e.target.textContent;
        let displayValue = numHolder.slice(1);
        mainScreen.innerHTML = displayValue;
        topScreen.innerHTML = ""; 
        isNewSequence = false;
    }       
}

function operatorOn(e){
    if (topScreen.innerHTML === ""){
        const operand =  mainScreen.innerHTML;
        let text = mainScreen.innerHTML;
        const i = Math.floor((operand.length/3))
        for (let x=0; x < i; x++){
            text = text.replace(",","");              
        }
        prevOperandNum = parseFloat(text); 
        numHolder = 0;
        topScreen.innerHTML = `${operand} ${e.target.textContent}`;
        isNewSequence = false;
    } else {
        let screenText = topScreen.innerHTML.split(" ");
        if (screenText.length !== 2){
            const operand =  mainScreen.innerHTML;
            let text = mainScreen.innerHTML;
            const i = Math.floor((operand.length/3))
            for (let x=0; x < i; x++){
                text = text.replace(",","");              
            }
            prevOperandNum = parseFloat(text);           
            numHolder = 0;
            topScreen.innerHTML = `${operand} ${e.target.textContent}`;
            isNewSequence = false;

        } else{
            const operand1 = parseFloat(prevOperandNum);
            const operand2 = parseFloat(currentOperandNum);
            let result;
            switch (screenText[1]) {
                case "+":
                    result = addition(operand1,operand2)
                    break;
                case "–":
                    result = subtraction(operand1,operand2)
                    break;
                case "x":
                    result = multiplication(operand1,operand2);
                    break;
                default:
                    result = division(operand1,operand2)
            };
            numHolder = 0;
            prevOperandNum = result
            result = result.toLocaleString("en-US")
            mainScreen.innerHTML = `${result}`;
            topScreen.innerHTML = `${result} ${e.target.textContent}`;
            isNewSequence = false; 

        }

    }    
}

function consolidate(){
    let screenText = topScreen.innerHTML.split(" ");
    if (screenText.length !== 2) {
        return;
    } else {
        const operand1 = parseFloat(prevOperandNum);
        const operand2 = parseFloat(currentOperandNum);
        let result;
        switch (screenText[1]) {
            case "+":
                result = addition(operand1,operand2)
                break;
            case "–":
                result = subtraction(operand1,operand2)
                break;
            case "x":
                result = multiplication(operand1,operand2);
                break;
            default:
                result = division(operand1,operand2)
        };
        result = result.toLocaleString("en-US")
        console.log(operand1,operand2);
        topScreen.innerHTML = `${screenText[0]} ${screenText[1]} ${mainScreen.innerHTML}`;
        mainScreen.innerHTML = `${result}`;      
        isNewSequence = true;    
    }

}


function reverseSign(){
    if (mainScreen.innerHTML === 0 || mainScreen.innerHTML === "0") return
    let screenText = topScreen.innerHTML.split(" ");
    if (screenText.length > 2) {
        currentOperandNum = mainScreen.innerHTML;
    }
    currentOperandNum = currentOperandNum.toString()
    console.log(currentOperandNum)
    if (currentOperandNum.includes("-") === false){
        currentOperandNum = Number(currentOperandNum);
        currentOperandNum = -(currentOperandNum);
        displayValue = currentOperandNum.toLocaleString("en-US");
        mainScreen.innerHTML = displayValue;
    } else {
        currentOperandNum = Number(currentOperandNum);
        currentOperandNum = -(currentOperandNum);
        displayValue = currentOperandNum.toLocaleString("en-US");
        mainScreen.innerHTML = displayValue;
    }
    isNewSequence = false;
    // console.log(currentOperandNum)
    
}


window.onload = () => mainScreen.innerHTML = defaultValue;