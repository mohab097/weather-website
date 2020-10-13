console.log("Client side javascript file is loaded")



const weatherForm =document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        
        messageOne.textContent='Loading data'
        messageTwo.textContent=''

        fetch('http://localhost:3000/weather?address='+search.value).then((response) =>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageTwo.textContent=data.error
            messageOne.textContent=''
        }
        else
        {
            messageOne.textContent=data.location+'.'
            messageTwo.textContent=data.forecast+'.'
        }
    })
})

        console.log('testing!')
})