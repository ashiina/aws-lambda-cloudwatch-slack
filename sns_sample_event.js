module.exports = {
  Records:[
    {
      "EventSource": "aws:sns",
      "EventVersion": "1.0",
      "EventSubscriptionArn": "arn:aws:sns:EXAMPLE",
      "Sns": {
        "Type": "Notification",
        "MessageId": "xxxxx-xxx-xxx-xxxxxxxx",
        "TopicArn": "arn:aws:sns:EXAMPLE",
        "Subject": "ALARM: 'Elasticache-FreeableMemory-CRITICAL' in APAC - Tokyo",
        "Message": " {'AlarmName':'Elasticache-FreeableMemory-INFO','AlarmDescription':'Elasticache-FreeableMemory-INFO','AWSAccountId':'1234567890','NewStateValue':'ALARM','NewStateReason':'Threshold Crossed: 1 datapoint (8.60604416E8) was less than or equal to the threshold (1.0E9).','StateChangeTime':'1970-01-01T00:00:00.000+0000','Region':'APAC - Tokyo','OldStateValue':'OK','Trigger':{'MetricName':'FreeableMemory','Namespace':'AWS/ElastiCache','Statistic':'AVERAGE','Unit':null,'Dimensions':[],'Period':60,'EvaluationPeriods':1,'ComparisonOperator':'LessThanOrEqualToThreshold','Threshold':1.0E9}}",
        "Timestamp": "1970-01-01T00:00:00.000Z",
        "SignatureVersion": "1",
        "Signature": "EXAMPLE",
        "SigningCertUrl": "EXAMPLE",
        "UnsubscribeUrl": "EXAMPLE",
        "MessageAttributes": {
          "Test": {
            "Type": "String",
            "Value": "TestString"
          },
          "TestBinary": {
            "Type": "Binary",
            "Value": "TestBinary"
          }
        }
      }
    }
  ]
};
