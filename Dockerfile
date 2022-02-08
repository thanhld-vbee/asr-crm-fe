FROM node:10.16.3
WORKDIR /app
COPY package.json ./
RUN npm i --force
COPY public /app/public
COPY . /app
RUN npm run build
CMD [ "node", "server" ]
