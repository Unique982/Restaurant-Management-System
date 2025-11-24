"use client";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchGallery,
  addImages,
  deleteGallery,
} from "@/lib/store/image/gallerySlice";
import toast from "react-hot-toast";
import { Status } from "@/lib/types/type";
import { openConfirmDeleteToast } from "@/components/ConfirmToast/ConfirmToast";

interface IPreview {
  file: File;
  url: string;
  id: number;
}

const createUniqueId = () => Date.now() + Math.random();
const FILE_INPUT_ID = "gallery-file-upload";
const MAX_FILES = 20;
export default function AdminGalleryUpload() {
  const dispatch = useAppDispatch();
  const { data: dbImages, status } = useAppSelector((state) => state.gallery);

  const [files, setFiles] = useState<IPreview[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);
  // upload
  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select images to upload first.");
      return;
    }

    setUploading(true);

    try {
      for (const f of files) {
        const formData = new FormData();
        formData.append("image", f.file);

        const result: any = await dispatch(addImages(formData));
        if (!result.success) toast.error(result.message || "Upload failed");
      }

      setFiles([]);
      dispatch(fetchGallery()); // refresh gallery
      // refresh gallery
    } catch (err: any) {
      toast.error(err?.message || "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const selectedFiles = Array.from(e.target.files);
      const spaceRemaining = MAX_FILES - files.length;
      let filesToProcess = selectedFiles.slice(0, spaceRemaining);

      const newFiles = filesToProcess.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        id: createUniqueId(),
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      e.target.value = "";
    },
    [files]
  );

  const handleRemoveFile = useCallback(
    (idToRemove: number) => {
      const fileToRemove = files.find((f) => f.id === idToRemove);
      setFiles((prev) => prev.filter((f) => f.id !== idToRemove));
      if (fileToRemove) URL.revokeObjectURL(fileToRemove.url);
    },
    [files]
  );

  const handleRemoveDbImage = async (id: string | number) => {
    openConfirmDeleteToast({
      message: "Do you really want to delete this gallery image?",
      onConfirm: () => dispatch(deleteGallery(id)),
    });
  };

  const spaceRemaining = MAX_FILES - files.length;

  return (
    <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-10 space-y-8 bg-gray-50 min-h-screen">
      <header className="border-b-4 border-orange-500 pb-3 mb-6">
        <h1 className="text-4xl font-black text-gray-900 flex items-center">
          Gallery Management 📸
        </h1>
        <p className="text-gray-500 mt-1">
          Upload and manage images for the public gallery.
        </p>
      </header>

      {/* Upload Section */}
      <section className="p-4 bg-white rounded-xl border border-gray-100 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <label
            htmlFor={FILE_INPUT_ID}
            className={`cursor-pointer font-semibold py-2 px-4 rounded-xl transition duration-300 shadow-md text-center text-white text-base ${
              spaceRemaining > 0
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {spaceRemaining > 0
              ? `Select Images (Max ${spaceRemaining} remaining)`
              : "Max Files Selected (20/20)"}
          </label>

          <Input
            id={FILE_INPUT_ID}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={spaceRemaining === 0}
            className="hidden"
          />

          <Button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition duration-300"
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin mr-2 w-5 h-5" /> Uploading...
              </>
            ) : (
              `Upload ${files.length} Image(s) to Server`
            )}
          </Button>
        </div>

        {files.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              New Files Selected for Upload
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md group"
                >
                  <div className="h-40 sm:h-40 bg-gray-100">
                    <img
                      src={f.url}
                      alt={f.file.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-2 text-xs border-t">
                    <p
                      className="font-semibold text-gray-800 truncate"
                      title={f.file.name}
                    >
                      {f.file.name}
                    </p>
                    <p className="text-gray-500 mt-1">
                      {(f.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleRemoveFile(f.id)}
                    className="absolute top-2 right-2 bg-orange-600 hover:bg-red-700 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold shadow-xl opacity-80 transition duration-200"
                    aria-label={`Remove ${f.file.name}`}
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {files.length === 0 && !uploading && (
        <section className="text-center p-12 border-4 border-dashed border-gray-300 rounded-2xl bg-white/50">
          <p className="text-xl font-medium text-gray-500">
            📂 Click **Select Images** above to choose files for upload.
          </p>
        </section>
      )}

      {/* Gallery Section */}
      <section className="p-4 bg-white rounded-xl border border-gray-100 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          Current Gallery Images ({dbImages.length})
        </h2>

        {status === Status.LOADING ? (
          <div className="text-center p-10 text-gray-500">
            <Loader2 className="animate-spin mx-auto w-8 h-8 mb-4" />
            <p>Loading existing images...</p>
          </div>
        ) : dbImages.length === 0 ? (
          <div className="text-center p-10 border border-dashed rounded-lg text-gray-500">
            No images have been uploaded to the gallery yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4">
            {dbImages.map(
              (img) =>
                img &&
                img.image && (
                  <div
                    key={img.id}
                    className="relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-[1.02] transition duration-300 group"
                  >
                    <div className="h-40 bg-gray-100">
                      <img
                        src={img.image}
                        alt={`Gallery image ${img.id}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-3 text-xs border-t bg-gray-50">
                      <p
                        className="font-semibold text-gray-800 truncate"
                        title={img.createdAt}
                      >
                        {new Date(img.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveDbImage(img.id)}
                      className="absolute top-2 right-2 p-1 w-8 h-8 rounded-full text-xs shadow-xl transition duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                      aria-label={`Delete gallery image ${img.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )
            )}
          </div>
        )}
      </section>
    </div>
  );
}
