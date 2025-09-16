let summaryConatiner=document.querySelector('.summaryconatiner');
let pledge =JSON.parse(localStorage.pldgeadded)
let rewards=document.getElementById('rewards')
let submitPledge=document.getElementById('submitPledge')
let email=document.getElementById('email')
let password=document.getElementById('password')
let name=document.getElementById('name')
let tempui='';
let rewardsui
let data
let error=''
let quantity=0
let optin


window.addEventListener('load',async()=>{
    let res = await fetch(`http://localhost:3000/campaigns/${pledge}`)
    data = await res.json();
    if(data.rewards.length>0){
        console.log(data.rewards)
        for(let reward of data.rewards){
            rewardsui+=`
            <option value="${reward.id}" >${reward.title}</option>
            `
        }

        let userRes = await fetch(`http://localhost:3000/users/${userLogIn.id}`)
        userData = await userRes.json();
        email.value=userData.email
        password.value=userData.email
        name.value=userData.name


    }
    console.log(data)
    summaryConatiner.innerHTML=`<div class="items">
            <div class="pledge-cart">
                <div class="image-name">
                    <img src="${data.image}" alt="">
                    <div class="content">
                        <h4>${data.title}</h4>
                        <div class="quantity-control">
                            <a class="decrease-quantity" onclick="decreaseQuantity()" >-</a>
                            <span class="qunatity">0</span>
                            <a class="increase-quantity" onclick="increaseQuantity()" >+</a>
                        </div>
                        <div class="select-box">
                            <select id="rewards" name="" >
                            <option disabled selected="true" >choose reward</option>
                            ${rewardsui}
                            </select>
                        </div>
                    </div>
                </div>
                <button class="delete-item"><i class="fa-solid fa-trash"></i></button>
            </div>
     <p id=error></p>

        </div>
        `
rewards=document.getElementById('rewards')
error=document.getElementById('error')
rewards.addEventListener("change",(e)=>{
    optin= e.target.value
    console.log(optin)

})

})

function rewardChange(id){
    // optin= id
    console.log(id)

}

function decreaseQuantity(){

    if(quantity==1){
        quantity=1
    }
    else{
        quantity-=1
        document.querySelector('.qunatity').innerHTML=quantity
        console.log(document.querySelector('.qunatity'))
    }
}
function increaseQuantity(){
    quantity+=1;
    document.querySelector('.qunatity').innerHTML=quantity
    console.log(document.querySelector('.qunatity'))
    
}
submitPledge.addEventListener('click',async(e)=>{
    e.preventDefault()
        let obj={
            "campaignId": data.id,
            "userId": userLogIn.id,
            "amount": quantity,
            "rewardId": optin
        }
        if(obj.amount==0 || obj.rewardId==''){
            error.innerHTML='please select reward'
        }
        else{

            console.log(obj)
           let res = await fetch(`http://localhost:3000/pledges`,{
               method:'post',
               body:JSON.stringify(obj)               
           });
           localStorage.removeItem("pldgeadded")
         window.location="pledge.html";

           // ;
        //    Swal.fire({
        //     position: "center",
        //     icon: "success",
        //     title: "Your work has been saved",
        //     showConfirmButton: true
        //   });
        //   setTimeout(()=>{
        //       window.location="pledge.html";
        //   },4000)

          
          
        }
        //    swal("Here's the title!", "...and here's the text!");

        

})


function addPledge(id){
    console.log(id)
 
}
