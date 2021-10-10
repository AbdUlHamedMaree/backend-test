import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { File } from './file.model';
import { FileService } from './file.service';

@Resolver(() => File)
export class FileResolver {
  constructor(private fileService: FileService) {}

  @Mutation(() => File)
  async uploadFile(
    @Args('file', { type: () => GraphQLUpload })
    fileUpload: FileUpload,
  ) {
    return this.fileService.writeFile(fileUpload);
  }
}
