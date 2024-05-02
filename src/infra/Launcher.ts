import {App} from "aws-cdk-lib";
import {DataStack} from "./stacks/DataStack";

const app:App = new App()


new DataStack(app,'DataStack')
