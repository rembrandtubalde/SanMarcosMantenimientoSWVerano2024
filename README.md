# Proyecto de Mantenimiento
## Integrantes
- Harold Alberto
- Fredi Caballero
- Rodrigo Prado
- Jean Suarez
- Nilo Vallejo

## Ejecutar proyecto TalentWork

1. Clona el repositorio de tu proyecto desde tu terminal  
git clone https://github.com/FrediCaballero/Mantenimiento.git

2. Accede al directorio del proyecto  
cd Mantenimiento

3. Cambiar a rama del grupo
git switch TalentWork

4. Instala las dependencias de Composer  
composer install

5. Copia el archivo de entorno de ejemplo  
cp .env.example .env

6. Genera la clave de la aplicación  
php artisan key:generate

7. Abre el archivo .env en un editor de texto y realiza las siguientes modificaciones  
MYSQL_ATTR_SSL_CA=[URL de la ubicación de proyecto]\Mantenimiento\database\cacert-2023-12-12.pem

8. Inicia el Servidor de Desarrollo  
php artisan serve

10. Accede a la Aplicación  
Abre tu navegador y visita http://localhost:8000
