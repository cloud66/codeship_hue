FROM node:5-onbuild
EXPOSE 8080
WORKDIR /usr/src/app
CMD node start.js
