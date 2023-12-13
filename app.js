const express = require("express");  //importando o express 
const {randomUUID} = require("crypto");  //vai gerar um ID universal 
const { request } = require("http");
const fs = require("fs"); //importndo o file system para mexer com arquivos

const app = express();  //express é uma função

app.use(express.json());  //é algo que vai ser tratado no meio da nossa aplicação, entre a requisição e response

//criação das rotas usando express
/*app.get("/primeira-rota", (request,response) =>{
    return response.json({
        message:"acessou a primeira rota com nodemon",  // retorna um JSON
    });
});*/

//aplicação simples para cadastro de produtos

let products = [];  //array para inserir os produtos, já que não tem banco de dados

fs.readFile("products.json", "utf-8", (err, data) =>{
    if(err){
        console.log(err);
    }
    else{
        products = JSON.parse(data);
    }
});

/* 
    Body => Sempre que eu quiser enviar dados para minha aplicação
    Params => são os parâmetros de rota. Ex: /product/3863813, esse numero é o params
    query => quando são parametros não obrigatórios. ex: /product?id=232323&value=3283728 (exemplo na vida real, filtro no site)
*/
app.post("/products", (request, response) => {
    //nome e preço => name e price

    const {name, price} = request.body;  //essa chave é a desestruturação

    const product = {  //objeto
        name,
        price,
        id: randomUUID(),
    }

    products.push(product);

    ProductFile();

    return response.json(product);
});

app.get("/products", (request, response) =>{  
    return response.json(products)
});  //app.get para podermos buscar todos os produtos na rota products

app.get("/products/:id", (request, response) => {  //:id para ele entender que queremos a busca pelo id
    const {id} = request.params;  //desestruturação de dentro pra fora
    const product = products.find(product => product.id === id); //quando ele encontrar um produto no array que tiver o id igual o id do params, ele vai retonar esse produto
    return response.json(product);
});

app.put("/products/:id", (request,response) => {  // alterando dados
    const {id} = request.params; //esta linha serve para pegarmos o id
    const {name, price} = request.body; // aqui serve para receber os dados que vou alterar

    const productIndex = products.findIndex(product => product.id === id); //busca pela posição
    products[productIndex] = {
        ...products[productIndex], //pega todas as infos do array, menos o name e o price
        name,
        price
    }

    ProductFile();

    return response.json({message:"produto alterado com sucesso"});
});

app.delete("/products/:id", (request, response) => {
    const {id} = request.params; //esta linha serve para pegarmos o id

    const productIndex = products.findIndex(product => product.id === id); //busca pela posição

    products.splice(productIndex, 1); //vai remover exatamente o item que queremos

    ProductFile();

    return response.json({message:"produto removido com sucesso"});
});

function ProductFile(){
    fs.writeFile("products.json", JSON.stringify(products), (err) => {  //aqui ele vai criar um arquivo dentro da nossa aplicação
        if(err){
            console.log(err);
        }
        else{
            console.log("produto inserido")
        }
    });
}

//indicação da porta
app.listen(4002,() => console.log("O servidor está na porta 4002")); //o listen serve para indicarmos a porta, aqui (com o express) ele está seguido de uma função assíncrona que retorna a frase do console.log