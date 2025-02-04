from readData import *
from connectToMongo import *
from formatting import formatTable

def main():

    """
    #-----------------------------------------------------------#
    #           If you have aready inserted you data            #
    #       Just comment the dataHandler() function call        #
    #-----------------------------------------------------------#
    """
    # Handle the data and insert it into MongoDB
    
    dataHandler()

    # Query the best universities and print the formatted table
    query = queryBestUniversities("university-data", "februaryCollection", 300)
    print(formatTable(query))

def dataHandler():
    # Read and transform the university data
    
    # Cambia esto a donde sea que descargaste el directorio, tambien en este directorio debe de estar el archivo de excel
    directory = r'C:\Users\elchi\Desktop\Programacion\seleccion_universidades' # Change this to your directory
    
    # Cambia esto al nombre de tu archivo, normalmente deberia de ser este mismo nombre pero corrobora
    file_name = 'Oportunidades.xlsx' # Change this to the name of your file
    
    final_data = read_data(directory, file_name) 
    final_data = transform_data(final_data)
    insertData(final_data, "university-data", "februaryCollection")

    # Read and insert the ranking data
    ranking_data = read_data(directory, 'shanghai_ranking_2024.xlsx')
    insertData(ranking_data, "university-data", "rankingFebruary")

if __name__ == "__main__":
    main()
