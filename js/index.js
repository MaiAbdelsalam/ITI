let campaignsContainer=document.querySelector('.campaigns_container');
console.log(campaignsContainer)
console.log(true==true)
let categoryTypes=['Arts','Technology','Health','Films','Education']

window.addEventListener('load',async()=>{
    let res = await fetch(`http://localhost:3000/campaigns`);
    data = await res.json();
    console.log(data)
    drawCampaignsUi()
})

let slides=document.querySelectorAll('.slider-card');

let index=0;

function next(){
    slides[index].classList.remove('active');
    index=(index + 1)% slides.length;
    slides[index].classList.add('active');
    console.log(index);
    console.log(slides);

}

function prev(){
    slides[index].classList.remove('active');
    index=(index - 1+slides.length)% slides.length;
    slides[index].classList.add('active');
    console.log(index);

}

 let swiper=new Swiper(".slide-campaign",{
    slidesPerView:5,
    spaceBetween:20,
    navigation: { 
        nextEl: ".nextBtn", 
        prevEl: ".prevBtn" 
    },
    loop:true
 })
function drawCampaignsUi(){
    if(data.length==0){
        campaignsContainer.innerHTML="there is no campains Yet";
    }
    else{
        let campUi=data.map((camp)=>{
            let tagsHtml = "";
            if (camp.rewards && camp.rewards.length > 0 && camp.rewards[0]!=null ) {
                tagsHtml = `
                        <a href="#"><i class="fas fa-tag"></i>Reward Title : ${camp.rewards[0].title} </a><br>
                        <a href="#"><i class="fas fa-gift"></i>Reward Amount :${camp.rewards[0].amount}  </a>
                `;
            }
            
            console.log("pro", camp.id)
            if(camp.isApproved==true){
                return `
                <div class="box">
                          <div class="update">
                              <p><i class="fas fa-calendar"></i> ${camp.deadline}</p>
                          </div>
                          <div class="image">
                              <img src="${camp.image}" alt="">
                          </div>
                          <div class="content">
                              <div class="tags">
                              ${tagsHtml}
                              </div>
                              
                              <h3>${camp.title}</h3>
                              <p>Goal : ${camp.goal}</p>
                              <div class="login-signup" style="justify-content:center">                     
                                  <button  onclick="addedToRead('${camp.id}')" class="">read more</button>
                                  <button onclick="addPledge('${camp.id}')" class="">Add pledge</button>
                              </div>
                          </div>
                      </div>
                `
            }
        });
        campaignsContainer.innerHTML=campUi.join(" ");
    }
}

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

