import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function FileDropzone({ id, category }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Create a new FormData object to send the files to the API
      const formData = new FormData();

      // Append each file to the formData
      acceptedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Make a POST request to your specific API endpoint for this category
      axios
        .post(`YOUR_API_ENDPOINT/${id}/${category}`, formData)
        .then((response) => {
          // Handle the API response here
          console.log(
            `Files uploaded successfully for category ${category}:`,
            response.data
          );
        })
        .catch((error) => {
          // Handle any errors that occur during the upload
          console.error(
            `Error uploading files for category ${category}:`,
            error
          );
        });
    },
    [category]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf,image/*", // Specify the allowed file types
  });

  return (
    <div {...getRootProps()} className="file-dropzone">
      <input {...getInputProps()} />
      <p>
        Drag & drop PDF files for category {category} here, or click to select
        files
      </p>
    </div>
  );
}

export default FileDropzone;
