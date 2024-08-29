FROM node:20-alpine3.19 as Build

WORKDIR /build

COPY package*.json /build/

RUN npm  install

COPY . .

RUN npm run build

# production
FROM node:20-alpine3.19 as production

WORKDIR /app

COPY package*.json  /app/

RUN  npm ci --omit=dev

COPY --from=Build ./build/dist ./app/dist

CMD [ "npm" , "run" ,"start" ]
