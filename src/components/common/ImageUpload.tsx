"use client";

import httpService from "@/services/http.service";
import { leftProfileFormService } from "@/services/profile.service";
import { UserType } from "@/types/entity.types";
import { ResponseReturnType } from "@/types/service.types";
import { Dispatch, SetStateAction, useState } from "react";

export default function ImageUpload({
  setUser,
}: {
  setUser: Dispatch<SetStateAction<UserType | null>>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
        if (!prev) return prev; // or return null

        return {
          ...prev,
          image: res.data.result.url,
        };
      });
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
