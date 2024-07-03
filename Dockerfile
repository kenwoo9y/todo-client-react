FROM node:22-alpine3.18

WORKDIR /app

CMD ["/bin/ash", "-c", "yarn install && yarn dev"]