import {DynamoDBClient, GetItemCommand, ScanCommand} from "@aws-sdk/client-dynamodb";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {GetItemCommandOutput, ScanCommandOutput} from "@aws-sdk/client-dynamodb/dist-types/commands";
import {unmarshall} from "@aws-sdk/util-dynamodb";

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
                const unmashrrredItem = unmarshall(getItemResponse.Item)

                const newVar = {
                    statusCode: 200,
                    body: JSON.stringify(unmashrrredItem)
                };
                return newVar
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
    const unmashaledItems = result.Items?.map(item => unmarshall(item))

    return {
        statusCode: 201,
        body: JSON.stringify(unmashaledItems)
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
