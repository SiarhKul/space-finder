import {DynamoDBClient, ScanCommand} from "@aws-sdk/client-dynamodb";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";

export async function getSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const result = await ddbClient.send(new ScanCommand({
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
