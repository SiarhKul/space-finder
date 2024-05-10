import {JSONError} from "./DataValidator";
import {randomUUID} from "node:crypto";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";

export function createRandomId() {
  return randomUUID()
}

export function addCORSHeader(arg: APIGatewayProxyResult) {
  if (!arg.headers) {
    arg.headers = {}
  }

  arg.headers['Access-Control-Allow-Origin'] = "*"
  arg.headers['Access-Control-Allow-Methods'] = "*"
}


export function parseJson(arg: string) {

  try {
    return JSON.parse(arg)
  } catch (error: any) {
    throw new JSONError(error.message)
  }
}

export function hasAdminGroup(event: APIGatewayProxyEvent) {
  console.log("API Gateway Proxy Event", event);

  /*  "cognito:groups": [
      "admins"
    ],*/
  const groups: [string] = event.requestContext.authorizer?.claims['cognito:groups'];
  if (groups) {
    return groups.includes('admins');
  }
  return false;
}
