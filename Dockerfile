FROM node:lts-alpine

WORKDIR /usr/src/nest

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]