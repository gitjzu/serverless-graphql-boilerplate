var express = require('express')
var graphqlHTTP = require('express-graphql')
var dynamoConnection = require ('./dynamo.js')
var schema = require('./schema.js')
var tableSchema = require('./table')

/**
 * Check if the DynamoDB table exists, if not we create one and add hard coded initial values to it!
 */
dynamoConnection.isTable(dynamoConnection.table)
.then(result => console.log('Table exists'))
.catch(result => {
  dynamoConnection.createTable(tableSchema)
  .catch(err => console.error('Error creating table' + err))
})


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
    .catch(err => console.log('Error while getting records: ' + err))
  },
}

//Set up the server to listen to '/graphql' endpoint on port 4000
var app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server!')

module.exports = app
