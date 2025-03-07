
FROM node:22.14.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]