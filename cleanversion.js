let myLeads = []//Instead of this, create the render function to avoid hard code.
const inputEl = document.getElementById("input-el") 
const ulEl = document.getElementById("ul-el") 
const inputBtn = document.getElementById("input-btn")
//1. Store the delete button in a variable called deleteBtn:
const deleteBtn = document.getElementById("delete-btn")
//localStorage.clear()
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)
const tabBtn = document.getElementById("savetab-btn")


//1.Check if leadsFromLocalStorage is truthy
//2.If so, set myLeads to its value and call renderLeads()
if (leadsFromLocalStorage){
   myLeads = leadsFromLocalStorage
   render(myLeads)
} //With this, if we refresh the page, we'll have persistent our leads across refresh.


tabBtn.addEventListener("click", function(){
   //console.log(tabs[0].url) //How do we get a hold of url value? We use the dot notation (so, we just log the url of obj inside array)
   //Grab the URL of the current tab:
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { //chrome.tabs is an API (application programing interface)
      //This is an API that is only avaliable to use. when we're running the code in the context of a chrome extrnsion. 
       console.log(tabs)
       myLeads.push(tabs[0].url)
       localStorage.setItem("myLeads", JSON.stringify(myLeads))
       render(myLeads)
      
      })
   //Next step is to actually save the URL instead of just logging it out.
  
 })
 

//REFACTORING RENDERLEADS FUNCTION. ADDING ARGUMENTS AND CHANGE NAME SO IT WILL BE MORE DYNAMIC. So now we have a function called render, 
//which can take any array you give it and then render it out.
               //other name
function render(leads){ //It doesn't matter what we call this parameter. However, that will require us to also change the body of the function. 
   let listItems = " "
                      //other name
   for(let i = 0; i < leads.length; i++){
      //2.Add the item to the listItems variable instead of the ulEl.innerHTML. 
      //listItems += "<li><a target='_blank' rel='noopener noreferrer' href='" +  myLeads[i] + "'>" + myLeads[i] + "</a> " + "</li>"  
      //Simplified version using template string:
      listItems += `
     <li>                                                    
        <a target='_blank' rel='noopener noreferrer' href='${leads[i]}'>
            ${leads[i]}
        </a>
     </li>
  `
      
     //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
   
  }
  
  //3. Render the listItems inside the unordered list using ulEl.innerHTML
   ulEl.innerHTML = listItems
  //why ulEL.innerHTML comes outside of the loop? remember: DOM manipulation comes with a cost. Inside of the loop innerHTML will run 3 times
  //outside, only one.
}


//2.Listen for double clicks on the delete button(google it)
//3. When clicked, clear localStorage, myLeads and the DOM, so that the user doesn't see any more leads on the unordered list. 
deleteBtn.addEventListener("dblclick", function(){
   localStorage.clear()
   myLeads = []
   render(myLeads)
   console.log(myLeads)
})

inputBtn.addEventListener("click", function(){
  myLeads.push(inputEl.value)
  console.log(myLeads)
  inputEl.value = " "
  localStorage.setItem("myLeads", JSON.stringify(myLeads) )
  //console.log(typeof myLeads)
 //to verify it works:
 //console.log(localStorage.getItem(myLeads))
  render(myLeads)
}) 


//Improve performance of the app;
//1. Create a variable, listItems, to hold all the HTML for the list items.
//Assign it to an empty string to begin with:

