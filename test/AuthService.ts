import type {CognitoUser} from '@aws-amplify/auth';
import {Amplify, Auth} from 'aws-amplify';
import {CognitoIdentityClient} from "@aws-sdk/client-cognito-identity";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers"

const awsRegion = 'eu-central-1'
Amplify.configure({
  Auth: {
    region: awsRegion,
    userPoolId: 'eu-central-1_KsPTLTTb7',
    userPoolWebClientId: '7mc3b84baub4o43jrgsja8ad4q',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    identityPoolId: 'eu-central-1:f3306170-bdf1-4cdc-9858-bce226559aeb'
  }
});


export class AuthService {
  public async login(userName: string, password: string) {
    const result = await Auth.signIn(userName, password) as CognitoUser;
    return result;
  }

  public async generateTemporaryCredentials(user: CognitoUser) {
    const jwtToken: string | undefined = user.getSignInUserSession()?.getIdToken().getJwtToken()
    const cognitoIdentityPool: string = `cognito-idp.${awsRegion}.amazonaws.com/eu-central-1_KsPTLTTb7`
    const cognitoIdentity: CognitoIdentityClient = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        identityPoolId: 'eu-central-1:f3306170-bdf1-4cdc-9858-bce226559aeb',
        logins: {
          [cognitoIdentityPool]: jwtToken ?? ''
        }
      })

    })
    const credantions = await cognitoIdentity.config.credentials()
    return credantions
  }


}
