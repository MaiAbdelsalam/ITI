let loginBtn=document.getElementById('loginBtn')
let signOut=document.getElementById('signOut')
let signinBtn=document.getElementById('signinBtn')
let profileImage=document.getElementById("image-profile");
let headerIcons=document.querySelector(".header_icons")
let userinfo=document.getElementById('user')
let cartSpan=document.querySelector('#campaigns-cart span')
let createCampain=document.getElementById('create')
let countFavourites=document.querySelector('.count_favourites')
let campaign
let navToggle=document.getElementById('nav-toggle')
let userLogIn;
let list=document.getElementById('list')
console.log(loginBtn)
console.log(signinBtn)
let resUser,users
navToggle.addEventListener('click',()=>{
  list.classList.toggle('active')
})
window.addEventListener('load',async()=>{
  
  if(localStorage.getItem('userInfo')){
    userLogIn=JSON.parse(localStorage.userInfo);
    console.log(userLogIn)
    if(createCampain){
      createCampain.style.display="block"

    }
   let fetchData= async ()=>{
    resUser = await fetch(`http://localhost:3000/users/${userLogIn.id}`)
    users = await resUser.json();
    rescampaign = await fetch(`http://localhost:3000/campaigns?creatorId=${userLogIn.id}`)
    campaign = await rescampaign.json();
    if(campaign.length>0){
      console.log(campaign.length)
      campaignFilter=campaign.filter(cam=>cam.isApproved==true)
      cartSpan.innerText=campaignFilter.length
    }
    
    resPledges = await fetch(`http://localhost:3000/pledges?userId=${userLogIn.id}`)
    pledgeFetch = await resPledges.json();
    console.log(pledgeFetch)
    if(pledgeFetch.length!=0){
      countFavourites.innerText=pledgeFetch.length
    }
    
    if (users){
      userinfo.innerHTML=users.name
      profileImage.src=users.image
    }

    profileImage.addEventListener('click',()=>{
      window.location='profile.html'
    })

  }
  fetchData();
    loginBtn.remove();
    signinBtn.remove();

    // userInfo.classList.add("active");
  
    // user.innerHTML=users[userLogIn].username;
    // profileImage.src=users['image'] ;
    
    loginBtn.addEventListener('click',(e)=>{
      e.preventDefault()
      window.location="login.html";
    })
    signinBtn.addEventListener('click',(e)=>{
      e.preventDefault()
      window.location='signup.html'
    })
  }
  else{
    signOut.remove()
    headerIcons.remove()
    cartSpan.innerText=0
    profileImage.style.display="none"

  }


  signOut.onclick=function(){
    localStorage.removeItem('userInfo')
    localStorage.removeItem('editcamp')
    localStorage.removeItem('pldgeadded')
    setTimeout(async () => {  
    window.location='login.html'
    }, 1500);
  }
})






