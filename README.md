# lambda-cloudwatch-slack
Amazon Lambda to receive alerts from CloudWatch and post to Slack.

## What is This?
It's an Amazon lambda script that receives data from Amazon CloudWatch via, then posts that result over to Slack.
Just configure the javascript file and set it in Lambda, then you are good to go.

## How to Use
### Alarm configuration
In `handler.js`, you will find `ALARM_CONFIG`, which is the config for your alarms.
You can set different configs for different alarm conditions, depending on the
*subject of* the CloudWatch notification.

| name | description |
|:-----------|:------------|
| condition | The script will match the CloudWatch's subject for this value |
| channel | Which channel to post to |
| mention | any mentions you will want to direct it at |
| color | color of the sidebar when posted in slack |
| severity | Optional text indicating the severity, just displayed in the message |

### Slack configuration
In `handler.js`, you will find `SLACK_CONFIG`, which is the config for you Slack.
Set the correct values in this.

| name | description |
|:-----------|:------------|
| path | The path of your webhook URL. |


If you have trouble finding the above,
Go here to set up your *Incoming Webbhook* integration for Slack,
https://api.slack.com/incoming-webhooks
Then find your *Webhook URL*. The configs will be:
```
https://hooks.slack.com/{path}
```

### Amazon CloudWatch configuration
Set whatever CloudWatch you want in your CloudWatch settings.
Be sure to remember the SNS topic you send the alarms to.

### Amazon Lambda configuration
1. In the Lambda console panel, create a new Lambda function. Set the name to be whatever you want it to be.
2. For the code of the Lambda function, copy and paste the `handler.js` file.
3. After you have created the function, select *add event sources* for the Lambda function.
4. In the event sources, select *SNS* and select the topic for which you've created on CloudWatch.

That is all. You should be receiving CloudWatch alerts on your Slack.

## Testing, Debugging
When you want to debug/test your Lambda function, try using my `lambda-local` NPM.
It's a command-line tool that let's you execute Lambda functions on your local machine.
https://github.com/ashiina/lambda-local

## License
This library is released under the MIT license.
