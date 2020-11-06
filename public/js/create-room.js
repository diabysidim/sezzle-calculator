// create new room
const CreateButton = document.querySelector("#create-room").addEventListener("submit", async (e)=>{

    e.preventDefault();

    const name = getFormInput(e,"name");
    const description = getFormInput(e,"description");

    

    try{

        const response  = await fetch("http://localhost:3000/rooms", {
            method: "POST",
            body: JSON.stringify({name, description}),
            headers:{
                "Content-type":"application/json",
        }})       

        if(response.status === 200){            

            const data = await response.json();
            alert(`the room ${data.name} was created`)
            
            changeUrl("http://localhost:3000/rooms/"+data._id)
        }
        else{
            alert(`there was a probleme creating the room. Choose another name please`)
        }
    }
    catch(err){

        console.log(err)

    }
    



})