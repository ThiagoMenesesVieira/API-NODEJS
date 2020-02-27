const Calls = require('../models/calls')

module.exports = app => {
    app.get('/calls', (req, res) => {
        Calls.list(res)
    })

    app.get('/calls/:id', (req, res) => {
        console.log('aaa')
        const id = parseInt(req.params.id)

        Calls.search(id, res)
    })

    app.post('/calls', (req, res) => {
        const calls = req.body
        Calls.add(calls, res)
    });

    app.patch('/calls/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Calls.change(id,values,res)
    })
    app.delete('/calls/:id',(req, res) =>{
        console.log('aaaa')
        const id  = parseInt(req.params.id)
        Calls.del(id, res)
    })
}