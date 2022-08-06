FROM node:lts

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

EXPOSE 3000

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]