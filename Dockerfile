FROM python:3.9

LABEL version="1.0"
LABEL description="Imagen de Docker para ejecutar una aplicación FastAPI"
LABEL maintainer="Grupo3"

ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --quiet -r /code/requirements.txt

COPY . .

EXPOSE 7860

CMD ["uvicorn", "dataApi.main:app", "--host", "0.0.0.0", "--port", "7860"]
