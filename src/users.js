"use strict";

const ULID = require('ulid');
const AWS = require('aws-sdk');

const store = async (event) => {
  const body = JSON.parse(Buffer.from(event.body, 'base64').toString());
  const db = new AWS.DynamoDB.DocumentClient();

  const record = {
    _id: ULID.ulid(),
    name: body.name,
    email: body.email,
    createdAt: new Date().toISOString()
  }

  await db.put({
    TableName: process.env.DYNAMODB_USER_TABLE,
    Item: record
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      ok: true,
      errors: null
    },null,2)
  }
}

const index = async () => {
  const db = new AWS.DynamoDB.DocumentClient();
  const {Items: users} = await db.scan({
    TableName: process.env.DYNAMODB_USER_TABLE
  }).promise();

  return {
    ok: true,
    data: users
  }
}

const show = async (event) => {
  const {id} = event.pathParameters;
  const db = new AWS.DynamoDB.DocumentClient();
  const response = await db.get({
    TableName: process.env.DYNAMODB_USER_TABLE,
    Key: {
      _id: id
    }
  }).promise();
  console.log(response);
  return {
    ok: true,
    data: response.Item
  }
}

const update = async (event) => {
  const {id} = event.pathParameters;
  const body = JSON.parse(Buffer.from(event.body, 'base64').toString());
  const db = new AWS.DynamoDB.DocumentClient();
  const response = await db.update({
    TableName: process.env.DYNAMODB_USER_TABLE,
    Key: {_id:id},
    UpdateExpression: 'set email = :e, #n = :n',
    ExpressionAttributeNames: {'#n' : 'name'}, // porque name es keyword en dynamodb ver links.init seccion keywords-dynamodb
    ExpressionAttributeValues: {
      ':e': body.email,
      ':n': body.name,
    },
    ReturnValues: 'ALL_NEW'
  }).promise();
  console.log(response);
  return {
    ok: true,
    data: response.Attributes
  }
}

const destroy = async (event) => {
  const {id} = event.pathParameters;
  const db = new AWS.DynamoDB.DocumentClient();
  const response = await db.delete({
    TableName: process.env.DYNAMODB_USER_TABLE,
    Key: {
      _id: id
    }
  }).promise();
  console.log(response);
  return {
    statusCode: 204
  }
}

module.exports = {
  store,
  index,
  show,
  destroy,
  update
}