const express = require('express')


const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(__dirname + '/./client'))


app.post('/json' , (req,res) => {
    console.log(req.body)
    res.json(req.body)
})

// app.get('/json' , (req,res) => {
//     // console.log(req.body)
//     res.send('csv sent')
// })


app.listen(3000,() => {
    console.log('server is listening ')
})

