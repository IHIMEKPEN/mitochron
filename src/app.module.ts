import { Module } from '@nestjs/common';
import { ChatGateway , TalkController  } from './controllers';
import { TalkService, } from './services';

@Module({
  imports: [],
  controllers: [TalkController],
  providers: [TalkService,ChatGateway],
})
export class AppModule {}
