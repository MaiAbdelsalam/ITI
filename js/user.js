let tableResponsive=document.querySelector('.table-responsive')
let campaignTable=document.querySelector('.table-responsive table')
let userCard=document.querySelector('.campaigns')
let optin
let userLogIn=JSON.parse(localStorage.getItem('userInfo'))
console.log(userLogIn)
// navToggle.addEventListener('click',()=>{
//     sideBar.classList.toggle('active')
//     mainContent.classList.toggle('active')
// })
// window.onscroll=function(){
//     sideBar.classList.remove('active');
//     mainContent.classList.remove('active');
// }
// mainContent.addEventListener('click',()=>{
//     sideBar.classList.remove('active');
// })
window.addEventListener('load',async()=>{
    userRes=await fetch('http://localhost:3000/users')
    usersData=await userRes.json()
    let userId
    drawUersUi();
    chooseRole=document.querySelectorAll('.chooseRole')

    chooseRole.forEach(element => {
        element.addEventListener("change",async (e)=>{
            optin= e.target.value
            console.log(e.target)
            console.log(e.target.id)
            console.log((e.target.value))
        
            let obj={
                role:e.target.value
            }
            let res = await fetch(`http://localhost:3000/users/${e.target.id}`,{
                method:'PATCH',
                body:JSON.stringify(obj)
            });
        })    
    });
    if(usersData.length > 0){
        pagination.style.display="block"
    }
    chooseActive=document.querySelectorAll('.active')
    chooseActive.forEach(element=>{
        element.addEventListener('change',async(e)=>{
            console.log(e.target.id)
            console.log(e.target.value)
            let boolean=e.target.value==true
            console.log(boolean)
            let obj={
                isActive:boolean
            }
            console.log(typeof(boolean))

            let res = await fetch(`http://localhost:3000/users/${e.target.id}`,{
                method:'PATCH',
                body:JSON.stringify(obj)
            });
        })
    })
    drawUersUi()

    
})

function drawUersUi(){
    let campUi=''
    if(usersData.length==0){
        tableResponsive.innerHTML='there is no campaign yet'
    }
    else{        
        campUi+=`
         <table >
            <thead>
                <tr>
                    <td>user id</td>
                    <td>user Image</td>
                    <td>user name</td>
                    <td>user role</td>
                    <td>Active</td>
                </tr>
            </thead>
            <tbody>
        `
        let userid=1
        for(let user of usersData){
            console.log(user==userLogIn)
            if(user.id !=userLogIn.id){
                
                let userRoles=['user','super admin','admin']
                let active=[true,false]
                let roleSelect=``
                    roleSelect+=`
                        <option value="${user.role}" >${user.role}</option>
                        `
                        filteredroles=userRoles.filter(userrol=>userrol!=user.role)
                        console.log(filteredroles)
                        for(let filter of filteredroles){
                            roleSelect+=`
                            <option value="${filter}"  >${filter}</option>
                            `
                        }
                        console.log(roleSelect)
                        let activeUser=``
                        activeUser+=`
                            
                            <option value=${user.isActive} >${user.isActive}</option>
                            `
                            console.log(typeof(user.isActive))
                            // let boolean=user.isActive=="true"
                            filterActive=active.filter(acti=>acti!=user.isActive)
                            console.log(filterActive)
                            for(let activ of filterActive){
                                activeUser+=`
                            <option value="${activ}" >${activ}</option>
                            `
                        }
                            // }
                            console.log(activeUser)
                campUi+=`
                    <tr>
                        <td>${userid}</td>
                        <td><img src="${user.image}" width="40px" height="40px"></td>
                        <td>${user.name}</td>
                        <td>
                            <span>
                               <select class="chooseRole" id="${user.id}" >
    
                            ${roleSelect}
                            </select>
                            </span>
                        </td>
                        <td>
                            <select name="" class="active" id="${user.id}">
                            ${activeUser}
                            </select>
                        </td>
                    </tr>
                
                    `
                    userid++
            }
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
       
        </div>
    `
    }
    userCard.innerHTML=userUi

}

  








