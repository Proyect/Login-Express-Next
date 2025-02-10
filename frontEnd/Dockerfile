FROM node:18-alpine
WORKDIR usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# run
RUN npm run build

# http://localhost:3000
EXPOSE 3000

CMD ["npm", "run", "dev"]
