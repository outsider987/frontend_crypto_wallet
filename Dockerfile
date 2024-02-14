# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.17.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Install node modules
COPY --link package.json ./
RUN npm install --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app
COPY  /server.js /app
COPY ./.env.prod ./.env
COPY ./.env.prod ./app/.env
COPY ./.env.prod ./app/dist/.env
# COPY ./.env.prod ./app/.env
ENV $(cat .env | xargs)

RUN npm i -g cross-env ;
RUN npm install -g dotenv-cli;

# Start the server by default, this can be overwritten at runtime
EXPOSE 8080
CMD [ "npm", "run", "serve"]




# FROM node:18.8-alpine  as builder

# WORKDIR /app
# COPY package*.json .
# COPY . .
# RUN ls
# RUN npm i -D tsconfig-paths
# RUN npm install -g npm@9.4.1


# RUN npm i ;


# RUN npm run build

# #stage2
# # FROM nginx:1.19
# # COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# # COPY --from=builder /react-app/build /usr/share/nginx/html


# # FROM pierrezemb/gostatic
# # COPY ./dist/ /srv/http/
# # EXPOSE 80

# # FROM mhart/alpine-node
# # RUN yarn global add serve
# # WORKDIR /app
# # COPY --from=builder /app/dist .
# # CMD ["serve", "-p", "8080", "-s", "."]


# # FROM nginx:alpine AS prod
# # WORKDIR /usr/share/nginx/html
# # COPY --from=builder /app/dist .
# # EXPOSE 80
# # # run nginx with global directives and daemon off
# # ENTRYPOINT ["nginx", "-g", "daemon off;"]


# FROM nginx:alpine AS prod
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf

# ENTRYPOINT ["nginx", "-g", "daemon off;"]



