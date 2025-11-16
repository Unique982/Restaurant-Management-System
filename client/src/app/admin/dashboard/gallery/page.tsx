"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface IPreview {
  file: File;
  url: string;
}

export default function AdminGalleryUpload() {
  const [files, setFiles] = useState<IPreview[]>([]);
  const [uploading, setUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFiles(selectedFiles);
  };

  // Upload files to backend
  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select files first");
    const formData = new FormData();
    files.forEach((f) => formData.append("images", f.file));

    try {
      setUploading(true);
      const res = await axios.post("/api/admin/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Images uploaded successfully!");
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Admin Gallery Upload</h1>

      {/* File Input */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2 rounded"
      />

      {/* Preview */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((f, index) => (
            <div key={index} className="border rounded overflow-hidden">
              <img
                src={f.url}
                alt="preview"
                className="w-full h-32 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <Button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Images"}
      </Button>
    </div>
  );
}
