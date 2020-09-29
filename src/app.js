const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')




//path for public dir
const publicDirPath = path.join(__dirname, '../public')
//path for templates
const viewsPath = path.join(__dirname, '../templates/views')
//partial path
const partialPath = path.join(__dirname, '../templates/partials')
//start an express app called app
const app = express()
const port = process.env.PORT || 3000
//setup for hbs and views engine
app.set('view engine', 'hbs')
app.set('views', viewsPath) //alter dir of views as viewsPath
hbs.registerPartials(partialPath)

app.use(express.static(publicDirPath)) //use dir public for static content of webpage

//default route of server i.e index.hbs file

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jasbir Rajrana'
    })
})
//second route of server***
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jasbir Rajrana'

    })
})
//third route of server**
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'This is help text.',
        name: 'Jasbir Rajrana'
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Jasbir rajrana',
        errorMssg: 'Help article not found'
    })
})



//main route handlers////
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provided a address term'
        })
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: foreCastData,
                location: location,
                address: req.query.address
            })
        })
    })
})


//expt****////
// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provided a search term'
//         })
//     }
//     res.send({
//         product: []
//     })
// })

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Jasbir Raj rana',
        errorMssg: 'Page not found'
    })
})

//listen app at localhost 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})