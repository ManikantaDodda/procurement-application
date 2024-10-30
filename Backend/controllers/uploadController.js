import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream"; 

const profileUploader = async (buffer) => {
  try {
    const profileBuffer = buffer;
    console.log(profileBuffer);
    const result = await uploadImageFromBuffer(profileBuffer);
    return result.url;

  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const uploadImageFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    // Create a readable stream from the buffer
    const bufferStream = Readable.from(buffer);

    // Upload the image
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "groupchat" },
      async(error, result) => {
        if (error) {
          console.error('Upload Error:', error);
          return reject(error);
        }
        console.log('Upload Result:', result);
        resolve(result);
      }
    );

    // Pipe the buffer stream to the upload stream
    bufferStream.pipe(uploadStream);
  });
};






export { profileUploader };
