let createCampaign=document.getElementById('createCampaign')
let title=document.querySelector('.camptitle');
let goal=document.querySelector('.goal');
let deadline=document.querySelector('.deadline');
let rewardtitle=document.querySelector('.rewardtitle');
let rewardamount=document.querySelector('.rewardamount');
let alertLabel=document.querySelector('.alert-label')
let rewardTable=document.querySelector('table')
let pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let flag=0;
let divImage=document.querySelector(".form-image");
let createReward=document.querySelector(".create-campagin-icon")
let imgInput=document.querySelector("[type='file']");
let previewImg=divImage.querySelector("img");
let imageContainerP=document.querySelector('.image-container p')
let productImageUrl;
let data
let img;
let imageUrl;
let editcamp=JSON.parse(localStorage.getItem("editcamp"));
let mode="create"
let temp
let rewardData='';
console.log(createReward)
window.addEventListener('load',
    async()=>{
        const res = await fetch(`http://localhost:3000/campaigns/${editcamp}`)
        data=await res.json()
        console.log(data)
   
        title.value=data.title;
        goal.value=data.goal;
        deadline.value=data.deadline;
        previewImg.src=data.image;

        rewardtitle.value='';
        rewardamount.value=''
        drawRewardUi()
})

function drawRewardUi(){
  if(data.rewards.length > 0 ){
    console.log(data.rewards)
    rewardData+=`<thead>
        <tr>
            <td>reward id</td>
            <td>reward title</td>
            <td>reward amount</td>
            <td>update</td>
            <td>delete</td>
        </tr>
        </thead>
        <tbody>

    `
    for(let reward of data.rewards){
        rewardData+=`
        <tr>
            <td>${reward.id+1}</td>
            <td>${reward.title}</td>
            <td>${reward.amount}</td>
            <td onclick="updateReward(${reward.id})" ><i class="fa-solid fa-pen-to-square"></i></td>
            <td onclick="deleteReward(${reward.id})" ><i class="fa-solid fa-trash"></i></td>
        </tr>
        `
    }
    
    rewardData+=`</tbody>`
}

console.log(rewardData)
rewardTable.innerHTML=rewardData

}
createReward.addEventListener("click",addRewardMainFun)
function addRewardMainFun(){
    if(mode=="create"){
      if( rewardtitle.value!=='' && rewardamount.value!==''){
        let obj={
          id:0,
          title:rewardtitle.value,
          amount:rewardamount.value
        }
        if(data.rewards){
          obj.id=data.rewards.length
          data.rewards.push(obj)
    
        }
        else{
          data.rewards=[]
          data.rewards.push(obj)
          console.log(data.rewards)
    
        }
        console.log(`data reward ${data.rewards}` )
      // data.rewards.push(obj)
      // console.log(data.rewards)
      }
  
    }
    if(mode=="update"){
      data.rewards.id=temp
      let obj={
        id:data.rewards.id,
        title:rewardtitle.value,
        amount:rewardamount.value
      }
      data.rewards.splice(temp, 1, obj)
    
    }
    let AddReward= async()=>{
      let res=await fetch(`http://localhost:3000/campaigns/${data.id}`,{
        method:"PATCH",
        body:JSON.stringify({rewards:data.rewards})
      })
    }
    AddReward()
    drawRewardUi()
    
  
}
function updateReward(id){
  mode="update"
  temp=id
  console.log(id)
  scroll({
    top:50,
    behavior:"smooth"
})
console.log(data.rewards[id].title)
  rewardtitle.value=data.rewards[id].title
  rewardamount.value=data.rewards[id].amount

}

function deleteReward(id){
  console.log(id, id-1)
  // data.rewards.splice(id-1,1)
  let index=0

  let filtered=data.rewards.filter(reward=> reward.id != id)
  data.rewards.splice(id,1)
  for(let reward of data.rewards){
    reward.id=index
    console.log(reward.id)
    index++ 
  }

  let obj={
    rewards: filtered
  }
  let removereward= async () => {
    let res = await fetch(`http://localhost:3000/campaigns/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(obj)
    });
    let delted = await res.json();
    console.log(delted); 
    console.log('deleted'); 
    drawRewardUi();   
};
removereward()
drawRewardUi()
}

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
// console.log(email)
// crwate campaign
createCampaign.addEventListener('click', async(e)=> {
e.preventDefault();
const res = await fetch("http://localhost:3000/campaigns")
let dataCamp=await res.json()
console.log(dataCamp.length ,dataCamp)
let index
if(data.rewards){
  index=data.rewards.length
}
else{
  index=0
}

  if(title.value=='' || goal.value=='' || deadline.value=='' ){
    alertLabel.innerHTML='please fill data'
}
  
else{
  mode='create'
  addRewardMainFun()
  let obj={
      title:title.value.trim(),
      creatorId:userLogIn.id,
      goal:goal.value.trim(),
      deadline:deadline.value,
      isApproved: false,
      rewards:data.rewards,
      image:imageUrl || base64String
  }
    // console.log(data.rewards.length)
    

    console.log(obj.title , obj.creatorId ,obj.goal)
    const editCampaign = await fetch(`http://localhost:3000/campaigns/${editcamp}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
      });
      cartSpan.innerText=data.length
      // window.location='index.html'
  }
})