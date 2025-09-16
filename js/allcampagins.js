let categoryNav=document.querySelector('.category_btn') 
let categoryList=document.querySelector('.category_nav_list')
let categoryNavA=document.querySelectorAll('.category_nav_list a')
console.log(categoryNav,categoryList)
let pageNumbers=document.querySelector('#pageNumbers')
let prevButton=document.querySelector('.prev')
let nextButton=document.querySelector('.next')
let pagination=document.getElementById('pagination')
let campagins=document.querySelector('.campaigns')

let filterData
// let deadlineInput=document.querySelector('input[type="date"]')
// console.log(deadlineInput)
let dateCatch
categoryNav.addEventListener('click',()=>{
    categoryList.classList.toggle('active')
}) 
let categoryTypes=['Arts','Technology','Health',,'Education','Films']
window.addEventListener('load',async()=>{
    let res = await fetch(`http://localhost:3000/campaigns`);
    data = await res.json();
    console.log(data)
    
    categoryTypes.forEach((cat,ind)=>{
        let atageappend = document.createElement("a");
        const atagetext = document.createTextNode(cat);
        atageappend.appendChild(atagetext);
        categoryList.appendChild(atageappend);
    })
    // deadlineInput.addEventListener('change',(e)=>{
    //     dateCatch=e.target.value;
    // })
    categoryNavA=categoryList.querySelectorAll('a')
    console.log(categoryNavA)
    categoryNavA.forEach(atag=>{
        console.log('111', categoryNavA)
        atag.addEventListener('click',async ()=>{
            tag=atag.innerText;
            console.log(tag)
            let res
            if(tag==`All Categories`){
                res = await fetch(`http://localhost:3000/campaigns?_sort=deadline`);
            }
            else{
                res = await fetch(`http://localhost:3000/campaigns?category=${tag}&_sort=deadline`);
            }
            filterData=await res.json()
            console.log(filterData)
            displayPage(currentPage)
            pageNumbers.textContent = 
            `Page ${currentPage} of ${totalPages}`;
            
        })
    
})
    // drawCampaignsUi()
    if(data.length>0){
        filterData=data.filter(ite=>ite.isApproved==true)
        pagination.style.display="block"
        displayPage(currentPage)
        console.log(data)
        disableinputs()

    }
    displayPage(currentPage)
    pageNumbers.textContent = 
    `Page ${currentPage} of ${totalPages}`; 
    disableinputs()

})
let tag=''

// function drawCampaignsUi(){
//     if(data.length==0){
//         campaignsContainer.innerHTML="there is no campains Yet";
//     }
//     else{
//         let campUi=data.map((camp)=>{
//             let tagsHtml = "";
//             if (camp.rewards && camp.rewards.length > 0 && camp.rewards[0]!=null ) {
//                 tagsHtml = `
//                         <a href="#"><i class="fas fa-tag"></i>Reward Title : ${camp.rewards[0].title} </a><br>
//                         <a href="#"><i class="fas fa-gift"></i>Reward Amount :${camp.rewards[0].amount}  </a>
//                 `;
//             }
            
//             console.log("pro", camp.id)
//             if(camp.isApproved==true){
//                 return `
//                 <div class="box">
//                           <div class="update">
//                               <p><i class="fas fa-calendar"></i> ${camp.deadline}</p>
//                           </div>
//                           <div class="image">
//                               <img src="${camp.image}" alt="">
//                           </div>
//                           <div class="content">
//                               <div class="tags">
//                               ${tagsHtml}
//                               </div>
                              
//                               <h3>${camp.title}</h3>
//                               <p>Goal : ${camp.goal}</p>
//                               <div class="login-signup" style="justify-content:center">                     
//                                   <button  onclick="addedToRead('${camp.id}')" class="">read more</button>
//                                   <button onclick="addPledge('${camp.id}')" class="">Add pledge</button>
//                               </div>
//                           </div>
//                       </div>
//                 `
//             }
//         });
//         campaignsContainer.innerHTML=campUi.join(" ");
//     }
// }

// function drawCampaignsUi(){
//     if(data.length==0){
//         campaignsContainer.innerHTML="there is no campains Yet";
//     }
//     else{
//         let campUi=data.map((camp)=>{
//             let tagsHtml = "";
//             if (camp.rewards && camp.rewards.length > 0 && camp.rewards[0]!=null ) {
//                 tagsHtml = `
//                          <p><span>Reward : ${camp.rewards[0].title} </span></p> |
//                         <p class="amount">Amount :${camp.rewards[0].amount}</p>
//                 `;
//             }
            
//             console.log("pro", camp.id)
//             if(camp.isApproved==true){
//                 return `
//             <div class="campaign">
                        
//                 <span class="reward-amount">${camp.deadline}</span>
//                 <div class="image-campaign">
//                     <a href=""><img src="${camp.image}" alt=""></a>
//                 </div>
//                 <p class="name-campaign"><a href="">${camp.title}</a></p>
//                 <div class="reward">
//                     ${tagsHtml}
//                 </div>
//                 <div class="icons">
                
//                     <span class="read-more"  onclick="addedToRead('${camp.id}')">
//                         <i class="fas fa-info-circle"></i>
//                         read more
//                     </span>
//                     <span class="icon-campaign" onclick="addPledge('${camp.id}')">
//                         <i class="fas fa-donate"></i>
//                     </span>
//                 </div>
//             </div>
               
//                 `
//             }
//         });
//         campagins.innerHTML=campUi.join(" ");
//     }
// }

function addedToRead(id){
    localStorage.setItem("editcamp",JSON.stringify(id));
    console.log(id)
    window.location="campaignDetail.html";
}

function addPledge(id){
    localStorage.setItem("pldgeadded",JSON.stringify(id));
    console.log(id)
    
    window.location="submitPledge.html";
}

search.onkeyup=function(){
    let searchVal=search.value;
    console.log(searchVal)
    campagins.innerHTML="";

    filterData=data.filter((item)=>item.title.includes(searchVal)) ;
    // if(filterData=='' || filterData.length==0) filterData=data
    console.log(filterData)
    tableData=''    

    // let userid=1
    filterData.forEach(item => {
        if(item.title.includes(searchVal)){
            console.log(item.image)
            // for (let user of filterData) {
                // tableData += '<tr>';
                if(item.isApproved==true){
                    let tagsHtml = "";
                    if (item.rewards && item.rewards.length > 0 && item.rewards[0]!=null ) {
                        tagsHtml = `
                                 <p><span>Reward : ${item.rewards[0].title} </span></p> |
                                <p class="amount">Amount :${item.rewards[0].amount}</p>
                        `;
                        tableData+= `
                        <div class="campaign">
                                    
                            <span class="reward-amount">${item.deadline}</span>
                            <div class="image-campaign">
                                <a href=""><img src="${item.image}" alt=""></a>
                            </div>
                            <p class="name-campaign"><a href="">${item.title}</a></p>
                            <div class="reward">
                                ${tagsHtml}
                            </div>
                            <div class="icons">
                            
                                <span class="read-more"  onclick="addedToRead('${item.id}')">
                                    <i class="fas fa-info-circle"></i>
                                    read more
                                </span>
                                <span class="icon-campaign" onclick="addPledge('${item.id}')">
                                    <i class="fas fa-donate"></i>
                                </span>
                            </div>
                        </div>           `
                    }
                }
// console.log(row[key]);
 } 
})

campagins.innerHTML=tableData
// console.log(tableResponsive)

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
let trsPerPage=4;
async function displayPage(page){ 
    let tableData=''
    let filterd=filterData? filterData : data
    console.log(filterd,filterData)
    totalPages = Math.ceil(filterd.length / trsPerPage); 
    console.log(totalPages)
    console.log(totalPages)
	const startIndex = (page - 1) * trsPerPage; 
	const endIndex = startIndex + trsPerPage; 
    // <td>user Image</td>

    let userid=1
	filterd.forEach((t, index) => { 
        
		if (index >= startIndex && index < endIndex) {
            // if(user.id !=userLogIn.id){
                
            if(filterd[index].isApproved==true){
                let tagsHtml = "";
                if (filterd[index].rewards && filterd[index].rewards.length > 0 && filterd[index].rewards[0]!=null ) {
                    tagsHtml = `
                             <p><span>Reward : ${filterd[index].rewards[0].title} </span></p> |
                            <p class="amount">Amount :${filterd[index].rewards[0].amount}</p>
                    `;
                    tableData+= `
                    <div class="campaign">
                                
                        <span class="reward-amount">${filterd[index].deadline}</span>
                        <div class="image-campaign">
                            <a href=""><img src="${filterd[index].image}" alt=""></a>
                        </div>
                        <p class="name-campaign"><a href="">${filterd[index].title}</a></p>
                        <div class="reward">
                            ${tagsHtml}
                        </div>
                        <div class="icons">
                        
                            <span class="read-more"  onclick="addedToRead('${filterd[index].id}')">
                                <i class="fas fa-info-circle"></i>
                                read more
                            </span>
                            <span class="icon-campaign" onclick="addPledge('${filterd[index].id}')">
                                <i class="fas fa-donate"></i>
                            </span>
                        </div>
                    </div>           `
                }
            }
		}

	})
    
    campagins.innerHTML=tableData; 
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
    disableinputs()
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
        nextButton.disabled=true
        nextButton.style.color='#ccc'

    }
    else{
        nextButton.disabled=false
        nextButton.style.color='#fcb700'
    }
    console.log(nextButton.disabled)
    if(totalPages==1 || currentPage==1){
        prevButton.disabled=true
        prevButton.style.color='#ccc'
    }
    else{
        prevButton.disabled=false
        prevButton.style.color='#fcb700'
    }

}
