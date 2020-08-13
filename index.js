const app = require('express')()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 8700
fs = require('fs')
const path = require('path')

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.get('/', (req, res) => {

    fs.readFile(path.join(__dirname, `endpoint/vaccines.json`), 'utf8',  (err,data) => {
        if (err) {
            return console.log(err)
        }
        let dataFormated = JSON.parse(data)
        res.json(dataFormated)
    })

})

app.get('/vaccine/:id', (req, res) => {

    let vacId = req.params.id

    fs.readFile(path.join(__dirname, `endpoint/vaccines.json`), 'utf8',  (err,data) => {
        if (err) {
            return console.log(err)
        }
        let dataFormated = JSON.parse(data)

        let vacFilter = dataFormated.vaccines_in_test

        let vac = vacFilter.filter((obj) => {
            return obj.id == vacId
        })

        console.log(vacId)

        res.json(vac)

    })


})


http.listen(PORT, () => {
    console.log('listening on *:8080');
})

