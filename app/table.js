
// Simple schema for our table. We only need to define the tables key attribute here.
var tableSchema = {
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'N'
    },
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'test_table',
  StreamSpecification: {
    StreamEnabled: false
  }
}

module.exports = tableSchema
