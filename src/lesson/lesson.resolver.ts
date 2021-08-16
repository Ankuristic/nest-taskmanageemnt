// import { Query } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: 'asdfghjuytr123456',
      name: 'physics class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
