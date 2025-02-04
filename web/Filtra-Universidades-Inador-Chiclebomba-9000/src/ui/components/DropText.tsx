import { Box, Text } from "@chakra-ui/react";
import React from "react";

function DropText()  {
  return (
    <>
      <Box
      
      >

{/* 
   |\ /|
  /_^ ^_\
    \v/
*/}


        <Box
            p={6}
            paddingTop={20}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text fontSize="4xl" fontWeight="bold">
              Bienvenido
            </Text>
            <Text fontSize="lg">Esta es una página en la que puedes subir</Text>
            <Text fontSize="lg">
              tu archivo CSV para filtrar las universidades que
            </Text>
            <Text fontSize="lg">tengas en tu lista de opciones.</Text>

            <Box p="40px" />

            <Text fontSize="lg">Esta página esta pensada para estudiantes</Text>
            <Text fontSize="lg">del Tecnológico de Monterrey</Text>
            <Text fontSize="lg">por el formato especifico del archivo</Text>
            <Text fontSize="lg">que se debe subir</Text>
            
            <Box p="60px" />
            <Text textStyle="6xl" fontWeight="bold">Arrastra un archivo, o haz click en cualquier parte de la pagina</Text>
            <Text textStyle="md">   |\ /|</Text>
            <Text textStyle="md">  /_^ ^_\</Text>
            <Text textStyle="md">      \v/</Text>
          </Box>
      </Box>
    </>
  );
}

export default DropText;

