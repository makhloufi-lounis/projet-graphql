const express = require("express");
const expressGraphQl = require("express-graphql");
const userShema = require("./schemas/schema");
const server = express();

server.use("/salutGraphQl", expressGraphQl({
    graphiql:true,
    schema : userShema
}))
server.listen(4000,() => {
    console.log("Serveur est en écoute sur le port 4000");
})