'use strict';

const aws = require('aws-sdk');
const cfn = new aws.CloudFormation({apiVersion: '2010-05-15'});

module.exports.get = (event, context, callback) => {
  const done = (err, res) => callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : JSON.stringify(res),
      headers: {
          'Content-Type': 'application/json',
      },
  });
  cfn.describeStacks({ StackName: event.pathParameters.stackName }, done);
};
