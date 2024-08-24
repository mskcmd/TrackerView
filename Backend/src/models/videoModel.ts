import mongoose, { Document, Schema } from 'mongoose';

// Define the TypeScript interface for the Video
export interface IVideo extends Document {
  name: string;
  videoNumber: number;
  videoFile?: string;
  heading: string;
  description: string;
  percentage : string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the Video schema
const videoSchema: Schema<IVideo> = new Schema({
  name: {
    type: String,
    required: true,
  },
  videoNumber: {
    type: Number,
    required: true,
  },
  videoFile: {
    type: String,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  percentage : {
    type: String,
  },
}, {
  timestamps: true, 
});

const Video = mongoose.model<IVideo>('Video', videoSchema);

export default Video;
