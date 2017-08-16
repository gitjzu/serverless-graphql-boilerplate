var AWS = require('aws-sdk')

// Remember to change the region specified here if you aren't on eu-west-1 !!
AWS.config.update({
  endpoint: 'https://dynamodb.eu-west-1.amazonaws.com',
  region: 'eu-west-1'
})

// Authentication for AWS is automatically done through ENV variables

const dynamoClient = new AWS.DynamoDB.DocumentClient()

const table = 'TABLE_NAME_HERE'


// Create a new row on the DynamoDB table
function createRecord(record) {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: table,
      Item: record
    }

    dynamoClient.put(params, function(err, data) {
      if (err) return reject(err)
      return resolve(post)
    })

  })
}

// Get all of the records from DynamoDB table
function getRecords() {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: table,
      AttributesToGet: ['LIST', 'YOUR', 'OWN', 'COLUMN', 'NAMES', 'HERE', ]
    }

    dynamoClient.scan(params, function(err, data) {
      if (err) return reject(err)
      return resolve(data['Items'])
    })

  })
}

// Export functions
module.exports = {
  getRecords: () => getRecords(),
  createRecord: () => createRecord()
}