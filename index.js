const Form = document.querySelector('#form');
const FirstName = document.querySelector('#fname');
const LastName = document.querySelector('#lname');
const Email = document.querySelector('#email');
const Password = document.querySelector('#password');

Form.addEventListener('submit', (event)=>{

    event.preventDefault();
    let RegisterUser;
    let items = JSON.parse(localStorage.getItem('RegUser'));
   if(items === null)
    {
        RegisterUser = [];
    }
    else{
        RegisterUser = items;
    }
     const check = RegisterUser.find((user)=>{
       return user.Email === Email.value;
     });

     if(check)
        {
            alert('Email Already Exists..!');
            return;
        }


     NewUser = {
        Email: Email.value,
        Password: Password.value
    }
    RegisterUser.push(NewUser);
    localStorage.setItem('RegUser', JSON.stringify(RegisterUser));

    alert('Registration successful!');
    Form.reset();

    window.location = "Login.html";
})