import {App} from "aws-cdk-lib";
import {DataStack} from "./stacks/DataStack";
import {LambdaStack} from "./stacks/LambdaStack";
import {ApiStack} from "./stacks/ApiStack";
import {AuthCognitoStack} from "./stacks/AuthCognitoStack";
import {UiDeploymentStack} from "./stacks/UiDeploymentStack";

const app: App = new App()

const dataStack: DataStack = new DataStack(app, 'DataStack')

const lambdaStack: LambdaStack = new LambdaStack(app, 'LambdaStack', {
    spaceTable: dataStack.spacesTable
});

const authCognitoStack: AuthCognitoStack = new AuthCognitoStack(
    app, "AuthCognitoStack", {photosBucket: dataStack.photosBucket}
);

new ApiStack(app, "ApiStack", {
    userPool: authCognitoStack.userPool,
    spacesLambdaIntegration: lambdaStack.spacesLambdaIntegration})

new UiDeploymentStack(app, 'UiDeploymentStack')
