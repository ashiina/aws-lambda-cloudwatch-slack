console.log('[Amazon CloudWatch Notification]');

/*
 configuration for each condition.
 add any conditions here
*/
var ALARM_CONFIG = [
	{
		condition: "INFO",
		channel: "#test",
		mention: " ",
		color: "#FF9F21",
		severity: "INFO"
	},
	{
		condition: "CRITICAL",
		channel: "#general",
		mention: "<@channel> ",
		color: "#F35A00",
		severity: "CRITICAL"
	}
];

var SLACK_CONFIG = {
	token: "YOUR_TOKEN",
	team: "YOUR_TEAM"
};

var http = require ('https');
var querystring = require ('querystring');
exports.handler = function(event, context) {
	console.log(event.Records[0]);

	// parse information
	var message = event.Records[0].Sns.Message;
	var subject = event.Records[0].Sns.Subject;
	var timestamp = event.Records[0].Sns.Timestamp;

	// vars for final message
	var channel;
	var severity;
	var color;

	// create post message
	var alarmMessage = " *[Amazon CloudWatch Notification]* \n"+
	"Subject: "+subject+"\n"+
	"Message: "+message+"\n"+
	"Timestamp: "+timestamp;

	// check subject for condition
	for (var i=0; i < ALARM_CONFIG.length; i++) {
		var row = ALARM_CONFIG[i];
		console.log(row);
		if (subject.match(row.condition)) {
			console.log("Matched condition: "+row.condition);

			alarmMessage = row.mention+" "+alarmMessage+" ";
			channel = row.channel;
			severity = row.severity;
			color = row.color;
			break;
		}
	}

	if (!channel) {
		console.log("Could not find condition.");
		context.done('error', "Invalid condition");
	}

	var payloadStr = JSON.stringify({
	"attachments": [
		{
			"fallback": alarmMessage,
			"text": alarmMessage,
			"mrkdwn_in": ["text"],
			"username": "AWS-CloudWatch-Lambda-bot",
			"fields": [
				{
					"title": "Severity",
					"value": severity,
					"short": true
				}
			],
			"color": color
		}
	],
		"channel":channel
	});
	var postData = querystring.stringify({
	  "payload": payloadStr
	});
	console.log(postData);
	var options = {
		hostname: SLACK_CONFIG.team + ".slack.com",
		port: 443,
		path: '/services/hooks/incoming-webhook?token='+SLACK_CONFIG.token,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': postData.length
		}
	};

	var req = http.request(options, function(res) {
		console.log("Got response: " + res.statusCode);
		res.on("data", function(chunk) {
			console.log('BODY: '+chunk);
			context.done(null, 'done!');
		});
	}).on('error', function(e) {
		context.done('error', e);
	});
	req.write(postData);
	req.end();
};

