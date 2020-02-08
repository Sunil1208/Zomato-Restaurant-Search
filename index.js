const express = require('express') //wrapping express.js package in express variable
const bodyParser = require('body-parser')
const path = require('path')
const Zomato = require('zomato.js')
const z = new Zomato('5c3cf744d8eb402e6e9174359b10bbe2');

const app = express()
var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'static')))
// app.use(bodyParser.formData())
app.use(bodyParser.urlencoded({
    extended: false
}))

/* Test
app.get('/',(req,res) => {
    //res.send('Hello, World!')
    z.search({entity_id:'', entity_type: 'city', q: 'paneer'})
    .then(data => {
        res.json(data)
    }).catch(err => {
        console.error(err)
        res.status(500).send('error, here')
    })
})
*/

app.post('/search', async (req, res) => {
    //res.send('Hello, World!')
    try {
        const q = req.body.q;
        const data = await z.search({
            //entity_id: '',
            entity_type: 'city',
            //q
        })

        const restaurants = data.restaurants.map(r => {
            return {
                name: r.name,
                url: r.url,
                location: r.location,
                priceRange: r.average_cost_for_two,
                thumbnail: r.thumb,
                rating: r.user_rating.aggregate_rating,
            }
        })
        res.json({
            restaurants
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('error, here')
    }
})

app.listen(port, () => console.log('server started at port ' + port))