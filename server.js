const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Welcome')
})

let welcome = '- Welcome to Delivery Service' + '<br>' + 'Kindly Enter the Order ID'

app.post('/verify_order_id', async (req, res) => {
    try {
        let {message} = req.body
        if(message == 'delivery') res.status(200).json(welcome)
        
        else{
            let order_id = message;
            let response = await axios.post('https://sellbackend.creditclan.com/parent/index.php/globalrequest/get_delivery_order', {order_id})
            if(response) res.status(200).send(response.data)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
    console.log('Server connected success');
})