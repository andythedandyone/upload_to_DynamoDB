// by andythedandyone
// this script uploads local json data to DynamoDB
// to run: node loadfile.js
// make sure you have a json file name MOCK_DATA.json in the same folder
// or point the file in the variable localData


var jsonfile = require('jsonfile')
var AWS = require('aws-sdk')

AWS.config.update({
    region: "us-east-1"
})

var dClient = new AWS.DynamoDB.DocumentClient()
var localData = "./MOCK_DATA.json"
var dataArray = jsonfile.readFileSync(localData)
console.log("Preping to import all json data to DynamoDB")

dataArray.forEach(function(element) {   
    var params = {
        TableName: "dummyTable",
        Item: {
                'id': element.id,
                'first_name': element.first_name,
                'last_name': element.last_name,
                'email': element.email,
                'gender': element.gender,
                'ip_address': element.ip_address
            }
    }

    dClient.put(params, ((err, data) => {
        if (err) {
            console.log('something happened, didnt upload --->>>', err)
        } else {
            console.log('yeahhh dummy data uploaded to dynamodb', params)
        }
    }))

}, this);

