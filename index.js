
const inputSlider = document.querySelector("[data-lengthSlider]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const lengthDisplay = document.querySelector("#lengthNum");
const copyMsg = document.querySelector("[data-copyMsg]");
const copyBtn = document.querySelector("[data-copyBtn]");
const uppercaseCheck= document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const symbolCheck = document.querySelector("#symbols")
const NumCheck = document.querySelector("#numbers")
const allCheckbox = document.querySelectorAll("input[type=checkbox]")
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-btn");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password ="";
let passwordLength = 10;
let checkCount = 0;

handleSlider();
//ste strength circle color to grey
setIndicator("#ccc");
//set passwordLength in ui 
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi karna chahiye ? - HW
   
}

// input paranmeter ka color set karta hai

function setIndicator(color) 
{
indicator.style.backgroundColor = color;
indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}

// min max ki range me ek integer find karke deta hai 
function getrandomInteger(min,max) {
return Math.floor(Math.random()*(max-min)) + min ;
//  

}


 function generateRandomNum(){
    return getrandomInteger(0,9)
 }

 function generateLowercase() {
    return String.fromCharCode(getrandomInteger(97,123));

 }
 function generateUppercase() {
    return String.fromCharCode(getrandomInteger(65,90));

 }

 function generateSymbols() {
    // method to find the length of string 
    const randnum = getrandomInteger(0,symbols.length)
    
    return symbols.charAt(randnum); // uss index pe kon sa symbol pada hai vo bata hai . its a function 
 }

 function strengthHandler() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (NumCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContenet() {
// navigator.clipboard.writeText method se hum clipboard me copy kar rahe hai it will return a promise and when it is fullfill then success and it is async and when our text is copied then we show the copied msg that's why we are using await keyword 

try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
}
catch(e) {
    copyMsg.innerText = "Failed";
}
//to make copy wala span visible this is for css 
copyMsg.classList.add("active");

setTimeout( () => {
    copyMsg.classList.remove("active");
},2000);

}

function handleCheckboxChange(){
 checkCount=0;
 allCheckbox.forEach( (checkbox) =>{
    if (checkbox.checked)
    checkCount++;
 })

 // special case 
  if (passwordLength < checkCount){
    passwordLength = checkCount
    handleSlider();
  }

}

allCheckbox.forEach( (checkbox) =>{
    checkbox.addEventListener('change', handleCheckboxChange);
})
 
inputSlider.addEventListener('input', (e)=> {
    passwordLength= e.target.value;
    handleSlider(passwordLength);
})

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value)
    copyContenet(); // agar koi value nhi padi toh hum copy nhi kar payaenge lekin agr koi value uss input ke ander exit karti hai toh hume copycontent function ko call karna hai. another method ki agar pssword ki length greater than zero hai toh copyContent function ko cal karna hai. 
})


function sufflePassword(array){
    // we have one method for suffling 
    // fisher yate method 
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;


}

generateBtn.addEventListener('click',() =>{
    // agar koi checkbosx me tick nhi hai toh generate btn davane se bhi password generate nhi hoga tabhi hume checkbox ke coun t ki need pad rahi hai but abhi vo update nhi ho raha hai toh hume checkbox me bhi eventlistner lagana padega for the tracking of checkbox 
if (checkCount==0) return;

if(passwordLength < checkCount){
    passwordLength= checkCount;
    handleSlider();
}

// let start the jouney of new password 
console.log("Starting the Journey");
//remove old password if we want to genrate the new password
password="";

// let put the staff mentioned by checkbox 

// if (uppercaseCheck.checked){
//     password += generateUppercase();
// }

// if (lowercaseCheck.checked){
//     password += generateLowercase();
// }
// if (symbolCheck.checked){
//     password += generateSymbols();
// }
// if (NumCheck.checked){
//     password += generateRandomNum();
// }
 let funcArr =[];

 if (uppercaseCheck.checked){
    funcArr.push(generateUppercase);
 }
 if (lowercaseCheck.checked){
    funcArr.push(generateLowercase);
 }
 if (NumCheck.checked){
    funcArr.push(generateRandomNum);
 }
 if (symbolCheck.checked){
    funcArr.push(generateSymbols);
 }
 
 //compulsory additions 
for( let i=0; i<funcArr.length; i++){
    password += funcArr[i]();
}
console.log("Compulsory adddition done");
// remaining addition 
for(let i=0; i< passwordLength-funcArr.length; i++){
    let randomIndex = getrandomInteger(0,funcArr.length);
    password += funcArr[randomIndex]();

}
console.log("Remaining adddition done");
// suffle the password 
password = sufflePassword(Array.from(password));
console.log("Shuffling done");
// password show in ui
passwordDisplay.value = password;
console.log("ui addition done");
// claculation of strength function ko bhi call karna padega 
strengthHandler();

}) 



