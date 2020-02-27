const moment = require('moment')
const connection = require('../infrastructure/connection')

class Calls {
    add(Calls, res){
        const createDate = moment().format('YYYY-MM-DD HH:MM:SS')
        const date = moment(Calls.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
  
        const validIsDate = moment(date).isSameOrAfter(createDate)
        const validIsClient = Calls.client.length >= 5

        console.log('create: ' + createDate)
        console.log('date:' + date)
        const valid = [
            {
                name: 'date',
                valid: validIsDate,
                mensage: 'Data deve ser maior que a data atual'
            },
            {
                name: 'client',
                valid: validIsClient,
                mensage: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
console.log(validIsDate)
        const erros = valid.filter(campo => !campo.valid)
        const existErro = erros.length

        if(existErro){
            res.status(400).json(erros)
        }else {
            const dateCalls = {...Calls,createDate, date}
            const sql = `INSERT INTO Calls SET ?`

            connection.query(sql, dateCalls, (erro, results) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json(Calls)
                }
                
            })

        }
    }

    list(res){
        const sql = `SELECT * FROM Calls`

        connection.query(sql, (erro, results) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(results)
            }
        })
    }

    search(id, res){
 
        const sql = `SELECT * FROM Calls WHERE id=${id}`
        connection.query(sql, (erro, results) => {
            const calls = results[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(calls)
            }
        })
    }

    change(id, values, res){
        if(values.date){
            values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY´MM-DD HH-MM:SS')
        }
        const sql = `UPDATE Calls SET ? WHERE id=?`
        connection.query(sql, [values, id], (erro, results) => {
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(results)
            }
        })
    }

    del(id, res){
        const sql =`DELETE FROM Calls WHERE id=?`
        connection.query(sql, id, (erro, results) => {
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json({id})
            }
        } )
    }
}

module.exports = new Calls