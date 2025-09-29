FROM node:20-alpine
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN corepack enable && corepack prepare yarn@4.10.2 --activate
RUN yarn install --immutable

COPY . .

RUN yarn workspace @shoplite/backend build

CMD ["node", "apps/backend/dist/main.js"]
