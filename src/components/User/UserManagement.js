import { poolConfig } from "../config/awsConfig";

var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

function getPool() {
  return new AmazonCognitoIdentity.CognitoUserPool(poolConfig);
}

function handleAttributes(attributes) {
  let result = [];
  attributes.forEach((attribute) => {
    result.push(new AmazonCognitoIdentity.CognitoUserAttribute(attribute));
  });
  return result;
}

export function SignUp(userName, password, attributes = []) {

  attributes = handleAttributes(attributes);

  let userPool = getPool();
  userPool.signUp(userName, password, attributes, null, function (err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return "";
    }
    else{
      alert("Successfully registered!");
      return "/blogs";
    }
  });

  return "";
}

export function login(userName, password) {
  // return true;
  var authenticationData = {
    Username: userName,
    Password: password,
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  let userPool = getPool();

  var userData = {
    Username: "username",
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();
      console.log(accessToken);
      return true;
    },

    onFailure: function (err) {
      alert(err.message || JSON.stringify(err));
      return false;
    },
  });

  return false;
}
