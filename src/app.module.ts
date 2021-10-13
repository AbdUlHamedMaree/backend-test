import { Module, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ApolloServerPluginInlineTrace,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './upload-file/file.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { IncomingMessage } from 'http';
import { AUTH_COOKIE_KEY } from './constants';
import { getCookie } from './utils/get-cookie';
import { getJwtPayload } from './utils/get-jwt-payload';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './role/role.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: process.env.PUBLIC_FILES_PREFIX,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/backend-test'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      cors: {
        origin: 'https://studio.apollographql.com',
        credentials: true,
      },
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
        ApolloServerPluginInlineTrace(),
      ],
      context: ({ req, res }) => ({ req, res }),
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onDisconnect: () => {
            console.log('some one disconnected!!!');
          },
          onConnect: (_, __, connectionContext) => {
            console.log('some one connect to the socket');
            try {
              const user = getJwtPayload(
                getCookie(
                  (connectionContext.request as IncomingMessage).headers.cookie,
                  AUTH_COOKIE_KEY,
                ),
              );
              console.log('Connected User:', user);
              return { user };
            } catch (err) {
              console.error(err);
              throw new UnauthorizedException();
            }
          },
        },
      },
    }),
    FileModule,
    UserModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule {}
