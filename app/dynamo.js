var AWS = require('aws-sdk')
var initialData = require('./initial_data')

// Remember to change the region specified here if you aren't on eu-west-1 !!
AWS.config.update({
  endpoint: 'https://dynamodb.eu-west-1.amazonaws.com',
  region: 'eu-west-1'
})

// Authentication for AWS is automatically done through ENV variables

const dynamoDB = new AWS.DynamoDB
const docClient = new AWS.DynamoDB.DocumentClient()

const table = 'test_table'

/**
 * Create table using the schema from table.js. 
 * This method is only called if no table
 * with the name 'test_table' exists
 */
const createTable = (params) => {
  return new Promise((resolve, reject) => {
    dynamoDB.createTable(params, (err, data) => {
      if (err) return reject(err)

      //Table is being created, wait for the table to be created before we try adding any data to it
      dynamoDB.waitFor('tableExists', {TableName: table}, (err, data) => {
        if (err) console.log('waitFor error' + err, err.stack)
        else {
          //Good to go, the table is ready to take in data
          initialData.forEach(item => createRecord(item)
          .then(result => console.log('Adding item' + item))
          .catch(err => console.error('Error happened while creating record ' + err)))
        }
      })
        return resolve(data)
    })
  })
}

/**
 * Check if a table exists
 */
const isTable = (tableName) => {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: table
    }
    
    dynamoDB.describeTable(params, (err, data) => {
      if (err) return reject(false)
      return resolve(true)
    })    
  })
}


// Create a new row on the DynamoDB table
const createRecord = (record) => {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: table,
      Item: record
    }

    docClient.put(params, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })

  })
}

// Get all of the records from DynamoDB table
const getRecords = () => {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: table,
      AttributesToGet: ['id', 'name']
    }

    docClient.scan(params, (err, data) => {
      if (err) return reject(err)
      return resolve(data['Items'])
    })

  })
}

// Export functions
module.exports = {
  getRecords,
  createRecord,
  isTable,
  createTable,
  table,
}