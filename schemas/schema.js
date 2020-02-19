const graphQl = require("graphql");
const lodash = require("lodash");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphQl;

const users = [
    {id: '1', firstName: 'Lounis', age: 25},
    {id: '2', firstName: 'Toto', age: 25},
]

const UserType = new GraphQLObjectType({
    name : 'User',
    fields : {
        id : {type : GraphQLString},
        firstName : {type : GraphQLString},
        age : { type : GraphQLInt}
    }
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields : {
        user: {
            type : UserType,
            args : {id : {type : GraphQLString}},
            resolve(parentValue, args){
                return lodash.find(users, {id : args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery
})