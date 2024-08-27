import React, { useState } from "react";
import { FiUpload, FiFilm, FiHash, FiTag } from "react-icons/fi";
import { uploadVideo } from "../App/ApiSlice";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UploadForm() {
  const [name, setName] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [percentage, setPercentage] = useState("");
  const [videoNumber, setVideoNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setLoading(true);

    try {
      const response = await uploadVideo(
        name,
        videoNumber,
        file,
        heading,
        description,
        percentage
      );
      console.log("Response:", response.message);

      if (response.message === "Video number already exists") {
        toast.error(response.message);
        return;
      }

      toast.success("Upload successful!");
      setName("");
      setHeading("");
      setDescription("");
      setPercentage("");
      setVideoNumber("");
      setFile(null);
    } catch (error) {
      toast.error("Failed to upload video.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Upload Video
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FiFilm className="inline mr-2" />
              Video Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="heading"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FiFilm className="inline mr-2" />
              Video Heading
            </label>
            <input
              type="text"
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <FiFilm className="inline mr-2" />
            Video Description
          </label>
          <ReactQuill
            id="description"
            value={description}
            onChange={setDescription}
            className="w-full h-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="percentage "
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FiTag className="inline mr-2" />
              Video Percentage
            </label>
            <input
              type="text"
              id="tagpercentage s"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="videoNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FiHash className="inline mr-2" />
              Video Number
            </label>
            <input
              type="number"
              id="videoNumber"
              value={videoNumber}
              onChange={(e) => setVideoNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <FiUpload className="inline mr-2" />
            Upload Video
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            accept="video/*"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            "Uploading..."
          ) : (
            <>
              <FiUpload className="mr-2" /> Upload Video
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
