
const xhr = new XMLHttpRequest(),
method = "GET",
url = "http://localhost:3000/login";

xhr.open(method, url, true);
xhr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem("token"))
xhr.onreadystatechange = function () {
// In local files, status is 0 upon success in Mozilla Firefox
if(xhr.readyState === XMLHttpRequest.DONE) {
var status = xhr.status;

if (status === 0 || (status >= 200 && status < 400)) {
  
    if(status === 200) window.location
} else {
  // Oh no! There has been an error with the request!
}
}
};


xhr.send();