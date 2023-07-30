const { Stack, RemovalPolicy } = require('aws-cdk-lib');
const { s3 } = require('aws-cdk-lib/aws-s3');

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
  }
}

module.exports = { ReactLoginAppStack }