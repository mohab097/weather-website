const path=require('path')
const express= require('express')
const hbs=require('hbs')
const geocode=require('./Utils/geocode')
const forecast=require('./Utils/forecast')

const app=express()

//define paths for express configuration
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')



//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Mohab Tarek'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name: 'Mohab Tarek'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Moha Tarek'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
               return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
      return  res.send({
            error: 'you must provide a search term'
        })
    }  
   
        res.send({
            products: []
        })
    
   
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Mohab Tarek',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mohab Tarek',
        errorMessage:'Page not found.'

    })
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})