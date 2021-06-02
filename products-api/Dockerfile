FROM node:14.17-alpine3.11 as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=development
COPY . .

RUN npm run build
RUN npm run lint
RUN npm run test

FROM node:14.17-alpine3.11 as app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./

EXPOSE 3000

CMD ["node", "main"]