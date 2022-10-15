import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  async upload(file: any, folderName: string) {
    let { originalname } = file;
    originalname = Date.now().toString() + originalname;
    const bucketS3 = 'swai-s3bucket';
    return await this.uploadS3(
      file.buffer,
      bucketS3,
      `${folderName}/${originalname}`,
    );
  }

  async uploadS3(file: File, bucket: string, name: string) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err: any, data: any) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESSKEYID,
      secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    });
  }
}
