FROM nginx:alpine

# Copia el contenido de tu aplicación al directorio de Nginx
COPY dist /usr/share/nginx/html

# Copia tu archivo de configuración de Nginx al contenedor
COPY nginx/conf.d/frontend.conf /etc/nginx/conf.d/frontend.conf

# Expone el puerto en el que Nginx escucha (80 es el puerto por defecto)
EXPOSE 80

# Comando para mantener Nginx en ejecución
CMD ["nginx", "-g", "daemon off;"]