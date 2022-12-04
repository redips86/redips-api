import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";

BigInt.prototype['toJSON'] = function () {
  return this.toString();
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.ADMIN_END_URL);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: [process.env.ADMIN_END_URL, 'https://studio.apollographql.com'],
  });
  await app.listen(port);
  console.log(`Application listening on port ${port}`);
}

bootstrap();
