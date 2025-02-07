import { Box } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useState, useEffect } from "react";
import PopUp from "./GenericPopUp";

interface DropzoneProps {
  children: React.ReactNode;
}

interface File {
  path: string;
  size: number;
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

function Dropzone({ children }: DropzoneProps) {
  const { setIsError, isError } = useConfirmationDialog();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0].path.endsWith(".xlsx")) {
        console.log(acceptedFiles);
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
