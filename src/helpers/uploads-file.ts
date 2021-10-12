import { join } from 'path';
import * as fs from 'fs';

export const createUploadsFile = () => {
  const uploadsFolder = join(process.cwd(), 'uploads');
  !fs.existsSync(uploadsFolder) &&
    fs.mkdirSync(uploadsFolder, { recursive: true });
};
