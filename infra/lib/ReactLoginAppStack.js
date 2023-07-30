const { Stack, RemovalPolicy } = require("aws-cdk-lib");
const { s3 } = require("aws-cdk-lib/aws-s3");
const { s3Deploy } = require("aws-cdk-lib/aws-s3-deployment");
const {
  Distribution,
  ViewerProtocolPolicy,
} = require("aws-cdk-lib/aws-cloudfront");
const { S3Origin } = require("aws-cdk-lib/aws-cloudfront-origins");

class ReactLoginAppStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const storageBucket = new s3.Bucket(this, "LoginApp", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    new s3Deploy.BucketDeployment(this, "DeployToBucket", {
      destinationBucket: storageBucket,
      sources: [s3Deploy.Source.asset("./resources/build")],
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
  }
}

module.exports = { ReactLoginAppStack };
