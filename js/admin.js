let counts=document.querySelectorAll('.dashboard-cart .card-single h2')
let tableResponsive=document.querySelector('.table-responsive')
let campaignTable=document.querySelector('.table-responsive table')
console.log(counts)
let userCard=document.querySelector('.users .card-body')
console.log(userCard)


// mainContent.addEventListener('click',()=>{
//     sideBar.classList.remove('active');
// })
window.addEventListener('load',async()=>{
    userRes=await fetch('http://localhost:3000/users')
    usersData=await userRes.json()
    campRes=await fetch('http://localhost:3000/campaigns');
    campaignsData=await campRes.json()

    pledgesRes=await fetch('http://localhost:3000/pledges');
    pledgesData=await pledgesRes.json()
    if(counts.length>0){
        counts[0].innerHTML=usersData.length
        counts[1].innerHTML=campaignsData.length
        counts[2].innerHTML=pledgesData.length
    }
    drawCampaignsUi()
    drawUsers();
})

function drawCampaignsUi(){
    let campUi=''
    if(campaignsData.length==0){
        tableResponsive.innerHTML='there is no campaign yet'
    }
    else{
        let returnlength=0;
        
        campUi+=`
         <table >
            <thead>
                <tr>
                    <td>Campaign Image</td>
                    <td>Campaign Title</td>
                    <td>Approved</td>
                    <td>Rewards</td>
                </tr>
            </thead>
            <tbody>
        `
        for(let campaign of campaignsData){
            if(returnlength < 9){
                let rewardSelect=''
                if(campaign.rewards.length >0){
                    for(let rewards of campaign.rewards){
                        rewardSelect+=`
                    <optgroup label="Reward ${rewards.id}">
                        <option value="${rewards.id}">Title: ${rewards.title}</option>
                        <option value="${rewards.id}">Amount: ${rewards.amount}</option>
                    <optgroup>`
                    }
                    console.log(rewardSelect)
    
                }
                campUi+=`
                    <tr>
                        <td><img src="${campaign.image}" width="40px" height="40px"></td>
                        <td>${campaign.title}</td>
                        <td>
                            <span class="status" style="background-color : ${campaign.isApproved==true? '#435ccb':'#f12d2d'}"></span>
                            <span>${campaign.isApproved}</span>
                        </td>
                        <td>
                            <select name="" id="reward">
                                <option disabled selected="true" >Show Rewards</option>
                                ${rewardSelect}
                            </select>
                        </td>
                    </tr>
                `
            }
            returnlength++ 
        }
        campUi+=`
                </tbody>
             </table>`
        tableResponsive.innerHTML=campUi
    }
}
function drawUsers(){
    let userUi=``
    if(usersData.length==0){
        userCard.innerHTML='there is no users Yet'
    }
    for(let user of usersData){
        console.log(user)
        userUi+=`
        <div class="user">
            <div class="info">
                <img src="${user.image}" width="40px" height="40px" alt="">
                <div>
                    <h4>${user.name}</h4>
                    <small style="text-transform:capitalize">${user.role} </small>
                </div>
            </div>
            <div class="contact">
                <span class="class"></span>
                <span class="class"></span>
                <span class="class"></span>
            </div>
        </div>
    `
    }
    userCard.innerHTML=userUi

}