const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
import Lolly from './Lolly';

async function addLolly(lollys: Lolly) {
    const params = {
        TableName: process.env.VIRTUAL_LOLLY_TABLE,
        Item: lollys
    }
    try {
        await docClient.put(params).promise();
        return lollys;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}

export default addLolly;