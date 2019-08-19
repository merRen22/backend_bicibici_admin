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

exports.Login2 = function (body, callback) {
    var userName = body.user_name;
    var password = body.password;
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
         Username: userName,
         Password: password
     });
     var userData = {
         Username: userName,
         Pool: userPool
     }
     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
     cognitoUser.authenticateUser(authenticationDetails, {
         onSuccess: function (result) {
            var accesstoken = result.getAccessToken().getJwtToken();
            callback(null, accesstoken);
         },
         onFailure: function (err) {
             console.log("ERROR AUTENTIFICACION AWS");
             console.log(authenticationDetails.Username);
             console.log(authenticationDetails.Password);
             console.log(err.message);
            callback(err);
        } ,
        newPasswordRequired: function(userAttributes, requiredAttributes) {
            // User was signed up by an admin and must provide new 
            // password and required attributes, if any, to complete 
            // authentication.

            // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user. 
            // Required attributes according to schema, which don’t have any values yet, will have blank values.
            // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.

            
            // Get these details and call 
            // newPassword: password that user has given
            // attributesData: object with key as attribute name and value that the user has given.
            var newPassword = "Admin1234.";
            var attributesData = "";
            cognitoUser.completeNewPasswordChallenge(newPassword, attributesData, this);
            callback(null);
         }
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

exports.getCurrentUser = function (callback){
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        
        cognitoUser.getSession(function(err, session) {
            if (err) {
                console.log("error current user");
                console.log(err.message);
                callback(err);
            }
            console.log('session validity: ' + session.isValid());
            console.log(session.Name);
            callback(session.Name);
        });

    }
}



