import pandas as pd



def read_data(file_path: str, file_name: str) -> pd.DataFrame:
    
    # Read the data from the file path provided
    # :param file_path: The file path to the data, must be inputted as a raw string, for example: r'C:\Users\user\Documents'
    # :param file_name: The name of the file to be read, must be inputted as the whole name including the file extension, example: 'data.csv', 'data.xlsx'
    # :return: The data as a pandas dataframe
    
    
    import os
    os.chdir(file_path)
    print("We are working in the directory: ", os.getcwd())
    # Ensure the correct file path is provided
    df = pd.read_excel(file_name)
    
    return df


def transform_data(DF: pd.DataFrame) -> pd.DataFrame:
    """
    In my case, for the list I have, I dont want universities that charge their own price instead of my current university price
    I will remove those universities

    Also I will normalize university names, for my case the names are The [Insert university name] - [something or other about exchange type]
    I will only take until the "-" and remove the rest

    En español y la gente que sepa, Solo quiero universidades que esten cobrando Colegiatura Tec, lo demas no pq ta muy caro :(
    """
    
    # Remove the universities that are charging their own price
    DF = DF[DF["moneda"] == "MXN"]
    
    # Normalize the university names
    # Split the name by the "-" and take the first part
    DF["nombre"] = DF["nombre"].apply(lambda x: x.split("-")[0])
    
    # Remove the extra spaces
    DF["nombre"] = DF["nombre"].apply(lambda x: x.strip())
    
    
    return DF
    
