# Coco Slack Alarm

An Amazon Lambda that receive alarm notifications for Coco from CloudWatch and posts to Slack. Based on [this](https://github.com/ashiina/aws-lambda-cloudwatch-slack). This depends on an SNS topic called `coco-alarms`, to which Cloudwatch notifications are posted.

## Environment Variables

The following environment variables need to be set:

| name | description |
|:-----------|:------------|
| SLACK_HOOK | The hook URL for your Slack [Incoming Webhook integration](https://api.slack.com/incoming-webhooks). Something like `https://hooks.slack.com/{path}`. |

## Deployment

To deploy a new version of this, merge to master.
