const { Stack, RemovalPolicy } = require("aws-cdk-lib");
const { s3, Bucket} = require("aws-cdk-lib/aws-s3");
const { BucketDeployment, Source } = require("aws-cdk-lib/aws-s3-deployment");
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

    const storageBucket = new Bucket(this, "LoginApp", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
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
      destinationBucket: storageBucket,
      sources: [Source.asset("./resources/build")],
      distribution: FrontEndDistribution,
      distributionPaths: ["/*"],
    });
    
  }
}

module.exports = { ReactLoginAppStack };
