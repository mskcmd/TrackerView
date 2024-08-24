export interface IVideo extends Document {
    name: string;
    videoNumber: number;
    videoFile: string; // We'll store the S3 URL or file path as a string
  }