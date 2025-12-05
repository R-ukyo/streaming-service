FROM node:24-trixie

WORKDIR /app

EXPOSE 3000

RUN npm install -g pnpm@latest-10
COPY app/package.json .
COPY app/pnpm-lock.yaml .
RUN pnpm i

COPY app .

CMD ["pnpm", "run", "dev"]
