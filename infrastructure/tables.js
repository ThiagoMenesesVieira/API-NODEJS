class Tables {
    init(connection){
        this.connection = connection
        this.createCalls()
    }

    createCalls(){
        const sql = 'CREATE TABLE IF NOT EXISTS Calls (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL,date datetime NOT NULL, createDate datetime NOT NULL, status varchar(20) NOT NULL, observation text, PRIMARY KEY(ID))'
        this.connection.query(sql, (erro) =>{
            if(erro){
                console.log(erro)
            }else{
                console.log('Create sucess calls tables')
            }
        })

    }
}

module.exports = new Tables