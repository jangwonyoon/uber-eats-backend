import { Module } from '@nestjs/common';
import { PodcastResolver } from './podcasts.resolver';

@Module({
  providers: [PodcastResolver],
})
export class PodcastsModule {}
