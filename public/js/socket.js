
let socket = io();



const displayMsg= (message)=>{

    const messageScreen = document.querySelector(".message-screen");
    const msg =  document.createElement("p");
    msg.textContent = message;
    messageScreen.appendChild(msg)
}


socket.on("message", (message)=>{

    displayMsg(message);
})


socket.on("joined", (message)=>{

    displayMsg(message);
})

socket.on("Left", (message)=>{

    displayMsg(message)
   
})
const calculatorForm =  document.querySelector("#calculator-form").addEventListener("submit", (e)=>{
        e.preventDefault();

        const {userInput, userAction} = e.target.elements;

        const expression = userInput.value
       

        socket.emit(userAction.value, expression , (result)=>{
            
            const resultArray = result.toString().split(" ");
            (resultArray[0] === "ERROR!!")?  displayMsg(result): displayMsg(expression +" = " + result );
           
        })

        userInput.value = "";
        userInput.focus(); 
       
})
