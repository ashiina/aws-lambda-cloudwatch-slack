var ALARM_CONFIG = [
	{
		condition: "INFO",
		channel: "coco-alarms",
		mention: " ",
		color: "#FF9F21",
		severity: ":information_desk_person:"
	},
	{
		condition: "CRITICAL",
		channel: "coco-alarms",
		mention: "<@channel> ",
		color: "#F35A00",
		severity: ":skull_and_crossbones:"
	}
];

var SLACK_CONFIG = {
	path: process.env.COCO_ALARMS_SLACK_HOOK,
};

var http = require ('https');
var querystring = require ('querystring');

exports.handler = function(event, context) {

	// parse information
	var message = event.Records[0].Sns.Message;
	var subject = event.Records[0].Sns.Subject;

	// vars for final message
	var channel;
	var severity;
	var color;

	// create post message
	var alarmMessage = " :no_entry_sign: :robot_face: *[Amazon CloudWatch Notification]* \n"+ subject+"\n";

	// check subject for condition
	for (var i=0; i < ALARM_CONFIG.length; i++) {
		var row = ALARM_CONFIG[i];

		if (subject.match(row.condition)) {
			alarmMessage = alarmMessage;
			channel = row.channel;
			severity = row.severity;
			color = row.color;
			break;
		}
	}

	if (!channel) {
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

	var options = {
		hostname: "hooks.slack.com",
		port: 443,
		path: SLACK_CONFIG.path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': postData.length
		}
	};

	var req = http.request(options, function(res) {
		res.on("data", function(chunk) {
			context.done(null, 'done!');
		});
	}).on('error', function(e) {
		context.done('error', e);
	});

	req.write(postData);
	req.end();
};
