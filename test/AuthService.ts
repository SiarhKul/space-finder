import {Amplify, Auth} from "aws-amplify";
import {type CognitoUser} from "@aws-amplify/auth";

Amplify.configure({
    Auth: {
        region: 'eu-central-1',
        userPoolArn: 'eu-central-1_KsPTLTTb7',
        userPoolWebClientId: '7mc3b84baub4o43jrgsja8ad4q',
        authenticationFlowType: 'USER_PASSWORD_AUTH'

    }
})

export class AuthService {
    public async login(useName: string, password: string) {

        const result: CognitoUser = await Auth.signIn(useName, password) as CognitoUser
        return result
    }
}
