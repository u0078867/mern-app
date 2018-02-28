# Adapted from:
# - https://codefresh.io/docker-tutorial/node_docker_multistage/
# - https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

#
# ---- Base Node ----
FROM node:carbon-alpine AS base
# set working directory
WORKDIR /usr/src/app
# copy project file
COPY package*.json ./

#
# ---- Dependencies ----
FROM base AS dependencies
# Add git (necessary for installation of a few deps)
RUN apk add --no-cache git openssh
# install node packages
RUN npm install --only=production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install

#
# ---- Build ----
# run build
FROM dependencies AS build
COPY . .
RUN npm run build:server
RUN npm run build:client

#
# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules
# copy app sources
COPY . .
# copy dist
COPY --from=build /usr/src/app/dist ./dist
# expose port and define CMD
EXPOSE 8000
CMD npm start
