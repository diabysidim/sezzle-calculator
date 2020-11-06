

// delete room action
const deleteButton =  document.querySelectorAll("a.delete-btn");

deleteButton.forEach(btn=> btn.addEventListener("click", async (e)=>{

    e.preventDefault();

        const name = confirm("do you want to delete this room?")
       const id= name? e.target.getAttribute('id') : null
       if(id){
                     
        try{
                   
            const response  = await fetch("http://localhost:3000/rooms/"+id, {
                method: "Delete"})       
    
            if(response.status === 200){            
                

                const data = await response.json();
                
              alert("the room was deleted");
                
                reload();
            }
            else{
                alert("there was a problem deleting the room");
            }
        }
        catch(err){
    
            console.log(err)
    
        }
    }

        

    
}))
