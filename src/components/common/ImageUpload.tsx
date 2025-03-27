import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { uploadImage, deleteImage } from '@/lib/api/upload';

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  onError?: (error: string) => void;
}

export default function ImageUpload({ value, onChange, onError }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedKey, setUploadedKey] = useState<string>();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    try {
      setIsUploading(true);
      
      // Delete previous image if exists
      if (uploadedKey) {
        await deleteImage(uploadedKey);
      }

      const file = acceptedFiles[0];
      const { url, key } = await uploadImage(file);
      
      setUploadedKey(key);
      onChange?.(url);
    } catch (error) {
      console.error('Upload error:', error);
      onError?.(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  }, [onChange, onError, uploadedKey]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={isUploading} />
        
        {value ? (
          <div className="relative w-full aspect-video">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="py-8">
            {isDragActive ? (
              <p className="text-indigo-600">이미지를 여기에 놓으세요</p>
            ) : (
              <p className="text-gray-600">
                이미지를 드래그하거나 클릭하여 업로드하세요
                <br />
                <span className="text-sm text-gray-500">
                  (최대 5MB, JPEG, PNG, GIF, WebP)
                </span>
              </p>
            )}
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
            <div className="loading-spinner" />
          </div>
        )}
      </div>
    </div>
  );
} 