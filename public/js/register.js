

const registerForm =  document.querySelector("#register-form");
const register =  registerForm.addEventListener("submit", async (e)=>{

    e.preventDefault();
    const registerInfo = {firstName: getFormInput(e,"firstName"),lastName: getFormInput(e,"lastName"),userName: getFormInput(e,"userName"), password: getFormInput(e,"password")}

    try{

        const response  = await fetch("http://localhost:3000/register", {
            method: "POST",
            body: JSON.stringify(registerInfo),
            headers:{
                "Content-type":"application/json",
        }})       

        if(response.status === 200){            

            const data = await response.json();
            console.log(data)
            
            changeUrl("http://localhost:3000")
        }
        else{
            console.log("the username or password is not valid")
        }
    }
    catch(err){

        console.log(err)

    }
   
})