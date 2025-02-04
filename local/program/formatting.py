from tabulate import tabulate


def formatTable(data):
    
    headers = ["nombre", "ciudad", "Rank", "clave", "idioma", "vigencia"]

    # Prepare the results
    formatted_results = [
        [doc["nombre"], doc["ciudad"], doc["ranking"]["Rank"], doc["clave"], doc["vigencia"]]
        #[doc["nombre"], doc["ciudad"], doc["ranking"]["Rank"], doc["clave"], doc["idioma"], doc["vigencia"]]
        for doc in data
    ]
    
    return tabulate(formatted_results, headers=headers, tablefmt="pretty")