import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { FileModel } from './file.model';
import { FileService } from './file.service';

@Resolver(() => FileModel)
export class FileResolver {
  constructor(private fileService: FileService) {}

  @Mutation(() => FileModel)
  async uploadFile(
    @Args('file', { type: () => GraphQLUpload })
    fileUpload: FileUpload,
  ) {
    return this.fileService.writeFile(fileUpload);
  }
}
