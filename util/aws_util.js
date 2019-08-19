

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const userPoolId = require("../config").UserPoolId;
const clientId = require("../config").ClientId;
const region = require("../config").Region;

const poolData = {    
    UserPoolId : userPoolId,   
    ClientId : clientId
    }; 
const pool_region = region;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.init=function init()
{
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    console.log(poolData.UserPoolId);
}

function RegisterUser(){
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:"Prasad Jayashanka"})); 
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:"sampleEmail@gmail.com"}));

    userPool.signUp('sampleEmail@gmail.com', 'SamplePassword123', attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}

exports.Login= function Login(inputUsername,inputPassword,cb) {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : inputUsername,
        Password : inputPassword,
    });

    var userData = {
        Username : inputUsername,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());
            cb("Login success");
        },
        onFailure: function(err) {
        
            console.log(err.message);
            console.log(inputUsername);
            console.log(inputPassword);
        },

    });
}