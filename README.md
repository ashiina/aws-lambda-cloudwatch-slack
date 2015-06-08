# lambda-cloudwatch-slack
Amazon Lambda to receive data from CloudWatch and post to Slack.

## What is This? 
It's an Amazon lambda script that receives data from Amazon CloudWatch via, then posts that result over to Slack. 
Just configure the javascript file and set it in Lambda, then you are good to go.

## How to Use
### Configuration
#### Alarm configuration
In `handler.js`, you will find `ALARM_CONFIG`, which is the config for your alarms. 
You can set different configs for different alarm conditions, depending on the 
*subject of* the CloudWatch notification.

 |----|----|
 | condition | The script will match the CloudWatch's subject for this value | 
 | channel | Which channel to post to |
 | mention | any mentions you will want to direct it at |
 | color | color of the sidebar when posted in slack | 
 | severity | Optional text indicating the severity, just displayed in the message |
 |----|----|



