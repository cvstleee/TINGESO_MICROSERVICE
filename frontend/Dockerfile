FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY /nginx/conf.d /etc/nginx/conf.d
EXPOSE 3000
ARG ["nginx", "-g", "daemon off;"]