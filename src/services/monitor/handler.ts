import {SNSEvent} from "aws-lambda";

const webHookUrl = 'https://hooks.slack.com/services/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'

 async function handler(event: SNSEvent, context:any) {

  for (const record of event.Records) {
    await fetch(webHookUrl, {
      method: "POST",
      body: JSON.stringify({
        "text": `SNS ${record.Sns.Message}`
      })
    })
  }
}

export {handler}
