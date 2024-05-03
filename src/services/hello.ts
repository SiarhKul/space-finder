import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {ListBucketsCommand, S3Client} from '@aws-sdk/client-s3'

const s3Client: S3Client = new S3Client({})

async function handler(e: APIGatewayProxyEvent, context: Context) {
    const command: ListBucketsCommand = new ListBucketsCommand({})
    const listBucketResult = (await s3Client.send(command)).Buckets


    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(`Hello! ${JSON.stringify(listBucketResult)}`)
    }
    console.log(e)
    console.log(context)

    return response
}

export {handler}

/*exports.main = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(`Hello! ${process.env.TABLE_NAME}`)
    }
}*/
