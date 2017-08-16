var express = require('express')
var graphqlHTTP = require('express-graphql')
var dynamoConnection = require ('./dynamo.js')
var schema = require('./schema.js')

/**
 * Now when you do a GraphQL query like so:
 * 
 * {
 *  allRecords 
 *   {
 *      id
 *      name
 *   }
 * }
 * 
 * the getRecords() method will be invoked and you'll get the data from your DynamoDB!
 */
var root = {
  allRecords: () => {
    return dynamoConnection.getRecords()
  },
}


//Set up the server to listen to '/graphql' endpoint on port 4000
var app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema.schema,
  rootValue: root,
  graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server!')

module.exports = app
