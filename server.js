const http = require("http");

http.createServer((request,response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' }); //basicamente, aqui informa o tipo de retorno para quem faz a requisição

    if(request.url === '/produto'){
        response.end(JSON.stringify({
            message: "Rota produto"
        }));
    }

    if(request.url === '/usuario'){
        response.end(JSON.stringify({
            message: "Rota usuários"
        }));
    }

    response.end(JSON.stringify({
        message: "Qualquer outra rota"
    }));  
})
.listen(4001,() => console.log("Servidor rodando na porta 4001")); //indica a porta que queremos que receba as solicitações