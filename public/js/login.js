


const loginForm =  document.querySelector("#login-form");


// login request

const login =  loginForm.addEventListener("submit", async (e)=>{

    e.preventDefault();
    const loginInfo = {userName: getFormInput(e,"userName"), password: getFormInput(e,"password")}

    try{

        const response  = await fetch("https://sidi-sezzle-calculator.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(loginInfo),
            headers:{
                "Content-type":"application/json",
        }})       

        if(response.status === 200){            

            const data = await response.json();
            console.log(data)
            
            changeUrl("https://sidi-sezzle-calculator.herokuapp.com")
        }
        else{
            document.querySelector("p.error").textContent="The username or password is not valid"
            console.log("the username or password is not valid")
        }
    }
    catch(err){

        console.log(err)

    }
   
})