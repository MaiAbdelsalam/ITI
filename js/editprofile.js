let signupBtn=document.getElementById('signup')
let username=document.querySelector('.name');
let email=document.querySelector('.email');
let password=document.querySelector('.password');
let confirmpassword=document.querySelector('.confirmpassword');
let alertLabel=document.querySelector('.alert-label')
let pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let flag=0;
let divImage=document.querySelector(".form-image");
let imgInput=document.querySelector("[type='file']");
let previewImg=divImage.querySelector("img");
let imageContainerP=document.querySelector('.image-container p')
let productImageUrl;
let img;
let imageUrl;
let base64String
let err=false
let passwordPattern=/^(?=.*[-_/?.@])[A-Z][A-Za-z0-9-_/?.@]{7,11}$/


window.addEventListener('load',
    async()=>{
    const res = await fetch(`http://localhost:3000/users/${userLogIn.id}`)
    data=await res.json()
    console.log(data)
    username.value=data.name;
    email.value=data.email;
    password.value=data.password;
    if(!data.image){
      img1 = new Image();
      img1.src = "assets/user.png";
      img1.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img1.width;
        canvas.height = img1.height;
      
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img1, 0, 0);
      
        base64String = canvas.toDataURL("image/png"); // هنا ال Base64
        console.log(base64String);
      };
    }
    else{

      previewImg.src=data.image
    }
    
})
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

}
}

function getImageBased64Url(img){
  let reader= new FileReader();
  reader.readAsDataURL(img);
  reader.onload=function(){
      imageUrl=reader.result;
  };
}
// if(data.image){
//   previewImg.src=data.image
// }
// else{
//   previewImg.src='assets/user.png'
// }
imgInput.addEventListener("change", loadUserImg);
divImage.addEventListener("click", ()=>imgInput.click());
// base64 for default profile image

console.log(email)
signupBtn.addEventListener('click', async(e)=> {
err=false
  alertLabel.innerHTML=''
e.preventDefault();
  if(username.value=='' || email.value=='' || password.value==''){
    alertLabel.style.display='block'
    alertLabel.innerHTML+=`<br> <i class="fa-solid fa-square-xmark"></i>please fill data`
    err=true
  }

  if(email.value.match(pattern)==null){
    alertLabel.style.display='block'
    alertLabel.innerHTML+=`<br><i class="fa-solid fa-square-xmark"></i> Enter Valid Email` ;
    console.log('hi mai');
    err=true
}
if(password.value.match(passwordPattern)==null ){
  alertLabel.style.display='block'
 alertLabel.innerHTML+=`<br> <i class="fa-solid fa-square-xmark"></i> Enter password like xxx-1234 length between 8-14 char` ;
  err=true
  console.log('hi mai');
  }
  if(err) return

    
    let obj={
      name:username.value.trim(),
      email:email.value.trim(),
      password:password.value.trim(),
      role:"user",
      isActive:true,
      image:imageUrl || base64String
    }
    
      const addUser = await fetch(`http://localhost:3000/users/${userLogIn.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
      });
      localStorage.setItem("userInfo", JSON.stringify(data)) 
      window.location='login.html'
  
})