/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const FileUpload = ({ handleFileUpload, currentFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    handleFileUpload(event.target.files[0]);
  };

  useEffect(() => {
    setSelectedFile(currentFile);
  }, [currentFile]);

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">File Upload</h2>

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

      {selectedFile && (
        <p className="text-sm text-gray-600 mb-4">
          Selected file: {selectedFile.name}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
