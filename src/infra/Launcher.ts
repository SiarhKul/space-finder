import {App} from "aws-cdk-lib";
import {DataStack} from "./stacks/DataStack";
import {LambdaStack} from "./stacks/LambdaStack";
import {ApiStack} from "./stacks/ApiStack";

const app: App = new App()

const DBTableStack:DataStack = new DataStack(app, 'DataStack')
console.log("=>(Launcher.ts:9) DBTableStack", DBTableStack);
const lambdaStack: LambdaStack = new LambdaStack(app, 'LambdaStack',{
    spaceTable: DBTableStack.spacesTable
});
new ApiStack(app, "ApiStack", {helloLambdaIntegration: lambdaStack.helloLambdaIntegration})
