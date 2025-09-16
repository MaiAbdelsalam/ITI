let search=document.getElementById('search')
let pagination=document.getElementById('pagination')
let tableData;
let filterData
let tbody=document.querySelector('tbody')
let btns=document.querySelectorAll('li.btn')
let pageNumbers=document.querySelector('#pageNumbers')
let prevButton=document.querySelector('.prev')
let nextButton=document.querySelector('.next')
window.addEventListener('load', async () => {
    let res = await fetch("http://localhost:3000/pledges");
    data = await res.json();
    if(data.length>0){
        pagination.style.display="block"
        displayPage(currentPage)
        console.log(data)
    }
    displayPage(currentPage)
    disableinputs()
    pageNumbers.textContent = 
    `Page ${currentPage} of ${totalPages}`; 
});
// search.onkeyup=function(){
//     let searchVal=search.value;
//     console.log(searchVal)
//     tableResponsive.innerHTML="";

//     filterData=data.filter((item)=>item.title.includes(searchVal)) ;
//     // if(filterData=='' || filterData.length==0) filterData=data
//     console.log(filterData)
//     tableData=''    
//     tableData=`<table>
//              <thead>
//                <tr>
//                     <td>Campaign Id</td>
//                     <td>Campaign Image</td>
//                     <td>Campaign Title</td>
//                     <td>Approved</td>
//                     <td>Rewards</td>
//                 </tr>
//             </thead>
//             <tbody>
//     `
//     let userid=1
//     filterData.forEach(async(item) => {
//         if(item.title.includes(searchVal)){
//             console.log(item.image)
//             pledgeUi+=`
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
//         console.log(item.amount)           
//         let campRes= await fetch(`http://localhost:3000/campaigns/${item.campaignId}`);
//         console.log(pl.campaignId)
//         campData= await campRes.json()
//         let userRes= await fetch(`http://localhost:3000/users/${item.userId}`);
//         userData= await userRes.json()
//         console.log(campData.rewards)   
//         let rewardFilter= campData.rewards.find(resReward=> resReward.id ==item.rewardId)
//         console.log("pro", rewardFilter)
//         pledgeUi+= `
//     <tr>
//         <td>${userId}</td>
//         <td><img src="${campData.image}" width="40px" height="40px" onclick="saveItemData(${campData.id})"></td>
//             <td>${userData.name}</td>
//             <td>${rewardFilter.title}</td>
//             <td>${item.amount}</td>
//     </tr>       
//     `
//     console.log(item.amount)
//                     // userid++;
//                         // console.log(row[key]);
//  } 
// })
// tableData += `</tbody>
// </table>`;
// tableResponsive.innerHTML=tableData
// console.log(tableResponsive)

//     displayPage(currentPage)
//     if(filterData){
//         currentPage=1
//         const page = document.querySelector('[data-page]');
//         page.innerText=currentPage 
//         pagination.style.display='block';
//         updatePagination(); 
//     }
    
//     else{
//         pagination.style.display='none';

//     }
// }
search.onkeyup=function(){
    let searchVal=search.value;
    console.log(searchVal)
    tableResponsive.innerHTML="";

    filterData=data.filter((item)=>item.title.includes(searchVal)) ;
    // if(filterData=='' || filterData.length==0) filterData=data
    console.log(filterData)
    tableData=''    
    tableData=`<table>
             <thead>
               <tr>
                    <td>Campaign Id</td>
                    <td>Campaign Image</td>
                    <td>Campaign Title</td>
                    <td>Approved</td>
                    <td>Rewards</td>
                </tr>
            </thead>
            <tbody>
    `
    let userid=1
    filterData.forEach(item => {
        if(item.title.includes(searchVal)){
            console.log(item.image)
            // for (let user of filterData) {
                // tableData += '<tr>';
                let rewardSelect=''
                let active=[true,false]
                let approveCamp=''
                if(item.rewards.length >0){
                    for(let rewards of item.rewards){
                        rewardSelect+=`
                    <optgroup label="Reward ${rewards.id}">
                        <option value="${rewards.id}">Title: ${rewards.title}</option>
                        <option value="${rewards.id}">Amount: ${rewards.amount}</option>
                    </optgroup>`
                    }
                    console.log(rewardSelect)
                }
                
                approveCamp+=`
                <option value="${item.isApproved}" >${item.isApproved}</option>
                `
                console.log(item.isApproved)
                filterActive=active.filter(acti=>acti!=item.isApproved)
                console.log(filterActive)
                for(let activ of filterActive){
                    approveCamp+=`
                <option value="${activ}" >${activ}</option>
                `
                console.log(approveCamp)
                            }
                                // }
                        tableData+= `
                         <tr>
                            <td>${userid}</td>
                            <td><img src="${item.image}" width="40px" height="40px"></td>
                            <td>${item.title}</td>
                            <td>
                                <span class="status" style="background-color : ${item.isApproved==true? '#435ccb':'#f12d2d'}"></span>
                                <span>
                                    <select id="${item.id}" class="approvedSelect">
                                    ${approveCamp}
                                    </select>
                                </span>
                            </td>
                            <td>
                                <select name="" id="reward">
                                    <option disabled selected="true" >Show Rewards</option>
                                    ${rewardSelect}
                                </select>
                            </td>
                        </tr>
                    `
                    userid++;
                        // console.log(row[key]);
 } 
})
tableData += `</tbody>
</table>`;
tableResponsive.innerHTML=tableData
console.log(tableResponsive)

    displayPage(currentPage)
    if(filterData){
        currentPage=1
        const page = document.querySelector('[data-page]');
        page.innerText=currentPage 
        pagination.style.display='block';
        updatePagination(); 
    }
    
    else{
        pagination.style.display='none';

    }
}
let currentPage = 1; 
let totalPages;
let trsPerPage=1;
async function displayPage(page){ 
    let tableData=''
    let filterd=filterData? filterData : data
    console.log(filterd)
    totalPages = Math.ceil(filterd.length / trsPerPage); 
    console.log(totalPages)
    console.log(totalPages)
	const startIndex = (page - 1) * trsPerPage; 
	const endIndex = startIndex + trsPerPage; 
    // <td>user Image</td>

    tableData+=`
    <table>
             <thead>
                <tr>
                    <td>Id</td>
                    <td>campaign Image</td>
                    <td>user Name</td>
                    <td>reward title</td>
                    <td>Pledge Amount</td>
                </tr>
            </thead>
            <tbody>`
                let userid=1

    for(let filt of filterd){
        if (filterd.indexOf(filt) >= startIndex && filterd.indexOf(filt)  < endIndex) {
            // if(user.id !=userLogIn.id){
               console.log(filterd.indexOf(filt)) 
       
            console.log(filt.amount)           
            let campRes= await fetch(`http://localhost:3000/campaigns/${filt.campaignId}`);
            console.log(filt.campaignId)
            campData= await campRes.json()
            let userRes= await fetch(`http://localhost:3000/users/${filt.userId}`);
            userData= await userRes.json()
            console.log(campData.rewards)   
            let rewardFilter= campData.rewards.find(resReward=> resReward.id ==filt.rewardId)
            console.log("pro", rewardFilter)
                            // }
                            // <td><img src="${filterd[index].image}" width="40px" height="40px"></td>
                    tableData+= `
                     <tr>
                    <td>${userid}</td>
                    <td><img src="${campData.image}" width="40px" height="40px"></td>
                    <td>${userData.name}</td>
                    <td>${rewardFilter.title}</td>
                    <td> ${filt.amount}</td>
                </tr>
            
                    `
                userid++;
		}
    }
    tableData+=`</tbody>
    </table>`
    tableResponsive.innerHTML=tableData; 
    console.log(tableData)
    // console.log(tbody)

} 


function updatePagination() { 
    if(totalPages ==0){
        pageNumbers.textContent='no data found please enter correct data'
    }
    else{
        pageNumbers.textContent = 
            `Page ${currentPage} of ${totalPages}`; 
    }
  
	prevButton.disabled = currentPage === 1; 
  
	nextButton.disabled = currentPage === totalPages; 


} 

prevButton.addEventListener('click', () => { 
	if (currentPage > 1) { 
		currentPage--; 
        const page = document.querySelector('[data-page]');
        page.innerText=currentPage 
        console.log(currentPage)
		displayPage(currentPage); 
		updatePagination(); 
	} 
    disableinputs()
}); 

nextButton.addEventListener('click', () => { 
    let filterd=filterData || data
    totalPages = Math.ceil(filterd.length / trsPerPage); 
    console.log(totalPages)
    console.log(currentPage)
    if (currentPage < totalPages) { 
        // console.log(currentPage)
		currentPage++; 
        const page = document.querySelector('[data-page]');
        page.innerText=currentPage 
        console.log(totalPages)
        console.log(currentPage)
		displayPage(currentPage); 
        nextButton.disabled = currentPage === totalPages; 
		updatePagination(); 
	} 

    disableinputs()
}); 

function disableinputs(){
    if( currentPage == totalPages || totalPages == 1 ){
        console.log('h1')
        nextButton.disabled
        nextButton.style.color='#ccc'
    }
    else{
        nextButton.disabled=false
        nextButton.style.color='#fcb700'
    }
    console.log(nextButton.disabled)
    if(totalPages==1 || currentPage==1){
        prevButton.disabled
        prevButton.style.color='#ccc'
    }
    else{
        prevButton.disabled=false
        prevButton.style.color='#fcb700'
    }

}
