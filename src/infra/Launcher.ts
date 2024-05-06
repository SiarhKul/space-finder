import {App} from "aws-cdk-lib";
import {DataStack} from "./stacks/DataStack";
import {LambdaStack} from "./stacks/LambdaStack";
import {ApiStack} from "./stacks/ApiStack";
import {AuthCognitoStack} from "./stacks/AuthCognitoStack";

const app: App = new App()

const DBTableStack:DataStack = new DataStack(app, 'DataStack')

const lambdaStack: LambdaStack = new LambdaStack(app, 'LambdaStack',{
    spaceTable: DBTableStack.spacesTable
});

new AuthCognitoStack(app,"AuthCognitoStack")

new ApiStack(app, "ApiStack", {spacesLambdaIntegration: lambdaStack.spacesLambdaIntegration})

