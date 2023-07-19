const { Stack, CfnOutput, RemovalPolicy } = require("aws-cdk-lib");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const cognito = require("aws-cdk-lib/aws-cognito");
const { iam } = require("aws-cdk-lib/aws-iam");
const s3 = require("aws-cdk-lib/aws-s3");
const { Distribution, ViewerProtocolPolicy } = require("aws-cdk-lib/aws-cloudfront");
const s3deployment = require("aws-cdk-lib/aws-s3-deployment");
const { S3Origin } = require("aws-cdk-lib/aws-cloudfront-origins");
// const sqs = require('aws-cdk-lib/aws-sqs');

class GatewayStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // const fn = new lambda.Function(this, "MyFunction", {
    //   runtime: lambda.runtime.PYTHON_3_9,
    //   handler: "index.handler",
    //   code: lambda.Code.fromAsset(path.join(__dirname, "lambda-handler")),
    // });

    const FirstBucket = new s3.Bucket(this, "FirstBucket", {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      // publicReadAccess: true,
      // websiteIndexDocument: 'index.html',
      // websiteErrorDocument: 'index.html',
    });

    // const distribution = new Distribution(this, "CloudfrontDistribution", {
    //   defaultBehavior: {
    //     origin: new S3Origin(FirstBucket),
    //   },
    //   defaultRootObject: "index.html",
    //   errorResponses: [
    //     {
    //       httpStatus: 404,
    //       responseHttpStatus: 200,
    //       responsePagePath: "/index.html",
    //     },
    //   ],
    // });

    new s3deployment.BucketDeployment(this, "deployReact", {
      sources: [s3deployment.Source.asset("./resources/build")],
      destinationBucket: FirstBucket,
      // distribution,
      // distributionPaths: ["/*"],
    });

    // new CfnOutput(this, "CloudFrontURL", {
    //   value: distribution.domainName,
    //   description: "The distribution URL",
    //   exportName: "CloudfrontURL",
    // });

    // const FirstPool = new cognito.UserPool(this, "myuserpool", {
    //   userPoolName: "FirstPool",
    //   selfSignUpEnabled: true,
    //   signInAliases: {
    //     username: true,
    //     email: true,
    //     phone: true,
    //   },
    //   signInCaseSensitive: false,
    // });

    // const auth = new apigateway.CognitoUserPoolsAuthorizer(
    //   this,
    //   "booksAuthorizer",
    //   {
    //     cognitoUserPools: [FirstPool],
    //   }
    // );

    // const FirstGateway = new apigateway.RestApi(this, "first-api");
    // FirstGateway.root.addMethod(
    //   "GET",
    //   // new apigateway.HttpIntegration("https://"+distribution.domainName),
    //   new apigateway.HttpIntegration("https://"+distribution.domainName),
    //   {
    //     authorizer: auth,
    //     authorizationType: apigateway.AuthorizationType.COGNITO,
    //   }
    // );
    

    // FirstPool.addClient('FirstClient', {

    // });

  }
}

module.exports = { GatewayStack };
