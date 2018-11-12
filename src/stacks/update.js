'use strict';

const aws = require('aws-sdk');
const cfn = new aws.CloudFormation({apiVersion: '2010-05-15'});

module.exports.update = (event, context, callback) => {
  const done = (err, res) => callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : JSON.stringify(res),
      headers: {
          'Content-Type': 'application/json',
      },
  });
  var body = JSON.parse(event.body);
  if (!body.StackName) {
    body.StackName = event.pathParameters.stackName;
  } else if (body.StackName != event.pathParameters.stackName){
    done(new Error(`Path Parameter StackName "${event.pathParameters.stackName}" is different from body StackName parameter " ${body.StackName}`));
  }
  cfn.updateStack(body, done);
};
