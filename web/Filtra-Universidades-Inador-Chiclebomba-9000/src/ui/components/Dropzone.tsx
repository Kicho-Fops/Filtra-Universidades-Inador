import { Box } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import React, {useCallback} from 'react';

interface DropzoneProps {
  children: React.ReactNode;
}

function Dropzone({ children }: DropzoneProps) {


  interface File {
    path: string;
    size: number;
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({onDrop});

  

  


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
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dropzone;
