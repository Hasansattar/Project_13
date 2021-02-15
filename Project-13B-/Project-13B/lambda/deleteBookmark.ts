const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function deleteBook(bookId: string) {
    const params = {
        TableName: process.env.BOOKMARK_TABLE,
        Key: {
            id: bookId
        }
    }
    try {
        await docClient.delete(params).promise()
        return bookId
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null
    }
}

export default deleteBook;