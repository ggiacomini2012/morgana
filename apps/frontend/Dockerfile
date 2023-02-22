FROM node:16-alpine

WORKDIR /app

COPY . .

RUN pnpm install

EXPOSE 5173

ENTRYPOINT ["nx", "run", "frontend:serve"]
