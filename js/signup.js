let signupBtn=document.getElementById('signup')
let username=document.querySelector('.name');
let email=document.querySelector('.email');
let password=document.querySelector('.password');
let confirmpassword=document.querySelector('.confirmpassword');
let passwordPattern=/^(?=.*[-_/?.@])[A-Z][A-Za-z0-9-_/?.@]{7,11}$/
let pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let flag=0;
let ps=document.querySelectorAll('.alert-label')
let divImage=document.querySelector(".form-image");
let imgInput=document.querySelector("[type='file']");
let previewImg=divImage.querySelector("img");
let imageContainerP=document.querySelector('.image-container p')
let productImageUrl;
let img;
let imageUrl;
let err=false
function loadUserImg(e){
  console.log('hi')
  img =e.target.files[0];
  let types = ["image/jpeg" , "image/png" , "image/jpg"];
  getImageBased64Url(img);
  if(types.indexOf(img.type)== -1){
    imageContainerP.innerHTML="type Not Supported ";
    previewImg.src="assets/user.png";
    imageContainerP.style.color="red";
}
else if(img.size > 1024 *1024){
    imageContainerP.innerHTML="image not Exced 2MG ";
    previewImg.src="assets/user.png";
    imageContainerP.style.color="red";
}
else{
  flag=1;
  getImageBased64Url(img);
  previewImg.src=URL.createObjectURL(img);
  imageContainerP.innerHTML="you upload profile image"; 
  imageContainerP.style.color="#27ae60";

}}

function getImageBased64Url(img){
  let reader= new FileReader();
  reader.readAsDataURL(img);
  reader.onload=function(){
      imageUrl=reader.result;
  };
}

imgInput.addEventListener("change", loadUserImg);
divImage.addEventListener("click", ()=>imgInput.click());

// base64 for default profile image

img1 = new Image();
img1.src = "assets/user.png";
let base64String
img1.onload = () => {
  const canvas = document.createElement("canvas");
  canvas.width = img1.width;
  canvas.height = img1.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img1, 0, 0);

  base64String = canvas.toDataURL("image/png"); // هنا ال Base64
  console.log(base64String);
};
console.log(email)
signupBtn.addEventListener('click', async(e)=> {
  ps.forEach(p=>{
    p.innerHTML=''
    p.style.display='none'
  })
  let err=false
e.preventDefault();
  if(username.value=='' || email.value=='' || password.value=='' || confirmpassword.value==''){
    ps[0].style.display='block'
    ps[0].innerHTML+=`<br><i class="fa-solid fa-square-xmark"></i> please fill data`
    err=true
  }

  if(email.value.match(pattern)==null){
    ps[0].style.display='block'
    ps[0].innerHTML+=`<br><i class="fa-solid fa-square-xmark"></i> Enter Valid Email like email@eg.com` ;
    err=true
    console.log('hi mai');
  }

if(password.value.match(passwordPattern)==null || confirmpassword.value.match(passwordPattern)==null){
  ps[0].style.display='block'
  ps[0].innerHTML+=`<br> 
  <i class="fa-solid fa-square-xmark"></i> Password must start with a capital letter
  <br> 
  <i class="fa-solid fa-square-xmark"></i> Password must contain at least one special character<br> 
  <i class="fa-solid fa-square-xmark"></i> Password length must be between 8 and 12 characters` ;
  err=true
  console.log('hi mai');
  }

if(confirmpassword.value !== password.value){
  ps[0].style.display='block'
  ps[0].innerHTML+=`<br><i class="fa-solid fa-square-xmark"></i>  password not match`
  err=true
  
}
  let obj={
    name:username.value.trim(),
    email:email.value.trim(),
    password:password.value.trim(),
    role:'user',
    isActive:true,
    image:imageUrl || base64String
 
  }
  
  const res = await fetch(`http://localhost:3000/users?email=${obj.email}`)
  const users = await res.json();
  console.log(users ,obj.email,obj.password)
  if(users.length == 1){
    console.log(users)
    ps[0].style.display='block'
    ps[0].innerHTML+=`<br><i class="fa-solid fa-square-xmark"></i> this account already exist Enter other password `
    err=true;
  }
  if(err==true) return

    console.log(users)
    const addUser = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
    });
    window.location='login.html'
  

})