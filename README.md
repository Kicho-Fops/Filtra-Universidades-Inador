# University Selection System

This project helps users filter and select the best universities from a set of international programs offered by the Tecnológico de Monterrey. The data is processed from an Excel sheet, inserted into MongoDB, and queried to show the best universities based on various criteria.

Este proyecto ayuda a filtrar y seleccionar las mejores universidades ofrecidas en Programas Internacionales (PI) del Tecnológico de Monterrey. Los datos son procesados desde un Excel, insertados en una base de datos de MongoDB y queriada para mostrar el top de universidades.

## Requirements

### Student requirements

Since this program gives the avaliable universities based on the students offer the student needs to:
- Go to their oppotunity catalog
- Right below the "Simulate profile" button is, there is an "Excel" button 
![Tutorial Image](images/Readme1.jpg)
- Download that excel and drag it to the folder where the project downloaded





Before you run the project, make sure you have the following installed:

- Python 3.x
- `pandas` library for data manipulation
- `pymongo` library for MongoDB interaction
- MongoDB server running (you can use a local or remote MongoDB instance)



## Features

- Import university data and ranking data from Excel files.
- Insert data into MongoDB collections for easy querying.
- Query the best universities based on ranking and program validity.
- Display the results in a user-friendly format.








I personally used this query, this is what you input into the MongoDB shell if you need it


db.februaryCollection.aggregate([
  {
    $lookup: {
      from: "rankingFebruary", // The collection to join
      localField: "nombre",     // Field from the first collection
      foreignField: "University_Name",   // Field from the second collection
      as: "ranking"             // Alias for the resulting joined documents
    }
  },
  {
    $unwind: "$ranking"  // Unwinds the array created by $lookup, since $lookup will return an array of matching documents
  },
  {
    $match: {
      "ranking.Rank": { $lt: 100 },  // Filters rankingFebruary for Rank < 100
    }
  },
  {
    $sort: {
      "ranking.Rank": 1  // Sorts the results by Rank in ascending order
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

If there are any outliers, just ignore them, this is not for a piece of academic research, just a personal project







