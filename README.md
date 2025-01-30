# Filtra-Universidades-Inador chiclebomba 9000

This project helps users filter and select the best universities from a set of international programs offered by the Tecnológico de Monterrey. The data is processed from an Excel sheet, inserted into MongoDB, and queried to show the best universities based on various criteria.

Este proyecto ayuda a filtrar y seleccionar las mejores universidades ofrecidas en Programas Internacionales (PI) del Tecnológico de Monterrey. Los datos son procesados desde un archivo de Excel, insertados en una base de datos de MongoDB y consultados para mostrar el top de universidades.

## Requirements

### Student requirements

Since this program provides available universities based on the student's offer, the student needs to:
- Go to their opportunity catalog.
- Right below the "Simulate profile" button, there is an "Excel" button.  
![Tutorial Image](images/Readme1.jpg)
- Download that Excel file and drag it into the folder where the project is located.

### System requirements

Before running the project, make sure you have the following installed:

- Python 3.x (developed with Python 3.9.1).
- `pandas` library for data manipulation.
- `pymongo` library for MongoDB interaction.
- `tabulate` for formatting.
- A running MongoDB server (either local or remote).  
  - **Note:** This project does not handle database authentication.

### Requisitos del estudiante  

Dado que este programa muestra las universidades disponibles según la oferta del estudiante, es necesario que el estudiante:

- Vaya a su catálogo de oportunidades [probablemente aquí si estás en el Tec](https://pi.tec.mx/catalogo-oportunidades).  
- Justo debajo del botón "Simular perfil", hay un botón llamado "Excel".  
![Imagen del tutorial](images/Readme1.jpg)  
- Descargue ese archivo de Excel y arrástrelo a la carpeta donde se encuentra el proyecto.

### Requisitos del sistema  

Antes de ejecutar el proyecto, asegúrate de tener lo siguiente instalado:

- Python 3.x (desarrollado con Python 3.9.1).  
- Biblioteca `pandas` para manipulación de datos.  
- Biblioteca `pymongo` para la interacción con MongoDB.  
- Biblioteca `tabulate` para el formateo de tablas.  
- Servidor MongoDB en ejecución (puede ser una instancia local o remota).  
  - **Nota:** Este proyecto no maneja autenticación con contraseña para la base de datos.

## Features

- Import university and ranking data from Excel files.
- Insert data into MongoDB collections for easy querying.
- Query the best universities based on ranking and program validity.
- Display results in a user-friendly format.

## MongoDB Query

If needed, you can use the following query in the MongoDB shell to retrieve the best universities:

```json
db.februaryCollection.aggregate([
  {
    $lookup: {
      from: "rankingFebruary", 
      localField: "nombre",
      foreignField: "University_Name",
      as: "ranking"
    }
  },
  {
    $unwind: "$ranking"
  },
  {
    $match: {
      "ranking.Rank": { $lt: 100 }
    }
  },
  {
    $sort: {
      "ranking.Rank": 1
    }
  },
  {
    $project: {
      "nombre": 1,
      "ciudad": 1,
      "ranking.Rank": 1,
      "clave": 1,
      "idioma": 1,
      "vigencia": 1
    }
  }
])
