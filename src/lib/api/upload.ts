import axios from 'axios';

export interface UploadResponse {
  url: string;
  key: string;
}

export async function uploadImage(file: File): Promise<UploadResponse> {
  try {
    // 1. Get pre-signed URL
    const { data: presignedUrl } = await axios.get('/api/upload/presigned');

    // 2. Upload to S3
    await axios.put(presignedUrl.url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    // 3. Return the final URL
    return {
      url: presignedUrl.publicUrl,
      key: presignedUrl.key,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteImage(key: string): Promise<void> {
  try {
    await axios.delete(`/api/upload/${key}`);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
} 