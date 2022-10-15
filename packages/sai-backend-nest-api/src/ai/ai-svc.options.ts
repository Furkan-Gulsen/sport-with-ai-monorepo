import { join } from 'path';
import { Transport, ClientOptions } from '@nestjs/microservices';

export const UsersServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `localhost:5000`,
    package: 'ai_service',
    protoPath: join(__dirname, '../_proto/users.proto'),
    loader: {
      enums: String,
      objects: true,
      arrays: true,
    },
  },
};
