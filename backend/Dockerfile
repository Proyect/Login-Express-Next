FROM node:18-alpine
WORKDIR /app

# necesary files
COPY package.json package-lock.json ./
RUN npm install

COPY . .

#  http://localhost:5000
EXPOSE 5000

# Comando de inicio
CMD ["node", "server.js"]