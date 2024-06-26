import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaIntegration,
  MethodOptions,
  Resource, ResourceOptions,
  RestApi
} from "aws-cdk-lib/aws-apigateway";
import {IUserPool} from "aws-cdk-lib/aws-cognito";

interface ApiStackProps extends StackProps {
  spacesLambdaIntegration: LambdaIntegration
  userPool: IUserPool
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api: RestApi = new RestApi(this, 'SpacesApi')

    const authorizer: CognitoUserPoolsAuthorizer = new CognitoUserPoolsAuthorizer(this, 'SpaceApiAuthorizer', {
      cognitoUserPools: [props.userPool],
      identitySource: 'method.request.header.Authorization'
    })
    authorizer._attachToApi(api)

    const optionsWithAuth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.authorizerId
      }
    }

    const optionsWithCORS: ResourceOptions = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS
      }
    }

    const spaceResource: Resource = api.root.addResource('space', optionsWithCORS)

    spaceResource.addMethod("GET", props.spacesLambdaIntegration, optionsWithAuth)
    spaceResource.addMethod("POST", props.spacesLambdaIntegration, optionsWithAuth)
    spaceResource.addMethod("PUT", props.spacesLambdaIntegration, optionsWithAuth)
    spaceResource.addMethod("DELETE", props.spacesLambdaIntegration, optionsWithAuth)
  }
}
