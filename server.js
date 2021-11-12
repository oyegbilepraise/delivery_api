const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Welcome')
})

let arr = []

let welcome = '- Welcome to Delivery Service' + '<br>' + 'Kindly Enter the Order ID'

app.post('/get_delivery_order', async (req, res) => {
    try {
        let {message, order_id} = req.body
        if(message == 'delivery') res.status(200).json(welcome)

        arr.push(order_id)
        let response = await axios.post('https://sellbackend.creditclan.com/parent/index.php/globalrequest/get_delivery_order', {order_id})
        
        
            if(response.data.status == true){
                console.log(arr);
                let a = response.data.order
                    let phone = a.phone_no
                    let total_amount = a.total_price.total_amount 
                    let msg = {
                        status: true,
                        message: {
                            phone, total_amount
                        },
                        response: 'Type' + '[1] To Confirm' + ' ' +'[2] To Edit' + ' ' + '[3] To Cancel' + '[m] main menu'
                    }
                res.json(msg)
            }
            if(message == '1'){
                let order_id = arr[0];
                let response = await axios.post('https://sellbackend.creditclan.com/parent/index.php/globalrequest/get_delivery_order', {order_id})
                let scan_msg = response.data.scan_message
                let scan_link = response.data.scan_link
                let resp = {
                    status: true,
                    message: (`To confirm customer has recieved the order, ` + scan_msg + ' ' + 'click the link below to san the qr code'),
                    scan_link
                }
                res.send(resp)
            }
            if(response.data.status == false && message != '1') {
                res.send(response.data)
            }
    } catch (error) {
        res.status(500).json(error)
    }
})

const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
    console.log('Server connected success to' + PORT);
})