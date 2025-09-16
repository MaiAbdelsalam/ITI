let tableResponsive=document.querySelector('.table-responsive')
// let campaignTable=document.querySelector('.table-responsive table')
// let mainContent=document.querySelector('.main-content')
// let navToggle=document.getElementById('nav-toggle')
let approvedSelect


// mainContent.addEventListener('click',()=>{
//     sideBar.classList.remove('active');
// })
window.addEventListener('load',async()=>{
    userRes=await fetch('http://localhost:3000/users')
    usersData=await userRes.json()
    campRes=await fetch('http://localhost:3000/campaigns');
    campaignsData=await campRes.json()
    drawCampaignsUi()
    displayPage(currentPage)
    approvedSelect=document.querySelectorAll('.approvedSelect')
    approvedSelect.forEach(element => {
        element.addEventListener("change",async (e)=>{
            optin= e.target.value
            console.log(e.target)
            console.log(e.target.id)
            console.log((e.target.value))
            let boolean=e.target.value=="true"

        
            let obj={
                isApproved:boolean
            }
            let res = await fetch(`http://localhost:3000/campaigns/${e.target.id}`,{
                method:'PATCH',
                body:JSON.stringify(obj)
            });
        })    
    });
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
                let rewardSelect=''
                let active=[true,false]
                let approveCamp=''
                if(campaign.rewards.length >0){
                    for(let rewards of campaign.rewards){
                        rewardSelect+=`
                    <optgroup label="Reward ${rewards.id}">
                        <option value="${rewards.id}">Title: ${rewards.title}</option>
                        <option value="${rewards.id}">Amount: ${rewards.amount}</option>
                    </optgroup>`
                    }
                    console.log(rewardSelect)
                }
                approveCamp+=`
                <option value="${campaign.isApproved}" >${campaign.isApproved}</option>
                `
                console.log(campaign.isApproved)
                filterActive=active.filter(acti=>acti!=campaign.isApproved)
                console.log(filterActive)
                for(let activ of filterActive){
                    approveCamp+=`
                <option value="${activ}" >${activ}</option>
                `
                console.log(approveCamp)
            }
                campUi+=`
                    <tr>
                        <td><img src="${campaign.image}" width="40px" height="40px"></td>
                        <td>${campaign.title}</td>
                        <td>
                            <span class="status" style="background-color : ${campaign.isApproved==true? '#435ccb':'#f12d2d'}"></span>
                            <span><select id="${campaign.id}" class="approvedSelect">
                            ${approveCamp}
                            </select></span>
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
        campUi+=`
                </tbody>
             </table>`
        tableResponsive.innerHTML=campUi
    }
}
