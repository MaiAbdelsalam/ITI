loginBtn=document.getElementById('loginBtn')
console.log(loginBtn)
let email=document.querySelector('.email');
console.log(email)
let pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

let password=document.querySelector('.password');
console.log(password)

let alertLabel=document.querySelectorAll('.alert-label')
console.log(alertLabel)
// document.querySelector('.alert-label').innerHTML = "Test Error";

console.log(loginBtn ,email ,password ,alertLabel)
console.log(email)

loginBtn.addEventListener('click', async(e)=> {
  e.preventDefault();
  // console.log('hi')

})

loginBtn.addEventListener('click', async(e)=> {
  err=false
  e.preventDefault();
  console.log(password)
  alertLabel.forEach(label=>{
    label.style.display='none'
  })
  
  if(email.value=='' || password.value=='' ){
    alertLabel[0].style.display='block'
    alertLabel[0].innerHTML=`<i class="fa-solid fa-square-xmark"></i> please fill data`
    err=true
    console.log(email.value,password.value)
  }
  
  if(email.value.match(pattern)==null){
    alertLabel[1].style.display='block'
    alertLabel[1].innerHTML=`<i class="fa-solid fa-square-xmark"></i> Enter Valid Email` ;
    err=true
    console.log('hi mai');
  }
  if(err) return
    else{
  
      const resUser = await fetch(`http://localhost:3000/users?email=${email.value}&password=${password.value}`)
      console.log(resUser )
      let users = await resUser.json();
      console.log(users)
 
      console.log(users)
      if(users.length==0){
        console.log(users.length)
        alertLabel[0].style.display='block'
        alertLabel[0].innerHTML=`<i class="fa-solid fa-square-xmark"></i> Enter Valid data` ;
      }
      else {
        act=users[0].isActive==false
        if(act){
        console.log(users[0].isActive)
        alertLabel[0].style.display='block'
        alertLabel[0].innerHTML=`<i class="fa-solid fa-square-xmark"></i> Your Account is blocked` ;
        console.log(alertLabel[0])
        // alertLabel[0].innerHTML=`<i class="fa-solid fa-square-xmark"></i> Your Account is blocked` ;
      }
      else if(users[0].role=='admin' || users[0].role=='super admin'){
        localStorage.setItem("userInfo", JSON.stringify(users[0])) 
        window.location='admin.html'

      }
      else if(users[0].role=='user'){
        localStorage.setItem("userInfo", JSON.stringify(users[0])) 

        window.location='index.html'
      }

      }
     
  }
  })