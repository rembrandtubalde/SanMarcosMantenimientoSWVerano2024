# Importante librerías necesarias
from fastapi import FastAPI, Query
from typing import Optional
from typing import List, Tuple, Union
from enum import Enum,IntEnum

import pandas as pd

class ListaNum(IntEnum):
    pass

opciones_anio = [year for year in range(1980, 2022)]

class ListaAnios(str, Enum):
    opcion1 = "2019"
    opcion2 = "1981"
    opcion3 = "1982"
    opcion4 = "1983"

class ListaPlat(str, Enum):
    opcion1 = "disney"
    opcion2 = "hulu"
    opcion3 = "netflix"
    opcion4 = "amazon"

class ListaTipoDuration(str, Enum):
    opcion1 = "min"
    opcion2 = "season"

app = FastAPI()

#http://127.0.0.1:8000

@app.get("/")
async def welcome():
    return "BIENVENIDO A MLOps!!! Usa la ruta /docs para encontrar la documentación de la api MLOps que cuenta con una base de datos de películas y series de entre los años 1980 al 2021 de Netflix, Hulu, Disney+ y Amazon Prime Video, habiendo recuperado poco más de 23mil datos."

@app.get("/index")
async def index():
    return "Las 4 funcionalidades con las que cuenta esta api: 1. get_max_duration, 2. get_score_count, 3. get_count_platform y 4. get_actor"

df = pd.read_csv('datasets/full_titles.csv')

# Creando la función 1: película con mayor duración con filtros opcionales de AÑO, PLATAFORMA Y TIPO DE DURACIÓN
# (la función debe llamarse get_max_duration(year, platform, duration_type))
@app.get(
    "/max_duration",
    summary = "Película o serie más extensa",
    description = "Obtén la película con mayor duración o serie con más temporadas aplicando filtros opcionales de año, plataforma y tipo de duración.")
def get_max_duration(
    release_year: int = Query(None, description="Ingresa un año entre 1980 y 2021"),
    platform: str = Query(None, description="Ingresa una plataforma: amazon, disney, hulu o netflix"), 
    duration_type: ListaTipoDuration = Query(None, description="Selecciona el tipo de duración eligiendo 'min' para pelicula o 'season' para serie")):

    # Crear una copia del DataFrame original para evitar modificar los datos originales
    df_copy = df.copy()
    
    try:

        # Validando el año
        if release_year is not None and (release_year < 1980 or release_year > 2021):
            raise ValueError("Año fuera de rango. Ingresa un año entre 1980 y 2021.")  

        # Validando plataforma correcta
        if platform is not None and platform.lower() not in ['amazon', 'disney', 'hulu', 'netflix']:
            raise ValueError("La plataforma debe ser amazon, disney, hulu o netflix.")

        # Validando plataforma correcta
        if duration_type is not None and duration_type not in ['min', 'season']:
            raise ValueError("Comando de duración incorrecto. Ingresa 'min' para película o 'season' para serie.")
        
        # Aplicando los filtros opcionales si se especifican
        if release_year is not None:
            df_copy = df_copy[df_copy["release_year"] == release_year]
        if platform is not None:
            df_copy = df_copy[df_copy["platform"].str.contains(platform, case=False)]
        if duration_type is not None:
            df_copy = df_copy[df_copy["duration_type"] == duration_type]
    
        # Encontrando la película con la mayor duración
        max_duration = df_copy["duration_int"].max()
        max_duration_movie = df_copy[df_copy["duration_int"] == max_duration].iloc[0]
    
        # Creando un diccionario con los datos de la película con mayor duración
        result = {
            "La película/serie con mayor duración es:" : {
            "Título": max_duration_movie["title"],
            "Plataforma": max_duration_movie["platform"],
    #       "Director": max_duration_movie["director"],
    #        "Año": max_duration_movie["release_year"],
            "Duración": f"{max_duration_movie['duration_int']} {max_duration_movie['duration_type']}"
            }
        }
    
        return result

    except ValueError as e:
        return {"error": str(e)}
    

# Creando la función 2: cantidad de películas por plataforma con un puntaje mayor a XX en determinado año
# la función debe llamarse get_score_count(platform, scored, year)
@app.get(
        "/score_count/{platform}/{scored}/{release_year}",
        summary = "Películas y series según score",
        description = "Obtén la cantidad de películas con un puntaje mayor al que ingreses en determinado año y plataforma, criterios obligatorios."
)
def get_score_count(
    platform: str,
    scored: float = Query(None, description="Ingresa un puntaje hasta con dos decimales"),
    release_year: int = Query(..., description="Ingresa un año entre 1980 y 2021")):

    try:        
        # Validando plataforma correcta
        if platform is not None and platform.lower() not in ['amazon', 'disney', 'hulu', 'netflix']:
            raise ValueError("La plataforma debe ser amazon, disney, hulu o netflix.")
    
        # Filtrar las películas para la plataforma, año y puntaje especificados
        df_filtered = df[(df.platform == platform) & (df.score > scored) & (df.release_year == release_year) & (df.type == 'movie')]

        # Verificar que hay al menos una película que cumpla con los filtros
        if not df_filtered.empty:
            count = df_filtered.groupby('platform').size()
            return count.to_dict()
        else:
            return("No se encontró nigún título con los parámetros ingresados.")

    except ValueError as e:
        return {"error": str(e)}


# Creando la función 3: cantidad de películas por plataforma con filtro de PLATAFORMA.
# La función debe llamarse get_count_platform(platform)
@app.get(
        "/count_platform/{platform}",
        summary = "Cantidad de películas y series por plataforma",
        description = "Obtén la cantidad de películas y series registradas en nuestra base de datos según la plataforma elegida."
)
def get_count_platform(
    platform: str = Query(..., description="Ingresa una plataforma: amazon, disney, hulu o netflix")):

    try:        
        # Validando plataforma correcta
        if platform is not None and platform.lower() not in ['amazon', 'disney', 'hulu', 'netflix']:
            raise ValueError("La plataforma debe ser amazon, disney, hulu o netflix.")
    
        #Filtrar las películas para la plataforma
        df_filtered = df[df['id'].str.contains(platform[0], case=False)]

        #luego hago un conteo del tamaño del filtro que hice
        count = len(df_filtered)

        return count

    except ValueError as e:
        return {"error": str(e)}
    

# Creando la función 4: actor que más se repite según plataforma y año. (La función debe llamarse get_actor(platform, year))
@app.get(
        "/actor",
        summary = "Actor con más apariciones",
        description = "Obtén al actor que aparece en la mayor cantidad de películas y series según plataforma y año elegidos como filtros obligatorios."
)
def get_actor(
    platform: str = Query(..., description="Ingresa una plataforma: amazon, disney, hulu o netflix"),
    release_year: int = Query(..., description="Ingresa un año entre 1980 y 2021")) -> Tuple[int, List[str]]:

    # Validando plataforma correcta
    if platform is not None and platform.lower() not in ['amazon', 'disney', 'hulu', 'netflix']:
        raise ValueError("La plataforma debe ser amazon, disney, hulu o netflix.")

    # Filtrar el dataframe por plataforma y año
    df_filtered = df[(df['platform'] == platform) & (df['release_year'] == release_year)]
    
    # Crear una lista con todos los actores en el dataframe filtrado, excluyendo "no data"
    actors_list = [actor.strip() for cast in df_filtered['cast'] for actor in cast.split(',') if actor.strip() != "no data"]
    
    # Contar cuántas veces aparece cada actor en la lista
    actor_counts = {}
    for actor in actors_list:
        if actor in actor_counts:
            actor_counts[actor] += 1
        else:
            actor_counts[actor] = 1
    
    # Calcular la cantidad máxima de apariciones
    max_appearances = max(actor_counts.values())
    
    # Filtrar los actores que aparecen la cantidad máxima de veces, excluyendo "no data"
    most_common_actors = [actor for actor in actor_counts if actor_counts[actor] == max_appearances and actor != "no data"]
    
    # Devolver el resultado como una tupla con la cantidad máxima y la lista de actores
    return max_appearances, most_common_actors


# Creando la función 5: Sistema de recomendacion de películas con mayor rating en base al año dado.
# Se hizo un cambio más
def get_recommendation(
        release_year: int = Query(..., description="Ingresa un año entre 1980 y 2021")) -> str:
    try:
        # Filtrar las películas por el año especificado
        movies_of_year = df[df['release_year'] == release_year]
        
        # Ordenar las películas por rating de forma descendente y seleccionar las 10 mejores
        top_movies = movies_of_year.sort_values(by='score', ascending=False).head(10)
        
        # Verificar si hay películas para el año especificado
        if top_movies.empty:
            return "Lo siento, no se encontraron películas para el año especificado."
        
        # Seleccionar una película aleatoria de las 10 mejores
        random_movie = random.choice(top_movies['title'].tolist())
        
        return f"¡Recomendación: {random_movie} es una de las mejores películas de {year}!"

    except Exception as e:
        return f"Error: {str(e)}"