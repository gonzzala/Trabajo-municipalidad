# Usar una imagen base de Node.js
FROM node:16.15.0

# Establecer el directorio de trabajo
RUN mkdir -p /app
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN ls -al
RUN npm install

# Copiar el código de la aplicaciónc
COPY . .

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación React
CMD ["npm", "start"]
