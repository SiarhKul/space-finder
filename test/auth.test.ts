import {AuthService} from "./AuthService";
import {CognitoUser} from "@aws-amplify/auth";


async function testAuth(): Promise<void> {
  const service: AuthService = new AuthService()
  const loginResult: CognitoUser = await service.login('sk', '1qaz@WSX')

  // console.log("=>(auth.test.ts:6) service", loginResult);
  const jwtToken = loginResult.getSignInUserSession()?.getIdToken().getJwtToken()
  console.log('JWT_TOKEN',jwtToken);

  const credantions = await service.generateTemporaryCredentials(loginResult)
  console.log('CREDANTIONS', credantions)
}

testAuth().then(r => console.log(r))
