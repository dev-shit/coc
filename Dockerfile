FROM node:alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN yarn install

COPY . .

RUN yarn compile


CMD [ "node", "dist" ]
