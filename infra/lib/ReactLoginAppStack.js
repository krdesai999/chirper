const { Stack, RemovalPolicy, CfnOutput } = require("aws-cdk-lib");
const { BlockPublicAccess, Bucket } = require("aws-cdk-lib/aws-s3");
const { BucketDeployment, Source } = require("aws-cdk-lib/aws-s3-deployment");
const {
  Distribution,
  ViewerProtocolPolicy,
} = require("aws-cdk-lib/aws-cloudfront");
const { S3Origin } = require("aws-cdk-lib/aws-cloudfront-origins");

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

    const storageBucket = new Bucket(this, "LoginApp", {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const FrontEndDistribution = new Distribution(
      this,
      "FrontEndDistribution",
      {
        defaultBehavior: {
          origin: new S3Origin(storageBucket),
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
          },
        ],
      }
    );

    new BucketDeployment(this, "DeployToBucket", {
      sources: [Source.asset(path)],
      destinationBucket: storageBucket,
      distribution: FrontEndDistribution,
      distributionPaths: ["/*"],
    });

    new CfnOutput(this, "FrontEndUrl", {
      value: FrontEndDistribution.domainName,
      description: "URL for the deployed react app",
      exportName: "FrontEndUrl",
    });
  }
}

module.exports = { ReactLoginAppStack };
