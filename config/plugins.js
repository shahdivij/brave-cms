module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-aws-s3',
      providerOptions: {
        baseUrl: env('AWS_CLOUDFRONT_URL'),
        rootPath: env('AWS_S3_PREFIX', 'media'),
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
          },
          region: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET'),
          },
        },
      },
    },
  },
});
