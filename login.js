const LoginFunction= ()=>{
    const userName = document.getElementById("user-name").value;
    const password = document.getElementById("password").value;
    userName==='admin' && password=='admin123'
      ? (alert("Login success"), window.location.assign("./mainPage.html"))
      : alert("Login Failed");
}
document.getElementById("btn").addEventListener('click',()=>{
    LoginFunction();
});
