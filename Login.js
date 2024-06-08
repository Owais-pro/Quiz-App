const User = JSON.parse(localStorage.getItem('RegUser'));
console.log(User);
const Form = document.querySelector('form');
const UserEmail = document.querySelector('#uemail');
const UserPassword = document.querySelector('#upassword');

Form.addEventListener('submit' , (event)=>{
    event.preventDefault();
    const validation = User.find((human)=>{
 return human.Email === UserEmail.value && human.Password === UserPassword.value;
    })

    if(!validation){
        alert("Enter Correct Email & Password...!")
        return;
    }
    window.location = "main.html"
})