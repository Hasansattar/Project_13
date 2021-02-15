const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
import Bookmark from './Bookmark';

async function addBooK(bookmarks: Bookmark) {
    const params = {
        TableName: process.env.BOOKMARK_TABLE,
        Item: bookmarks
    }
    try {
        await docClient.put(params).promise();
        return bookmarks;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}

export default addBooK;