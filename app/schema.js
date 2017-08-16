var { buildSchema } = require('graphql')

//Simple GraphQL schema

var schema = buildSchema(`
  type Record {
    id: Int!
    name: String!
  }

  type Query {
    allRecords: [Record]
  }
`);

module.exports = schema