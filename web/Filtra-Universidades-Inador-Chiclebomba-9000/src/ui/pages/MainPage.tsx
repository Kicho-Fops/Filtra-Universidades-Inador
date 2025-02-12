import DropText from "../components/DropText";
import Dropzone from "../components/Dropzone";
import { Box, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import Results from "../components/Results";
function MainPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  return (
    <Box h="100vh" w="100vw" display="flex" flexDirection="column" m="0">
      {isLoading ? (
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" />
        </Box>
      ) : uploadComplete ? (
        <Box
          p={6}
          pt={10}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          width="100%"
        >
          <Results />
        </Box>
      ) : (
        <Dropzone
          setIsLoading={setIsLoading}
          setUploadComplete={setUploadComplete}
        >
          <DropText />
        </Dropzone>
      )}
    </Box>
  );
}

export default MainPage;
