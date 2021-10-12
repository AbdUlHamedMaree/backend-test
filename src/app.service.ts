import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
<!DOCTYPE html>
<html lang='en' dir='ltr'>
  <head>
    <meta charset='UTF-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Abd Ul-Hameed Maree Back-end Test</title>
  </head>
  <body>
    <a href='http://localhost:3000/graphql'>go to apollo server</a>
  </body>
</html>
`;
  }
}
