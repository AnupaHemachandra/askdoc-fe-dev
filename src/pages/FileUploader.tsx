import { useState } from "react";
import axiosClient from "../api/axiosClient";

interface Props {
  categoryId: number;
}

interface FileStatus {
  id: number;
  status: string;
}

const FileUploader: React.FC<Props> = ({ categoryId }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      // Build metadata payload
      const fileMetadata = Array.from(files).map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
      }));

      // Step 1: Get presigned URLs from backend
      const res = await axiosClient.post("/document/generate-presigned", {
        files: fileMetadata,
        category_id: categoryId,
      });

      const urls = res.data.urls || [];

      // 3️⃣ Track all results here
      const fileStatusList: FileStatus[] = [];

      // Step 2: Upload each file to returned URL
      await Promise.all(
        urls.map(async (urlData: any, index: number) => {
          const file = files[index];
          const uploadUrl = urlData.url;
          const fileId = urlData.file_id;

          try {
            const uploadRes = await fetch(uploadUrl, {
              method: "PUT",
              headers: { "Content-Type": file.type },
              body: file,
            });

            console.log(uploadRes);

            if (uploadRes.ok) {
              console.log(`${file.name} uploaded successfully`);
              fileStatusList.push({ id: fileId, status: "UPLOADED" });
            } else {
              console.error(`Upload failed for ${file.name}`);
              fileStatusList.push({ id: fileId, status: "UPLOAD_FAILED" });
            }
          } catch (error) {
            console.error(`Error uploading ${file.name}:`, error);
            fileStatusList.push({ id: fileId, status: "UPLOAD_FAILED" });
          }
        })
      );

      // 5️⃣ Once all uploads done → send batch update
      if (fileStatusList.length > 0) {
        await axiosClient.patch("/document/update-file-status", {
          files: fileStatusList,
        });
        console.log("Statuses updated:", fileStatusList);
      }

      alert("All files uploaded successfully.");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3 shadow">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="text-gray-300"
      />
      <button
        onClick={handleUpload}
        disabled={uploading || !files?.length}
        className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white text-sm disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </button>
    </div>
  );
};

export default FileUploader;