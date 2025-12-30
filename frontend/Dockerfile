FROM node:24-trixie

WORKDIR /app

RUN npm install -g pnpm@latest-10

COPY app/package.json app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY app .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
