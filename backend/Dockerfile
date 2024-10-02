# Usar una imagen base de Node.js
FROM node:16.15.0
# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código del backend
COPY . .

# Exponer el puerto del servidor Node.js
EXPOSE 4000

# Comando para iniciar el servidor
CMD ["npm", "start"]
