const express = require('express');
const secured = require('../lib/middleware/secured');
const router = express.Router();
const request = require('request');
const cities = require('../lib/res/cities.json');

router.get('/weather', secured(), (req, res, next)=>{
    
    let cityList = [];
    let list = cities.List;
    //loading the city array with the ids from the cities.json
    list.forEach(item=>{
        cityList.push(item.CityCode);
    })
    //preparing the list of ids to include in the url with JOIN
    let id=cityList.join();

    try{
    const url = `http://api.openweathermap.org/data/2.5/group?id=${id}&units=metric&appid=${process.env.API_KEY}`;
    request(url, (error, response, body)=>{
        const data = JSON.parse(body);
        res.render('weather',{
            //Send only the list of the returned data from openWeatherMap
            dataSet : data.list
        });
    });
}catch(error){
    res.render('error',error);
}
    
});

module.exports = router;