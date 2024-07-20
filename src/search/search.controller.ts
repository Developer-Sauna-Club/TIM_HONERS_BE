import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('users/:query')
  findUsers(@Param('query') query: string) {
    return this.searchService.findUsers(query);
  }

  @Get('all/:query')
  findAll(@Param('query') query: string) {
    return this.searchService.findAll(query);
  }
}
