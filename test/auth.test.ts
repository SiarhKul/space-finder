import {AuthService} from "./AuthService";
import {CognitoUser} from "@aws-amplify/auth";


async function testAuth():Promise<void> {
    const service:AuthService = new AuthService()
    const loginResult:CognitoUser = await service.login('sk', '1qaz@WSX')

    // console.log("=>(auth.test.ts:6) service", loginResult);
    console.log( loginResult.getSignInUserSession()?.getIdToken().getJwtToken());

}

testAuth().then(r => console.log(r))
