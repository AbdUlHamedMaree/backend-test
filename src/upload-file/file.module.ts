import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from './file.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }]),
  ],
  providers: [FileResolver, FileService],
})
export class FileModule {}
