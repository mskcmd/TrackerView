import multer from "multer";
import AWS from 'aws-sdk';

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadSingleVideo = upload.single('videofile');

export default uploadSingleVideo;


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const s3 = new AWS.S3()

interface UploadedFile {
  originalname: string,
  buffer: Buffer,
  mimetype: string
}

const uploadFiles = async (file: UploadedFile): Promise<string> => {

  const params = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: `uploads/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    // ACL: 'public-  ',
  };

  try {
    const data = await s3.upload(params).promise();
    const url = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${data.Key}`;
    return url;
  } catch (error) {
    console.error('S3 upload error:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred during file upload');
    }
  }

}

export { uploadFiles };