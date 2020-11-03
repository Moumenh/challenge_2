const express = require('express')


const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(__dirname + '/./client'))

function arrayToCSV(data) {
    let csv = data.map(row => Object.values(row));

    let child = csv[0].pop()
    if (Array.isArray(child) && child.length > 0) {
        for (let i = 0; i < child.length; i++) {
            let rec = []
            rec = arrayToCSV([child[i]])
            rec.shift()
            if (rec.length !== 0) {
                for (let i = 0; i < rec.length; i++) {
                    csv.push(rec[i])
                }
            }
        }
    }
    let keys = Object.keys(data[0])
    keys.pop()
    csv.unshift(keys);
    return csv
}


app.post('/json' , (req,res) => {
    let array = []
    let result = []
    if(Array.isArray(req.body)){
        result = arrayToCSV(req.body)
    }else{
        array.push(req.body)
        result = arrayToCSV(array)  
    }
    console.log(result)
    res.json(result.join('\n'))
})

// app.get('/json' , (req,res) => {
//     // console.log(req.body)
//     res.send('csv sent')
// })


app.listen(3000,() => {
    console.log('server is listening ')
})

