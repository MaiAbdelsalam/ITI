let search=document.getElementById('search')
let pagination=document.getElementById('pagination')
let btns=document.querySelectorAll('li.btn')
let data;
let tableData;
let filterData
let tbody=document.querySelector('tbody')

window.addEventListener('load', async () => {
    let res = await fetch("http://localhost:3000/users");
    data = await res.json();
    if(data.length>0){
        pagination.style.display="block"
        displayPage(currentPage)
        disableinputs()
        console.log(data)
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
    }


    // displayPage(currentPage)
});
search.onkeyup=function(){
    let searchVal=search.value;
    console.log(searchVal)
    tableResponsive.innerHTML="";

    filterData=data.filter((item)=>item.name.includes(searchVal)) ;
    // if(filterData=='' || filterData.length==0) filterData=data
    console.log(filterData)
    tableData=''    
    tableData=`<table>
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
    filterData.forEach(item => {
        let userid=1
        if(item.name.includes(searchVal)){
            // for (let user of filterData) {
                tableData += '<tr>';
                    let userRoles=['user','super admin','admin']
                    let active=[true,false]
                    let roleSelect=``
                        roleSelect+=`
                            <option value="${item.role}" >${item.role}</option>
                            `
                            filteredroles=userRoles.filter(userrol=> userrol!=item.role)
                            console.log(filteredroles)
                            for(let filter of filteredroles){
                                roleSelect+=`
                                <option value="${filter}"  >${filter}</option>
                                `
                            }
                            console.log(roleSelect)
                            let activeUser=``
                            activeUser+=`
                                
                                <option value=${item.isActive} >${item.isActive}</option>
                                `
                                console.log(typeof(item.isActive))
                                // let boolean=user.isActive=="true"
                                filterActive=active.filter(acti=>acti!=item.isActive)
                                console.log(filterActive)
                                for(let activ of filterActive){
                                    activeUser+=`
                                <option value="${activ}" >${activ}</option>
                                `
                            }
                                // }
                                console.log(activeUser)
                        tableData+= `
                         <tr>
                        <td>${userid}</td>
                        <td><img src="${item.image}" width="40px" height="40px"></td>
                        <td>${item.name}</td>
                        <td>
                            <span>
                               <select class="chooseRole" id="${item.id}" >
    
                            ${roleSelect}
                            </select>
                            </span>
                        </td>
                        <td>
                            <select name="" class="active" id="${item.id}">
                            ${activeUser}
                            </select>
                        </td>
                    </tr>
                
                        `
                        userid++;
                        // console.log(row[key]);
                      
                 
                 tableData += '</tr>';
           // }     
 } 
 
})
    tableData+='</table>'
    tableResponsive.innerHTML=tableData   
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
    let filterd=filterData? filterData : data
    console.log(filterd)
    totalPages = Math.ceil(filterd.length / trsPerPage); 
    console.log(totalPages)
    console.log(totalPages)
	const startIndex = (page - 1) * trsPerPage; 
	const endIndex = startIndex + trsPerPage; 
    tableData=''
    tableData+=`<table>
                    <thead>
                    <td>User Id</td>
                    <td>User Image</td>
                    <td>User Name</td>
                    <td>Role</td>
                    <td>Active</td>
                    </thead>
                </tbody>
    `
    let userid=0
	filterd.forEach((t, index) => { 
        
		if (index >= startIndex && index < endIndex) {
            // if(user.id !=userLogIn.id){
                
                let userRoles=['user','super admin','admin']
                let active=[true,false]
                let roleSelect=``
                    roleSelect+=`
                        <option value="${filterd[index].role}" >${filterd[index].role}</option>
                        `
                        filteredroles=userRoles.filter(userrol=>userrol!=filterd[index].role)
                        console.log(filteredroles)
                        for(let filter of filteredroles){
                            roleSelect+=`
                            <option value="${filter}"  >${filter}</option>
                            `
                        }
                        console.log(roleSelect)
                        let activeUser=``
                        activeUser+=`
                            
                            <option value=${filterd[index].isActive} >${filterd[index].isActive}</option>
                            `
                            console.log(typeof(filterd[index].isActive))
                            // let boolean=user.isActive=="true"
                            filterActive=active.filter(acti=>acti!=filterd[index].isActive)
                            console.log(filterActive)
                            for(let activ of filterActive){
                                activeUser+=`
                            <option value="${activ}" >${activ}</option>
                            `
                        }
                            // }
                            console.log(activeUser)
                tableData+=`
                    <tr>
                        <td>${userid}</td>
                        <td><img src="${filterd[index].image}" width="40px" height="40px"></td>
                        <td>${filterd[index].name}</td>
                        <td>
                            <span>
                               <select class="chooseRole" id="${filterd[index].id}" >
    
                            ${roleSelect}
                            </select>
                            </span>
                        </td>
                        <td>
                            <select name="" class="active" id="${filterd[index].id}">
                            ${activeUser}
                            </select>
                        </td>
                    </tr>
                
                    ` 
                    userid++
		}

	})
    tableData+=`</tbody>
    </table>`
    tableResponsive.innerHTML=tableData; 
    console.log(tbody)

} 

let pageNumbers=document.querySelector('#pageNumbers')
let prevButton=document.querySelector('.prev')
let nextButton=document.querySelector('.next')
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


