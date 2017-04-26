# Cloudwatch Slack Alarms

An Amazon Lambda that receive alarm notifications from CloudWatch and posts to Slack. Based on [this](https://github.com/ashiina/aws-lambda-cloudwatch-slack). This listens to an SNS topic called `alarms-production` (or `alarms-staging`), to which Cloudwatch notifications are posted.

## Environment Variables

The following environment variables need to be set:

| name | description |
|:-----------|:------------|
| COCO_ALARMS_SLACK_HOOK | The hook URL for your Slack [Incoming Webhook integration](https://api.slack.com/incoming-webhooks). Something like `https://hooks.slack.com/{path}`. |

## Deployment

* To deploy to staging, commit and push your changes. Your changes will automatically be applied by CircleCI once merged to master.

* To deploy to production, create a new release either through GitHub, or via the command line: `git tag release-[name]` then `git push origin release-[name]`
