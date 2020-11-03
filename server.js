const express = require('express')


const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(__dirname + '/./client'))

function arrayToCSV(data) {
    csv = data.map(row => Object.values(row));
    csv.unshift(Object.keys(data[0]));
    return `"${csv.join('"\n"').replace(/,/g, '","')}"`;
}


app.post('/json' , (req,res) => {
    let array = []
    array.push(req.body)
    let result = arrayToCSV(array)

    console.log(result)
    res.json(result)
})

// app.get('/json' , (req,res) => {
//     // console.log(req.body)
//     res.send('csv sent')
// })


app.listen(3000,() => {
    console.log('server is listening ')
})

