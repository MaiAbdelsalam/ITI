let campaignsContainer =document.querySelector('.campaigns_container')
let nocampaignsContainer =document.querySelector('.nocampaigns_container')
let data;
window.addEventListener('load',async()=>{
    let res = await fetch(`http://localhost:3000/pledges?userId=${userLogIn.id}`);
    data = await res.json();
    console.log(data)
    let userRes= await fetch(`http://localhost:3000/users/${userLogIn.id}`);
    userData= await userRes.json()
    console.log(userData)
    
    drawPledgesUi()
})

async function drawPledgesUi(){
    console.log(data)
    if(data.length==0){
        nocampaignsContainer.innerHTML="there is no campaigns";
    }
    // if(data.userId)
    if(data.length>0){
        console.log(data.length)
        console.log(data)
        let pledgeUi=''
        for(let pl of data){
            console.log(pl)           
            let campRes= await fetch(`http://localhost:3000/campaigns/${pl.campaignId}`);
            console.log(pl.campaignId)
            campData= await campRes.json()
            console.log(campData.rewards)   
            let rewardFilter= campData.rewards.find(resReward=> resReward.id ==pl.rewardId)
            console.log("pro", rewardFilter)
            pledgeUi+= `
            <div class="product-item">
                <img src="${campData.image}" alt="" class="product-item-img" onclick="saveItemData(${campData.id})">
                <div class="product-item-desc">
                    <a>${rewardFilter.title}</a>
                    <p>${userData.name}</p>
                    <p>${pl.amount}</p>
                </div>
            </div>
        `
    }
    // if(campUi )
    campaignsContainer.innerHTML=pledgeUi;       
    }
}

function saveItemData(id){
    console.log(id)

}
// drawCampaignsUi();



