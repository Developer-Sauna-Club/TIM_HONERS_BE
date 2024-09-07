import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { PostsModule } from './posts/posts.module';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ImageModule } from './image/image.module';
import { FollowModule } from './follow/follow.module';
import { SettingsModule } from './settings/settings.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
      expandVariables: true,
      isGlobal: true,
    }),
    HelloModule,
    PostsModule,
    SearchModule,
    AuthModule,
    UsersModule,
    ImageModule,
    FollowModule,
    SettingsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
