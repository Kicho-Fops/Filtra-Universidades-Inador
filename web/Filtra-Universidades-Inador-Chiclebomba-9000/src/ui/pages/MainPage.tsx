import DropText from "../components/DropText";
import Dropzone from "../components/Dropzone";
import { Box } from "@chakra-ui/react";

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
      {/* 
          Estado 1. Pagina de bienvenida que acepta drop de archivos
            - El archivo que sea haya subido sea .xlsx
            - Pop up de error si no es .xlsx
          Estado 2. Muestra un icono de carga mientras se hace la query a la base de datos
          Estado 3. Muestra una tabla de resultado
        
        
        */}
      <Dropzone>
        <DropText />
      </Dropzone>
    </Box>
  );
}

export default MainPage;
