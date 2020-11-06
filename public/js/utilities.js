const changeUrl = (url)=>( window.location.href =url);

const getFormInput=(e, name)=>(e.target.elements[name].value);

const goback = ()=>{

        window.history.back();
}

const reload = ()=>{

    location.reload();
}
