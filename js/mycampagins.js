let campaignsContainer =document.querySelector('.campaigns_container')
let nocampaignsContainer =document.querySelector('.nocampaigns_container')
let data;
window.addEventListener('load',async()=>{
    let res = await fetch(`http://localhost:3000/campaigns?creatorId=${userLogIn.id}`);
    data = await res.json();
    console.log(data)

    drawCampaignsUi()
 
})
function drawCampaignsUi(){
    if(data.length==0){
        nocampaignsContainer.innerHTML="there is no campaigns";
    }
    
    let campUi=data.map((camp)=>{
        if(camp.isApproved==true){
            let tagsHtml = "";
            if (camp.rewards && camp.rewards.length > 0 && camp.rewards[0]!=null ) {
                tagsHtml = `
                        <span>Reward Title : ${camp.rewards[0].title}</span>
                        <span>Reward Amount :${camp.rewards[0].amount}</span>
                   
                `;
            }
            console.log("pro", camp.id)
    
            return `
              
            <div class="product-item">
                    <img src="${camp.image}" alt="" class="product-item-img" onclick="saveItemData(${camp.id})">
                    <div class="product-item-desc">
                        <a onclick="saveItemData(${camp.id})">${camp.title}</a>
                        <p>${camp.deadline}</p>
                        ${tagsHtml}
    
                        <div class="login-signup">
                            <button class="delete-item"  onclick="removeFromMyCamp('${camp.id}')"><i class="fa-solid fa-trash"></i></button></button>
                            <button class="add-to-cart " onclick="addedToEdit('${camp.id}')" class="">Edit Campaign</button>
                        </div>
                    </div>
                </div>
              `

        }
    });
    campaignsContainer.innerHTML=campUi.join(" ");
}

function removeFromMyCamp(id){
    // console.log(id)
    let removeCamp= async () => {

        let res = await fetch(`http://localhost:3000/campaigns/${id}`, {
            method: "delete",
        });
        data = await res.json();
        console.log(data); 
        console.log('deleted'); 
        drawCampaignsUi();   
    };
    removeCamp()
}

//edit product
function addedToEdit(id){
    localStorage.setItem("editcamp",JSON.stringify(id));
    window.location="editCamp.html";
}


