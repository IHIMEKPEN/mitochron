FROM node:16-alpine AS build
WORKDIR /usr/sr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:lts-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/sr/app
COPY package*.json .
RUN npm install --only=prod --silent && mv node_modules ../
COPY . .
COPY --from=build /usr/sr/app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main"]