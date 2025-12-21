"use client";

import httpService from "@/services/http.service";
import { leftProfileFormService } from "@/services/profile.service";
import { UserType } from "@/types/entity.types";
import { ResponseReturnType } from "@/types/service.types";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

export default function ImageUploadModal({ isOpen, onClose, setUser }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      const res = await httpService.post<ResponseReturnType>(
        "/upload",
        formData
      );

      await leftProfileFormService({ image: res.data.result.url });

      setUser((prev) => {
        if (!prev) return prev;
        return { ...prev, image: res.data.result.url };
      });

      onClose(); // close modal on success
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Upload Profile Image</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
