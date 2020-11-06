


 document.querySelector("#sidebar-open") && document.querySelector("#sidebar-open").addEventListener('click', (e)=>{
   
    document.querySelector(".sidebar").style.display ="none";;
    document.querySelector("#sidebar-close").style.display="block"
})

document.querySelector("#sidebar-close") && document.querySelector("#sidebar-close").addEventListener('click', (e)=>{
   
    document.querySelector(".sidebar").style.display ="block";;
    document.querySelector("#sidebar-close").style.display="none"
})