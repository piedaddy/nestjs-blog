//  IF YOU DON'T WANT TO SEPARATE THIS INTO SEPARATE FILES
// export const appConfig = () => ({
//   environment: process.env.NODE_ENV || 'production',
//   database: {
//     //process is fine here but no where else basically
//     port: parseInt(process.env.DATABASE_PORT) || 5432,
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     name: process.env.DATABASE_NAME,
//     synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
//     autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
//   },
// });

//  AFTER SEPARATING THIS INTO SEPARATE FILES
import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  cloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  mailHost: process.env.MAIL_HOST,
  smtp_username: process.env.SMTP_USERNAME,
  smtp_password: process.env.SMTP_PASSWORD,
}));
