const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: "Kush Mittal"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Kush Mittal'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an Address'
        })
    }

    geocode(req.query.address, (error,{longitude, latitude, location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(longitude,latitude, (error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address

            })
        })

    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a Search Term'
        })
    }

    console.log(req.query.search)

    res.send({
        products : []
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title: 'Help',
        name: 'Kush Mittal'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Kush Mittal',
        errorMessage: 'Help Article not Found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Kush Mittal',
        errorMessage: 'Page not Found'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port' + port)
})