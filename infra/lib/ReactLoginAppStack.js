const { Stack, RemovalPolicy } = require('aws-cdk-lib');
const { s3 } = require('aws-cdk-lib/aws-s3');
const { s3Deploy } = require('aws-cdk-lib/aws-s3-deployment');

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
  }
}

module.exports = { ReactLoginAppStack }