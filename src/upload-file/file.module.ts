import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './file.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [FileResolver, FileService],
})
export class FileModule {}
