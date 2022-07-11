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
    if (b === 0){
        return "Undefined"      
    } else {
        return a / b;
    }
    
}


//DOM selectors & Global Variables
const numKeys = document.querySelectorAll(".numbers")
const mainScreen = document.querySelector(".main-screen")
const topScreen = document.querySelector(".top-screen")
const opKeys = document.querySelectorAll(".operators")
const popWindow = document.querySelector("#pop-up-window")
const calcFace = document.querySelector("#main-cont")
const entryOne = document.querySelector(".entry-one")
const entryTwo = document.querySelector(".entry-two")
const entryThree = document.querySelector(".entry-three")
const entryFour = document.querySelector(".entry-four")
const entryFive = document.querySelector(".entry-five")
const entry = document.querySelectorAll(".entry")
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
document.querySelector(".clear-entries").addEventListener("click", clearPastEntries)
document.querySelector(".reverse-sign").addEventListener("click", reverseSign)
document.querySelector("#past-entries").addEventListener("click", popUpEntries)

window.addEventListener("keydown", pressBackSpace)
window.addEventListener("keydown", pressNumbers)
window.addEventListener("keydown", pressOperators)
window.addEventListener("keydown", pressEqual)

function pressBackSpace(e){   
    const bSpace = document.querySelector(".backspace");
    if (bSpace.getAttribute("data-key") === `${e.keyCode}`){
        backSpace();
    } else return
}


function pressNumbers(e){
    const numPad = document.querySelector(`.numbers[data-key="${e.keyCode}"]`)
    if (!numPad) return
    if (numPad.textContent === `${e.key}`){
        if (isNewSequence === false){        
            if (numPad.textContent === "." && Array.from(numHolder).includes(".") === true){
                return
            }
            if (numPad.textContent === "." && mainScreen.innerHTML === "0"){
                numHolder = numPad.textContent;
                mainScreen.innerHTML = "0."
            } else {
                numHolder += numPad.textContent;
                // console.log(numHolder)
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
            numHolder += numPad.textContent;
            let displayValue = numHolder.slice(1);
            mainScreen.innerHTML = displayValue;
            topScreen.innerHTML = ""; 
            isNewSequence = false;
        }       
       
    } else return;
}

function pressOperators(e){
    const operator = document.querySelector(`.operators[data-key="${e.keyCode}"]`)
    if (!operator) return
    if (operator.getAttribute("data-key") === `${e.keyCode}`){
        if (topScreen.innerHTML === ""){
            const operand =  mainScreen.innerHTML;
            let text = mainScreen.innerHTML;
            const i = Math.floor((operand.length/3))
            for (let x=0; x < i; x++){
                text = text.replace(",","");              
            }
            prevOperandNum = parseFloat(text); 
            numHolder = 0;
            topScreen.innerHTML = `${operand} ${operator.textContent}`;
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
                topScreen.innerHTML = `${operand} ${operator.textContent}`;
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
                topScreen.innerHTML = `${result} ${operator.textContent}`;
                isNewSequence = false; 
    
            }
    
        } 

    }

}

function pressEqual(e){
    const equal = document.querySelector(".equal")
    if (!equal) return
    if (equal.getAttribute("data-key") === `${e.keyCode}`){
        consolidate();
    }

}

function clearPastEntries(){
    entry.forEach( ent =>  ent.textContent = "" );
    clear();
    document.querySelector(".head").textContent = "There is no history yet";
}

function popUpEntries(){
    if (popWindow.style.display === ""){
        popWindow.style.display = "flex";
        popWindow.style.backgroundColor = "rgb(146, 159, 187)"   //light blue
        popWindow.style.color = "black"
        calcFace.style.opacity = "0.7"
    } else {
        popWindow.style.display = "";
        calcFace.style.opacity = "1";
    }
}



function backSpace() {
    if(mainScreen.innerHTML === defaultValue || mainScreen.innerHTML === "0"){
        mainScreen.innerHTML = "0";
    } else {
        let displayValue = mainScreen.innerHTML;
        if (displayValue.includes("0.") === true){
            displayValue = Array.from(displayValue);
            displayValue.pop();       
            if (displayValue.length === 0){
                mainScreen.innerHTML = "0";
            } else{ 
                currentOperandNum = parseFloat(displayValue.join(""));
                mainScreen.innerHTML = (displayValue.join(""));
            }
            displayValue.unshift("0");
            numHolder = displayValue.join("");

        }else {
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
            if (displayValue.length < 10){
                mainScreen.style.fontSize = "3.5rem";
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
            // console.log(numHolder)
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
        // console.log(operand1,operand2);
        topScreen.innerHTML = `${screenText[0]} ${screenText[1]} ${mainScreen.innerHTML}`;
        mainScreen.innerHTML = `${result}`;      
        isNewSequence = true; 
        if (entryOne.textContent !== "" ){
            if(entryTwo.textContent !== ""){
                if(entryThree.textContent !== ""){
                    if(entryFour.textContent !== ""){
                        document.querySelector(".head").textContent = "";
                        entryFive.textContent = entryFour.textContent;
                        entryFour.textContent = entryThree.textContent;
                        entryThree.textContent = entryTwo.textContent;
                        entryTwo.textContent = entryOne.textContent;
                        entryOne.textContent = `${screenText[0]} ${screenText[1]} ${currentOperandNum.toLocaleString("en-US")} = ${result}`;
                    } else {
                        document.querySelector(".head").textContent = "";
                        entryFour.textContent = entryThree.textContent;
                        entryThree.textContent = entryTwo.textContent;
                        entryTwo.textContent = entryOne.textContent;
                        entryOne.textContent = `${screenText[0]} ${screenText[1]} ${currentOperandNum.toLocaleString("en-US")} = ${result}`;
                    }
                }  else {
                    document.querySelector(".head").textContent = "";
                    entryThree.textContent = entryTwo.textContent;
                    entryTwo.textContent = entryOne.textContent;
                    entryOne.textContent = `${screenText[0]} ${screenText[1]} ${currentOperandNum.toLocaleString("en-US")} = ${result}`;
                }              
            } else {      
                document.querySelector(".head").textContent = "";      
                entryTwo.textContent = entryOne.textContent;
                entryOne.textContent = `${screenText[0]} ${screenText[1]} ${currentOperandNum.toLocaleString("en-US")} = ${result}`;                            
            }              
        } else {
            document.querySelector(".head").textContent = "";
            entryOne.textContent = `${screenText[0]} ${screenText[1]} ${currentOperandNum.toLocaleString("en-US")} = ${result}`           
        }
    }
}


function reverseSign(){
    if (mainScreen.innerHTML === 0 || mainScreen.innerHTML === "0") return
    let screenText = topScreen.innerHTML.split(" ");
    if (screenText.length > 2) {
        currentOperandNum = mainScreen.innerHTML;
    }
    currentOperandNum = currentOperandNum.toString()   
    if (currentOperandNum.includes("0.") === true){
        currentOperandNum = Number(currentOperandNum);
        currentOperandNum = -(currentOperandNum);
        displayValue = currentOperandNum;
        mainScreen.innerHTML = displayValue;        
    } else {
        currentOperandNum = Number(currentOperandNum);
        currentOperandNum = -(currentOperandNum);
        displayValue = currentOperandNum.toLocaleString("en-US");
        mainScreen.innerHTML = displayValue;
    }
    isNewSequence = false;
    
}


window.onload = () => mainScreen.innerHTML = defaultValue;