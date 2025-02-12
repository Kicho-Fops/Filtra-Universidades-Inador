import React, { useState, useEffect } from "react";
import { Box, Table } from "@chakra-ui/react";

// THIS CODE WAS MADE MAINLY BY CHAT GPT I HATE BEING FRONTEND



function Results() {
  const [items, setItems] = useState<any[]>([]); // Ensure items is always an array

  useEffect(() => {
    const storedData = localStorage.getItem("university_data");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);

        // Ensure the object has the expected "Calculated_universities" key and it's an array
        if (parsedData && Array.isArray(parsedData.Calculated_universities)) {
          
            const sortedUniversities = parsedData.Calculated_universities.sort(
                (a, b) => a.rank - b.rank
              );
            setItems(sortedUniversities);
        } else {
          console.error("Invalid data structure:", parsedData);
          setItems([]); // Reset to empty array if invalid
        }
      } catch (error) {
        console.error("Error parsing university data:", error);
        setItems([]); // Reset in case of JSON error
      }
    }
  }, []);

  return (
    <Box
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      data-state="open"
      _open={{
        animation: "fade-in 2000ms ease-out",
      }}
    >
      <Table.Root variant="outline" colorScheme="gray">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Clave de oportunidad</Table.ColumnHeader>
            <Table.ColumnHeader>País</Table.ColumnHeader>
            <Table.ColumnHeader>Ranking Mundial</Table.ColumnHeader>
            <Table.ColumnHeader>Nombre de la universidad</Table.ColumnHeader>
            <Table.ColumnHeader>Vigencia para aplicar</Table.ColumnHeader>
            <Table.ColumnHeader>Requerimientos de idioma</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.length > 0 ? (
            items.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.clave}</Table.Cell>
                <Table.Cell>{item.pais}</Table.Cell>
                <Table.Cell>{item.rank}</Table.Cell>
                <Table.Cell>{item.nombre}</Table.Cell>
                <Table.Cell>{item.vigencia}</Table.Cell>
                <Table.Cell>{item.idioma}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={6} textAlign="center">
                No data available
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default Results;
