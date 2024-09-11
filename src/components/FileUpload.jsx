/* eslint-disable react/prop-types */
import { useEffect } from "react";

const FileUpload = ({ handleFileUpload, currentFile, label }) => {
  const handleFileChange = (event) => {
    handleFileUpload(event.target.files[0]);
  };

  useEffect(() => {}, [currentFile]);

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">File Upload</h2>
      {label && <p className="text-sm text-gray-600 mb-4">{label}</p>}

      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100
                     mb-4"
      />

      {currentFile && (
        <p className="text-sm text-gray-600 mb-4">
          Selected file: {currentFile.name}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
