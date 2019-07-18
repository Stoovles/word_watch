const express = require("express");
const app = express();
const router = express.Router();
var pry = require('pryjs');
var request = require('request');
app.use(express.urlencoded())


app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function (req, res) {
    var urlWordWatch = 'https://wordwatch-api.herokuapp.com/api/v1/top_word'
    // var queryObject = {
    //       q: req.query.q,
    //     diet: req.query.diet,
    //     calories: req.query.calories,
    //     health: req.query.health,
    //     ingr: req.query.ingr
    // }
    request({
        url:urlWordWatch
    }, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred

        } else if(response && body) {
          // eval(pry.it)
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // var jsonBody = JSON.parse(body)
            // var jsonBody = { data:
            //   {
            //     foodType: jsonBody.q,
            //     recipes: recipes(jsonBody)
            //   }
            // }
            // var this = JSON.stringify(body);
            res.render(__dirname + '/index.html', {myData:body} );
            // res.json({ body });


            // res.send( jsonBody );
        }
    })
})
// curl localhost:3000/ -X POST -d '{"word":{"value":"pudding"}}' -H "Content-Type: application/json"

app.post('/', function (req, res) {
    var urlWordWatch = 'https://wordwatch-api.herokuapp.com/api/v1/words'

    var postObject = {
          "word": { "value": req.body.word }
    }
    // { "word": { "value": "sample" } }
    request.post({
      headers: {'content-type' : 'application/json'},
      url:urlWordWatch,
      body: JSON.stringify(postObject)
    }, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred

        } else if(response && body) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // var jsonBody = JSON.parse(body)
            // var jsonBody = { data:
            //   {
            //     foodType: jsonBody.q,
            //     recipes: recipes(jsonBody)
            //   }
            // }
            // res.end(JSON.stringify(body));
            // res.json({ body });
            res.writeHead(302, {'Location': 'http://localhost:3000' + req.url});
            res.end();



            // res.send( jsonBody );
        }
    })
})



module.exports = app;





// var recipesRouter = require('./routes/api/v1/recipes');

// app.use('/api/v1/recipes', recipesRouter);
