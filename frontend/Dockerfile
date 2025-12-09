# Imagen base
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Puerto 3000 del frontend
EXPOSE 3000

CMD ["npm", "start"]
