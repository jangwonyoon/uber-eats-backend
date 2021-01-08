import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Podcast } from './entities/podcasts.entity';
import { CreatePodcastDto } from './dtos/create-podcasts.dto';
import { Episodes } from './entities/episodes.entity';
import { Param } from '@nestjs/common';

@Resolver((of) => Podcast)
export class PodcastResolver {
  @Query((returns) => [Podcast])
  getPodcasts(@Param('id') Podcast: boolean): Podcast[] {
    console.log(Podcast);
    return [];
  }

  @Mutation((_) => Boolean)
  createPodcast(@Param() createPodcast: CreatePodcastDto): boolean {
    console.log(createPodcast);
    return true;
  }
}

@Resolver((of) => Episodes)
export class EpisodeResolver {
  @Query((returns) => [Episodes])
  getEpisodes(@Param('id') episodeId: number): Episodes[] {
    return [];
  }
}
