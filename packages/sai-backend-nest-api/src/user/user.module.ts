import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { FileUploadService } from '../utils/file-upload.service';
import { CustomLoggerService } from '../utils/logger.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://mqadmin:mqadmin@127.0.0.1:5672'],
          queue: 'deneme',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'TEST',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://mqadmin:mqadmin@127.0.0.1:5672'],
          queue: 'test',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserService, FileUploadService, CustomLoggerService],
})
export class UserModule {}
