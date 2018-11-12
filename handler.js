'use strict';

const aws = require('aws-sdk');
const cfn = new aws.CloudFormation({apiVersion: '2010-05-15'});

module.exports.cloudFormationStack = (event, context, callback) => {
  const done = (err, res) => callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : JSON.stringify(res),
      headers: {
          'Content-Type': 'application/json',
      },
  });
  switch (event.httpMethod) {
      case 'DELETE':
        //cfn.deleteStack(JSON.parse(event.body), done);
        cfn.deleteStack({ StackName: event.queryStringParameters.StackName }, done);
        break;
      case 'GET':
        cfn.describeStacks({ StackName: event.queryStringParameters.StackName }, done);
        break;
      case 'POST':
        var validate = event.queryStringParameters.Validate;
        if (validate) {
          cfn.validateTemplate(JSON.parse(event.body), done);
        } else {
          cfn.createStack(JSON.parse(event.body), done);
        }
        break;
      case 'PUT':
        cfn.updateStack(JSON.parse(event.body), done);
        break;
      default:
        done(new Error(`Unsupported method "${event.httpMethod}"`));
  }
};
