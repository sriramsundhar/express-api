FROM node:22-alpine3.20 AS ts-compiler
WORKDIR /home/node/app
COPY . .
RUN npm ci && \
  npm run build

FROM node:22-alpine3.20
WORKDIR /home/node/app
COPY --from=ts-compiler /home/node/app/package*.json ./
COPY --from=ts-compiler /home/node/app/dist/src ./dist/src
RUN npm ci --omit=dev
EXPOSE 3000

CMD ["node", "dist/src/app.js"]
