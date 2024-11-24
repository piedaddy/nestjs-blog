import { registerAs } from '@nestjs/config';

//first arg is namespace
export default registerAs('database', () => ({
  //process is fine here but no where else basically
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
}));
