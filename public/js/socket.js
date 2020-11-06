

let socket = io();



const displayMsg= (message)=>{

    const messageScreen = document.querySelector(".message-screen");
    const msg =  document.createElement("p");
    msg.textContent = message;
    messageScreen.appendChild(msg)
}
const displaySidebar= (message)=>{

    const messageScreen = document.querySelector(".user-in-room");
    const msg =  document.createElement("p");
    msg.textContent = message;
    messageScreen.appendChild(msg)
}

const getRoomInfo =()=>{

    const username = document.querySelector("#username").value;
const room = document.querySelector("#room").value;

return {username, room}

}

socket.on('usersInRoom', (users)=>{

    users.forEach(user => {
        displaySidebar(user.username)
    });
    console.log(users)
})

socket.emit('join', getRoomInfo(), (user)=>{

    if(user.error) displayMsg("There was an error!! you couldn't join the room")
    else{

        console.log(user.user)
        user.user && user.user.logs.forEach(log => {
            
            console.log(log)
            displayMsg(`${log.userMessages.username}: ${log.userMessages.text}`);
        });
    }
})

socket.on("messageReceived", (message)=>{

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
       

        socket.emit(userAction.value, expression , getRoomInfo(), (result)=>{
            
             displayMsg(result );
           
        })

        userInput.value = "";
        userInput.focus(); 
       
})
