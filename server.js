const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Welcome')
})

let arr = ''

let welcome = {message : 'Welcome to Delivery Service' + ' ' + 'Kindly Enter the Order ID'}

app.post('/get_delivery_order', async (req, res) => {
    try {
        let { message } = req.body
        if(message == '1'){
            let order_id = arr
                let response = await axios.post('https://sellbackend.creditclan.com/parent/index.php/globalrequest/get_delivery_order', {order_id})
                let scan_msg = response.data.scan_message
                let scan_link = response.data.scan_link
                let resp = {
                    status: true,
                    message: (`To confirm customer has recieved the order, ` + scan_msg + ' ' + 'click the link below to scan the qr code') +
                    scan_link
                }
                res.send(resp)
        }
        if (message == 'delivery') {
            res.status(200).json(welcome)
        }
        if(message !=="delivery" && message !== "1"){
            let order_id = message
             arr = message
            let response = await axios.post('https://sellbackend.creditclan.com/parent/index.php/globalrequest/get_delivery_order', { order_id })
            if(response.data.status == true){
                let a = response.data.order
                let phone = a.phone_no
                let total_amount = a.total_price.total_amount
                "Shop your favourite items :shopping_trolley: from any of our over 10,000 verified merchants and stores :point_down::skin-tone-5:\n\n*[1]* I have a merchant on Sell\n*[2]* Explore other stores\n\nType *return* to go back to main menu  :man-running::skin-tone-5:"
                let msg = {
                    status: true,
                    message: phone + '\n' + total_amount + '\n' + 'Type' + '[1] To Confirm' + ' ' + '*[2]* To Edit' + ' ' + '*[3]* To Cancel' + '\n' + '*[m]* main menu'
                }
                res.json(msg)
            }
            else{
                res.send(response.data)
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
    console.log('Server connected success to ' + PORT);
})