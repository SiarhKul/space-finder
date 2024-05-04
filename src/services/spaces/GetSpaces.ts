import {DynamoDBClient, GetItemCommand, ScanCommand} from "@aws-sdk/client-dynamodb";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {GetItemCommandOutput, ScanCommandOutput} from "@aws-sdk/client-dynamodb/dist-types/commands";

export async function getSpaces(e: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if (e.queryStringParameters) {
        if ('id' in e.queryStringParameters) {
            const spaceId: string | undefined = e.queryStringParameters['id'];

            const getItemResponse = await ddbClient.send(new GetItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    'id': {S: spaceId}
                } as any
            }));

            if (getItemResponse.Item) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(getItemResponse.Item)
                }
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify(`Space with id ${spaceId}} not found`)
                }
            }
        } else {
            return {
                statusCode: 201,
                body: JSON.stringify('Id required')
            }
        }
    }

    const result: ScanCommandOutput = await ddbClient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME,
    }));

    console.log(result);

    return {
        statusCode: 201,
        body: JSON.stringify(result.Items)
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
