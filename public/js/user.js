
// delete user action button

document.querySelector("a.delete-button").addEventListener("click", async (e)=>{

    e.preventDefault();

        const conf = confirm("Dou you want to Delete your Account PERMANENTLY?")
       const id= conf? e.target.getAttribute('id') : null
       if(id){
                     
        try{
                   
            const response  = await fetch("http://localhost:3000/users/"+id, {
                method: "Delete"})       
    
            if(response.status === 200){            
                
                
              alert("Your account was deleted");
                
                changeUrl(`http://localhost:3000/login`)
            }
            else{
                alert("there was a problem deleting your account");
            }
        }
        catch(err){
    
            console.log(err)
    
        }
    }

        

    
})

//update user button

document.querySelector("#update-form").addEventListener("submit", async (e)=>{

    e.preventDefault();
    const registerInfo = {firstName: getFormInput(e,"firstName"),lastName: getFormInput(e,"lastName"),userName: getFormInput(e,"userName"), password: getFormInput(e,"password")}

    if(registerInfo.password !== getFormInput(e,"passwordConfirmation")) {
        alert("The password entered are different");
        return;
    }

    try{

        const response  = await fetch("http://localhost:3000/users/"+getFormInput(e,"id"), {
            method: "PATCH",
            body: JSON.stringify(registerInfo),
            headers:{
                "Content-type":"application/json",
        }})       

        if(response.status === 200){            

            const data = await response.json();
           
            alert("your account has been successfully updated")
            
            changeUrl("http://localhost:3000/users/"+data._id)
        }
        else{
           alert("This username is taken try a new one");
        }
    }
    catch(err){

        console.log(err)

    }
   
})