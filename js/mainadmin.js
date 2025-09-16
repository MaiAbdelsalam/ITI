let adminImage=document.querySelector('.user-wrapper img')
let adminName=document.querySelector('.user-wrapper h4')
let adminRole=document.querySelector('.user-wrapper small')
let signOut=document.getElementById('signOut')
let userContainer=document.querySelector('.user-wrapper')
console.log(signOut)
let userLogin
console.log(adminName,adminRole)
window.addEventListener('load',()=>{
    if(localStorage.getItem('userInfo')){
        userLogin=JSON.parse(localStorage.userInfo)
        console.log(userLogin)
        adminImage.src=userLogin.image;
        adminName.innerHTML=userLogin.name
        adminRole.innerHTML=userLogin.role
    }
})
userContainer.addEventListener('click',()=>{
    window.location='adminProfile.html'
})
let sideBar= document.querySelector('.sidebar')
let mainContent=document.querySelector('.main-content')
let navToggle=document.getElementById('nav-toggle')
mainContent.addEventListener('click',()=>{
    if(sideBar.classList.contains('active')){
        sideBar.classList.remove('active')
    }
    mainContent.classList.remove('active');
})
navToggle.addEventListener('click',(e)=>{
    e.stopPropagation();
    console.log('hi')
    sideBar.classList.toggle('active')
    mainContent.classList.toggle('active')
})
window.onscroll=function(){
    sideBar.classList.remove('active');
    mainContent.classList.remove('active');
}
signOut.addEventListener('click',()=>{
    if(localStorage.userInfo){
        localStorage.removeItem('userInfo')
        window.location='login.html'

    }
    else{
        // localStorage.removeItem('userInfo')
        window.location='login.html'
        
    }
})