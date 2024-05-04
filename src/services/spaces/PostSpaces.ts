import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {DynamoDBClient, PutItemCommand, PutItemCommandOutput} from "@aws-sdk/client-dynamodb";
import {v4} from "uuid";

export async function postSpaces(event: APIGatewayProxyEvent, dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    console.log("=>(PostSpaces.ts:6) event", event);
    const randomId = v4()
    const item = JSON.parse(event.body)
    item.id = randomId


    const result: PutItemCommandOutput = await dbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
            id: {S: randomId},
            location: {S: item.location}
        }
    }))
    console.log("=>(PostSpaces.ts:19) result", result);

    return {
        statusCode: 201,
        body: JSON.stringify({id: randomId})
    }
}
/*
{
  '$metadata': {
    httpStatusCode: 200,
    requestId: '0HS5R16N3T7EHT3DJ18S7JD9EVVV4KQNSO5AEMVJF66Q9ASUAAJG',
    extendedRequestId: undefined,
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  }
}
* */
