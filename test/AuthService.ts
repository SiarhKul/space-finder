import { type CognitoUser } from '@aws-amplify/auth';
import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'eu-central-1',
        userPoolId: 'eu-central-1_KsPTLTTb7',
        userPoolWebClientId: '7mc3b84baub4o43jrgsja8ad4q',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});



export class AuthService {


    public async login(userName: string, password: string) {
        const result = await Auth.signIn(userName, password) as CognitoUser;
        return result;
    }
}
