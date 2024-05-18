import {App} from "aws-cdk-lib";
import {MonitorStack} from "../../src/infra/stacks/MonitorStack";
import {Capture, Match, Template} from "aws-cdk-lib/assertions";

describe('Initial test suite', () => {
  let monitorStackTemplate: Template;

  beforeAll(() => {
      const app = new App({
        outdir: 'cdk.out'
      })

      const monitorStack = new MonitorStack(app, 'MonitorStack');
      monitorStackTemplate = Template.fromStack(monitorStack)
    }
  )

  test('Lambda properties', () => {
    monitorStackTemplate.hasResourceProperties('AWS::Lambda::Function', {
      "Handler": "index.handler",
      "Runtime": "nodejs18.x"
    })
    // arrange step
    // act step
    // assert step
    expect(true).toBeTruthy();
  });
  test('SNS Topic properties', () => {
    monitorStackTemplate.hasResourceProperties('AWS::SNS::Topic', {
      "DisplayName": "AlarmTopic",
      "TopicName": "AlarmTopic"
    })

    expect(true).toBeTruthy();
  });
  test('SNS Subscriptions', () => {
    monitorStackTemplate.hasResourceProperties('AWS::SNS::Subscription',
      Match.objectEquals({
        Endpoint: {
          "Fn::GetAtt": [
            Match.stringLikeRegexp("webHookLambda"),
            "Arn"
          ]
        },
        Protocol: "lambda",
        TopicArn: {
          Ref: Match.stringLikeRegexp("AlarmTopic")
        }
      }))

    expect(true).toBeTruthy();
  });
  test('SNS Subscriptions.JS apporch', () => {
    const snsTopic = monitorStackTemplate.findResources('AWS::SNS::Topic')
    const snsName = Object.keys(snsTopic)[0]

    monitorStackTemplate.hasResourceProperties('AWS::SNS::Subscription',
      Match.objectEquals({
        Endpoint: {
          "Fn::GetAtt": [
            Match.stringLikeRegexp("webHookLambda"),
            "Arn"
          ]
        },
        Protocol: "lambda",
        TopicArn: {
          Ref: snsName
        }
      }))
  })
  test('Alarm actions', () => {
    const alarmActionsCapture = new Capture()
    monitorStackTemplate.hasResourceProperties("AWS::CloudWatch::Alarm", {
      AlarmActions: alarmActionsCapture
    })
    // [ { Ref: 'AlarmTopicD01E77F9' } ]
    const alrm = alarmActionsCapture.asArray()

    expect(alrm).toEqual([{
      Ref: expect.stringMatching(/^AlarmTopic/)
    }])
  })

  // test('Monitor stack snapshot',()=>{
  //   expect(monitorStackTemplate.toJSON()).toMatchSnapshot()
  // })

  test('SNS topic snapshot',()=>{
  const topic=  monitorStackTemplate.findResources("AWS::SNS::Topic")

    expect(topic).toMatchSnapshot()
  })
})
