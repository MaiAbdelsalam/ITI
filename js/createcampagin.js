let createCampaign=document.getElementById('createCampaign')
let title=document.querySelector('.camptitle');
let goal=document.querySelector('.goal');
let deadline=document.querySelector('.deadline');
let rewardtitle=document.querySelector('.rewardtitle');
let rewardamount=document.querySelector('.rewardamount');
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
let  dateFormat
let catgories= document.getElementById('catgories')
let categoryTypes=['Arts','Technology','Health','Films','Education']
categoryTypes.forEach((cat,ind)=>{
  console.log(cat,ind)
  catgories.innerHTML+=`<option value="${cat}">${cat}</option>`
})
let optin
catgories.addEventListener('change',(e)=>{
  console.log(e.target.value)
  optin=e.target.value
})

deadline.addEventListener('change', (e) => {
  const dateValue = e.target.value; // ده هيبقى YYYY-MM-DD
  const splitDate = dateValue.split('-'); // ["YYYY", "MM", "DD"]
  dateFormat = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`; // MM-DD-YYYY
  console.log(dateFormat);
});

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
createCampaign.addEventListener('click', async(e)=> {
e.preventDefault();
const res = await fetch("http://localhost:3000/campaigns")
let data=await res.json()
console.log(data.length ,data)

  if(title.value=='' || goal.value=='' || deadline.value=='' ){
    alertLabel.innerHTML='please fill data'
  }
  
  else{
    
    let obj={
        title:title.value.trim(),
        creatorId:userLogIn.id,
        goal:goal.value.trim(),
        deadline:deadline.value,
        isApproved: false,
        rewards:[{
        id:0,
        title:rewardtitle.value,
        amount:rewardamount.value
        }],
        category:optin,
        image:imageUrl || base64String
        // category: {
        // type: string,
        // enum: ["arts", "comics", "design","fashion","film","threater"]
        // }
    }
    
    if(obj.rewards[0].title=='' && obj.rewards[0].amount==''){
       obj.rewards=[]
    }
    
    console.log(obj.title , obj.creatorId ,obj.goal)
      const addCampaign = await fetch("http://localhost:3000/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
      });
      cartSpan.innerText=data.length
      window.location='index.html'
  }
})