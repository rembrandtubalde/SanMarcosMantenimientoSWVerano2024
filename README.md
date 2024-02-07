# Proyecto de Mantenimiento

## Integrantes
- Harold Alberto
- Fredi Caballero
- Rodrigo Prado
- Jean Suarez
- Nilo Vallejo

## Descripción

TalentWork es una plataforma que tiene como objetivo facilitar el intercambio flexible de servicios entre sus usuarios, permitiéndoles tanto ofrecer sus propios talentos y habilidades a través de "oficios" y "talentos", como encontrar servicios de otros usuarios para contratar; además, los usuarios pueden proponer "retos" que requieran de estos servicios y que son financiados colectivamente por el resto de la comunidad a través de métodos de pago habilitados como Stripe y PayPal, generando así un sistema de financiación colectiva de proyectos; asimismo, cada servicio contratado puede ser calificado por los usuarios que los usaron, lo que genera reputación y valoración de perfiles; finalmente, existe un espacio de comunicación entre los miembros y comentarios asociados a cada reto para coordinar servicios, realizar consultas y aportar feedback, creando así una plataforma integral que busca facilitar el intercambio flexible de servicios profesionales entre pares de forma abierta, transparente y mediante la evaluación y el apoyo mutuo de la propia comunidad.


## Ejecutar proyecto TalentWork

1. Clona el repositorio de tu proyecto desde tu terminal  
git clone https://github.com/rembrandtubalde/SanMarcosMantenimientoSWVerano2024.git  

2. Accede al directorio del proyecto  
cd SanMarcosMantenimientoSWVerano2024

3. Cambiar a rama del grupo  
git switch TalentWork  

4. Instala las dependencias de Composer  
composer install

5. Copia el archivo de entorno de ejemplo  
copy .env.example .env

6. Genera la clave de la aplicación  
php artisan key:generate

7. Abre el archivo .env en un editor de texto y realiza las siguientes modificaciones  
MYSQL_ATTR_SSL_CA=[URL de la ubicación de proyecto]\Mantenimiento\database\cacert-2023-12-12.pem

8. Inicia el Servidor de Desarrollo  
php artisan serve

10. Accede a la Aplicación  
Abre tu navegador y visita http://localhost:8000
