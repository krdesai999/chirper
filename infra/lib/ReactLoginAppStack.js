const { Stack, RemovalPolicy, CfnOutput, SecretValue } = require("aws-cdk-lib");
const { BlockPublicAccess, Bucket } = require("aws-cdk-lib/aws-s3");
const { BucketDeployment, Source } = require("aws-cdk-lib/aws-s3-deployment");
const {
  Distribution,
  ViewerProtocolPolicy,
} = require("aws-cdk-lib/aws-cloudfront");
const { S3Origin } = require("aws-cdk-lib/aws-cloudfront-origins");
const { UserPool } = require("aws-cdk-lib/aws-cognito");
const { App, GitHubSourceCodeProvider } = require("@aws-cdk/aws-amplify-alpha");
const config = require("../config.js");

const path = "./resources/build";
class ReactLoginAppStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const usersPool = new UserPool(this, "Users", {
      userPoolName: "Users",
      signInCaseSensitive: false,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
        username: true,
      },
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireDigits: true,
      },
    });

    const userPoolID = usersPool.userPoolId;

    // Client ID
    const client = usersPool.addClient("ReactApp");
    const clientID = client.userPoolClientId;

    const amplifyApp = new App(this, "Front-end-app", {
      description: "Frontend Code",
      sourceCodeProvider: new GitHubSourceCodeProvider({
        owner: config.githubConfig.owner,
        repository: config.githubConfig.repository,
        oauthToken: SecretValue.unsafePlainText(config.githubConfig.oauthToken),
      }),
      environmentVariables: {
        CLIENT_ID: clientID,
        USER_POOL_ID: userPoolID
      },
    });

    // amplifyApp.addBranch(config.githubConfig.productionBranch);
    amplifyApp.addBranch(config.githubConfig.testBranch);

    // const storageBucket = new Bucket(this, "LoginApp", {
    //   blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    //   removalPolicy: RemovalPolicy.DESTROY,
    //   autoDeleteObjects: true,
    // });

    // const FrontEndDistribution = new Distribution(
    //   this,
    //   "FrontEndDistribution",
    //   {
    //     defaultBehavior: {
    //       origin: new S3Origin(storageBucket),
    //       viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    //     },
    //     defaultRootObject: "index.html",
    //     errorResponses: [
    //       {
    //         httpStatus: 404,
    //         responseHttpStatus: 200,
    //         responsePagePath: "/index.html",
    //       },
    //     ],
    //   }
    // );

    // new BucketDeployment(this, "DeployToBucket", {
    //   sources: [Source.asset(path)],
    //   destinationBucket: storageBucket,
    //   distribution: FrontEndDistribution,
    //   distributionPaths: ["/*"],
    // });

    new CfnOutput(this, "FrontEndUrl", {
      // value: FrontEndDistribution.domainName,
      value: amplifyApp.defaultDomain,
      description: "URL for the deployed react app",
      exportName: "FrontEndUrl",
    });
  }
}

module.exports = { ReactLoginAppStack };
