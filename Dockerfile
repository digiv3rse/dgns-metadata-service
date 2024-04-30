FROM node:18-alpine
WORKDIR /usr/app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 4000
RUN yarn build
CMD [ "node", "dist/index.js" ]
