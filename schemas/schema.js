const graphQl = require("graphql");
const lodash = require("lodash");
const axios = require("axios");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphQl;

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields : () => ({
        id: {type : GraphQLString},
        name: { type : GraphQLString},
        user : {
            type : GraphQLList(UserType),
            resolve(parentValue, arges){
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`).then((response) => { 
                    return response.data; 
                })
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name : 'User',
    fields : () => ({
        id : { type : GraphQLString },
        firstName : { type : GraphQLString },
        age : { type : GraphQLInt },
        campany : {
            type : CompanyType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then((response) => { 
                    return response.data; 
                })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields : () => ({
        user: {
            type : UserType,
            args : {id : {type : GraphQLString}},
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/users/${args.id}`).then((response) => { 
                    return response.data; 
                })
            }
        },
        campany : {
            type : CompanyType,
            args : {id : {type : GraphQLString}},
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${args.id}`).then((response) => {
                    return response.data;
                })
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query : RootQuery
})