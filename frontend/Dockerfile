FROM node:alpine

WORKDIR /home/frontend

COPY . .

RUN npm install

EXPOSE 3000

RUN npm run build

CMD ["npm","start"]