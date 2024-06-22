# Development stage
FROM node AS development

WORKDIR /usr

COPY package*.json ./

RUN npm install --force

COPY . .

# Build stage
FROM development AS build

RUN npm run build

# Production stage
FROM node AS production

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --force

COPY --from=build /usr/dist ./dist

CMD [ "node", "dist/main.js" ]
