import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

(async () => {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(graphqlUploadExpress({}));
  await app.listen(3000).then((r) => {
    console.log('Ready at http://localhost:3000');
    return r;
  });
})();
