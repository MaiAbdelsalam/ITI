let tableResponsive=document.querySelector('.table-responsive')
let campaignTable=document.querySelector('.table-responsive table')
let data;
window.addEventListener('load',async()=>{
    let res = await fetch(`http://localhost:3000/pledges`);
    data = await res.json();
    console.log(data)
    let userRes= await fetch(`http://localhost:3000/users`);
    userData= await userRes.json()
    console.log(userData)
    
    // drawPledgesUi()
})

// async function drawPledgesUi(){
//     console.log(data)
//     if(data.length==0){
//         tableResponsive.innerHTML="there is no Pledges";
//     }
//     let userId=1
//     if(data.length>0){
//         console.log(data.length)
//         console.log(data)
//         let pledgeUi=''
//         pledgeUi+=`
//           <table >
//             <thead>
//                 <tr>
//                     <td>Id</td>
//                     <td>campaign Image</td>
//                     <td>user Name</td>
//                     <td>reward title</td>
//                     <td>Pledge Amount</td>
//                 </tr>
//             </thead>
//             <tbody>
//         `
//         for(let pl of data){
//             console.log(pl.amount)           
//             let campRes= await fetch(`http://localhost:3000/campaigns/${pl.campaignId}`);
//             console.log(pl.campaignId)
//             campData= await campRes.json()
//             let userRes= await fetch(`http://localhost:3000/users/${pl.userId}`);
//             userData= await userRes.json()
//             console.log(campData.rewards)   
//             let rewardFilter= campData.rewards.find(resReward=> resReward.id ==pl.rewardId)
//             console.log("pro", rewardFilter)
//             pledgeUi+= `
//         <tr>
//             <td>${userId}</td>
//             <td><img src="${campData.image}" width="40px" height="40px" onclick="saveItemData(${campData.id})"></td>
//                 <td>${userData.name}</td>
//                 <td>${rewardFilter.title}</td>
//                 <td>${pl.amount}</td>
//         </tr>       
//         `
//         console.log(pl.amount)
//     }
//     pledgeUi+=` </tbody>
//         </table>`
//     // if(campUi )
//     tableResponsive.innerHTML=pledgeUi;       
//     }
// }
// drawCampaignsUi();



/////////////////////////////////

// pagination