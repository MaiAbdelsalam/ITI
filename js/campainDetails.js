let editcamp=JSON.parse(localStorage.getItem("editcamp"));
let itemDetails=document.querySelector('.item-details');
let rewardTable=document.querySelector('table')
console.log(editcamp)
console.log(itemDetails,rewardTable)
let data;
let rewardData=''
let rewardSelect
let rowContainer=document.querySelector('.row')

window.addEventListener('load',    
    async()=>{
        const res = await fetch(`http://localhost:3000/campaigns/${editcamp}`)
        data=await res.json()
        console.log(data)
        for(let rewards of data.rewards){
            rewardSelect+=`
        <optgroup label="Reward ${rewards.id}">
            <option value="${rewards.id}">Title: ${rewards.title}</option>
            <option value="${rewards.id}">Amount: ${rewards.amount}</option>
        </optgroup>`
        }
        console.log(rewardSelect)
        rowContainer.innerHTML=`
<div class="image-container">
                <div class="big-image">
                    <img src="${data.image}" alt="">
                </div>
            </div>
            <div class="content">
                <h3>Campaign Name :${data.title}</h3>

                <select>${rewardSelect}</select>
                <button  onclick="addPledge('${data.id}')" class="btn">Make Pledge</button>
            </div>

            `;


})

function addPledge(id){
    localStorage.setItem("pldgeadded",JSON.stringify(id));
    console.log(id)
    
    window.location="submitPledge.html";
}
// if(localStorage.userLog!=null){
    
// }
