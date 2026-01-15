import { useState } from "react";

export function useThumbnailUpload(initialThumbnail?: string | null) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingThumbnail, setExistingThumbnail] = useState<string | null>(
    initialThumbnail || null
  );

  const setNewThumbnail = (file: File) => {
    setFile(file);
    setExistingThumbnail(null); // clear old one automatically
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    setExistingThumbnail(null);
  };

  return {
    file,
    preview,
    existingThumbnail,
    setNewThumbnail,
    removeImage,
  };
}
