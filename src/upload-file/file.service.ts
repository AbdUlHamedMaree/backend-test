import { FileUpload } from 'graphql-upload';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDocument, FileModel } from './file.model';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { nanoid } from 'nanoid';
@Injectable()
export class FileService {
  constructor(
    @InjectModel(FileModel.name) private fileModel: Model<FileDocument>,
  ) {}

  writeFile({ createReadStream, filename, encoding, mimetype }: FileUpload) {
    return new Promise((resolve, reject) => {
      const newFilename = `/${nanoid()}_${filename}`;
      return createReadStream()
        .pipe(createWriteStream(join(process.cwd(), `uploads/${newFilename}`)))
        .once('finish', () => {
          const createdPatient = new this.fileModel({
            path: `/${newFilename}`,
            filename,
            encoding,
            mimetype,
          });

          return resolve(createdPatient.save());
        })
        .once('error', (err) => {
          console.error(err);
          reject(false);
        });
    });
  }
}
