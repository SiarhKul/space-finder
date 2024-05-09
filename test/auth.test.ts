import {AuthService} from "./AuthService";
import {CognitoUser} from "@aws-amplify/auth";
import {ListBucketsCommand, S3Client} from "@aws-sdk/client-s3";


async function testAuth(): Promise<void> {
  const service: AuthService = new AuthService()
  const loginResult: CognitoUser = await service.login('sk', '1qaz@WSX')

  const credantions = await service.generateTemporaryCredentials(loginResult)
  const jwtToken = loginResult.getSignInUserSession()?.getIdToken().getJwtToken()
  const buckets = await _listBuckets(credantions)

  console.log('JWT_TOKEN', jwtToken);
  console.log('CREDANTIONS', credantions)
  console.log("LIST_buckets", buckets);
}

async function _listBuckets(credantions: any) {
  const client = new S3Client({
    credentials: credantions
  })

  const command = new ListBucketsCommand({})
  const result = await client.send(command)
  return result;
}

testAuth().then(r => console.log(r))
