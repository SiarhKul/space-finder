import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {postSpaces} from "./PostSpaces";
import {getSpaces} from "./GetSpaces";
import {updateSpace} from "./UpdateSpace";
import {deleteSpace} from "./DeleteSpace";
import {JSONError, MissingFieldError} from "../shared/DataValidator";
import {addCORSHeader} from "../shared/Utils";

const dynamoDBClient: DynamoDBClient = new DynamoDBClient({})

async function handler(event: APIGatewayProxyEvent, context: Context):Promise<APIGatewayProxyResult> {

  let response: APIGatewayProxyResult={
    statusCode: 500,
    body: JSON.stringify("Internal Server Error.Resp")
  }

  try {
    switch (event.httpMethod) {
      case 'GET':
        const getResponse: APIGatewayProxyResult = await getSpaces(event, dynamoDBClient);
        response = getResponse
        break;
      case 'POST':
        const postResponse: APIGatewayProxyResult = await postSpaces(event, dynamoDBClient)
        response = postResponse
        break;
      case 'PUT':
        const putResponse: APIGatewayProxyResult = await updateSpace(event, dynamoDBClient)
        response = putResponse
        break;
      case "DELETE":
        const deleteResponse: APIGatewayProxyResult = await deleteSpace(event, dynamoDBClient);
        response = deleteResponse;
        break;
      // message = 'Hello from POST!'
      default:
        break;
    }

  } catch (error) {
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message)
      }
    }

    if (error instanceof JSONError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message)
      }
    }

    const err = error as any
    return {
      statusCode: 500,
      body: JSON.stringify(err.message)
    }
  }

  addCORSHeader(response)
  return response
}

export {handler}
/*event

 {
  resource: '/space',
  path: '/space',
  httpMethod: 'POST',
  headers: {
    Accept: '*',
'Accept-Encoding': 'gzip, deflate, br',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-ASN': '6697',
    'CloudFront-Viewer-Country': 'BY',
    'Content-Type': 'application/json',
    Host: '791c80nm53.execute-api.eu-central-1.amazonaws.com',
    'Postman-Token': '09853c49-c4f7-41e8-84d1-53bd86ca99af',
    'User-Agent': 'PostmanRuntime/7.37.3',
    Via: '1.1 4123e89e0fc83589e2324128a6b4b23e.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'BBmdNqlGpAYb2YCmDyzZn0MYzhHQLVoL-p7Qij896FS_Rs1DGcn1zA==',
    'X-Amzn-Trace-Id': 'Root=1-6635fc4d-055d98d0004772c40fc79283',
    'X-Forwarded-For': '37.214.54.213, 15.158.38.75',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https'
},
multiValueHeaders: {
    Accept: [ '*' ],
        'Accept-Encoding': [ 'gzip, deflate, br' ],
        'CloudFront-Forwarded-Proto': [ 'https' ],
        'CloudFront-Is-Desktop-Viewer': [ 'true' ],
        'CloudFront-Is-Mobile-Viewer': [ 'false' ],
        'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
        'CloudFront-Is-Tablet-Viewer': [ 'false' ],
        'CloudFront-Viewer-ASN': [ '6697' ],
        'CloudFront-Viewer-Country': [ 'BY' ],
        'Content-Type': [ 'application/json' ],
        Host: [ '791c80nm53.execute-api.eu-central-1.amazonaws.com' ],
        'Postman-Token': [ '09853c49-c4f7-41e8-84d1-53bd86ca99af' ],
        'User-Agent': [ 'PostmanRuntime/7.37.3' ],
        Via: [
        '1.1 4123e89e0fc83589e2324128a6b4b23e.cloudfront.net (CloudFront)'
    ],
        'X-Amz-Cf-Id': [ 'BBmdNqlGpAYb2YCmDyzZn0MYzhHQLVoL-p7Qij896FS_Rs1DGcn1zA==' ],
        'X-Amzn-Trace-Id': [ 'Root=1-6635fc4d-055d98d0004772c40fc79283' ],
        'X-Forwarded-For': [ '37.214.54.213, 15.158.38.75' ],
        'X-Forwarded-Port': [ '443' ],
        'X-Forwarded-Proto': [ 'https' ]
},
queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: {
    resourceId: '8tgik4',
        resourcePath: '/space',
        httpMethod: 'POST',
        extendedRequestId: 'XPRcNEByliAEU5A=',
        requestTime: '04/May/2024:09:13:49 +0000',
        path: '/prod/space',
        accountId: '653045635854',
        protocol: 'HTTP/1.1',
        stage: 'prod',
        domainPrefix: '791c80nm53',
        requestTimeEpoch: 1714814029810,
        requestId: '8af8d6be-0e5c-4f9b-8237-d23c2853b9e3',
        identity: {
        cognitoIdentityPoolId: null,
            accountId: null,
            cognitoIdentityId: null,
            caller: null,
            sourceIp: '37.214.54.213',
            principalOrgId: null,
            accessKey: null,
            cognitoAuthenticationType: null,
            cognitoAuthenticationProvider: null,
            userArn: null,
            userAgent: 'PostmanRuntime/7.37.3',
            user: null
    },
    domainName: '791c80nm53.execute-api.eu-central-1.amazonaws.com',
        deploymentId: '0c669k',
        apiId: '791c80nm53'
},
body: '{\n    "location":"Paris"\n}',
    isBase64Encoded: false
}
*/
