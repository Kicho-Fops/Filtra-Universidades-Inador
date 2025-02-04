import DropText from "../components/DropText";
import Dropzone from "../components/Dropzone";
import { Box, Text } from "@chakra-ui/react";

function MainPage() {
    return (
      <Box
        h="100vh"
        w="100vw"
        
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        m="0"
        
      >
        <Dropzone>
          <DropText />
        </Dropzone>
      </Box>
    );
  }

export default MainPage;
