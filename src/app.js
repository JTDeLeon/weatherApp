const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jonathan Deleon'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About Me',
        name : 'Jonathan Deleon'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Jonathan Deleon',
        message: 'Do you need help?? Ask me a question!'
    })
})

//app.com/weather
app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'Please enter address to see the weather.'
        })
    }

    geocode(req.query.address, (error, {lattitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error: error
            });
        }

        forecast(lattitude, longitude, (error, data = {}) => {
            if(error){
                return res.send({
                    error : error
                })
            }
            // console.log(location);
            // console.log(data);

            //Response
            res.send({
                forecast : data,
                location : location,
                address : req.query.address
            });

        })

    })

    
})

// app.get('/products', (req, res) => {

//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }    
    
//     console.log(req.query);
//     return res.send({
//         products : []
//     });

// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.'
    });
})

//Must go last
app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.'
    });
})

//Start server up
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
