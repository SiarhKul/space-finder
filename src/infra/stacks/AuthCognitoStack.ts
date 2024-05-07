import {CfnOutput, Stack, StackProps} from "aws-cdk-lib";
import {CfnUserPoolGroup, UserPool, UserPoolClient} from "aws-cdk-lib/aws-cognito";
import {Construct} from "constructs";

export class AuthCognitoStack extends Stack {

  public userPool!: UserPool;
  private userPoolClient!: UserPoolClient;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.createUserPool();
    this.createUserPoolClient();
    this.createAdminsGroup()
  }

  private createUserPool() {
    this.userPool = new UserPool(this, 'SpaceUserPool', {
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true
      }
    });

    new CfnOutput(this, 'SpaceUserPoolId', {
      value: this.userPool.userPoolId
    })
  }

  private createUserPoolClient(): void {
    this.userPoolClient = this.userPool.addClient('SpaceUserPoolClient', {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true
      }
    });
    new CfnOutput(this, 'SpaceUserPoolClientId', {
      value: this.userPoolClient.userPoolClientId
    })
  }

  private createAdminsGroup(): void {
    new CfnUserPoolGroup(this, "SpaceAdmins", {
      userPoolId: this.userPool.userPoolId,
      groupName: 'admins'
    })
  }
}
