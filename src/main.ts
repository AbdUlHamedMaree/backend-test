import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({}));
  await app.listen(3000);
})();
