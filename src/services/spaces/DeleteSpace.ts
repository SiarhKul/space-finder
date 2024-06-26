import {DeleteItemCommand, DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {hasAdminGroup} from "../shared/Utils";

export async function deleteSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  if (event.queryStringParameters && ('id' in event.queryStringParameters)) {

    if (!hasAdminGroup(event)) {
      return {
        statusCode: 401,
        body: JSON.stringify(`Not authorized!.Only Admins`)
      }
    }

    const spaceId: string | undefined = event.queryStringParameters['id'];

    await ddbClient.send(new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        'id': {S: spaceId} as any
      }
    }));

    const newVar = {
      statusCode: 200,
      body: JSON.stringify(`Deleted space with id ${spaceId}`)
    };
    return newVar

  }
  return {
    statusCode: 400,
    body: JSON.stringify('Please provide right args!!')
  }

}
