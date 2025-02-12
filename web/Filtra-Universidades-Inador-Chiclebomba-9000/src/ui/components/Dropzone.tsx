import { Box } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useState, useEffect } from "react";
import PopUp from "./GenericPopUp";

interface DropzoneProps {
  children: React.ReactNode;
  setIsLoading: (loading: boolean) => void;
  setUploadComplete: (complete: boolean) => void;
}



function useConfirmationDialog() {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => setIsError(false), 6000);
      return () => clearTimeout(timer); // Cleanup timeout on unmount or state change
    }
  }, [isError]);

  return { setIsError, isError };
}

function Dropzone({ children, setIsLoading, setUploadComplete }: DropzoneProps) {
  const { setIsError, isError } = useConfirmationDialog();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/v1/excel/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      console.log("Upload success:", data);
      setUploadComplete(true);
      localStorage.setItem("university_data", JSON.stringify(data));
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsError(true);
    } finally {
      setUploading(false);
      setIsLoading(false);
    }
  };





  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0].name.endsWith(".xlsx")) {
        console.log(acceptedFiles[0]);
        uploadFile(acceptedFiles[0]);
      } else {
        setIsError(true);
      }
    },
    [setIsError]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  // https://react-dropzone.js.org/

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  return (
    <>
      <Box
        // background={"rgb(151, 151, 151)"}

        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        m="0"
        {...getRootProps({ className: "dropzone" })}
      >
        <Box>
          <Box h="100vh" w="100vw" paddingTop={50} cursor={"pointer"}>
            <input {...getInputProps()} />
            {children}
            <PopUp
              message="Solo soporta archivos .xlsx"
              status="error"
              title="Error"
              isOpen={isError}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dropzone;
