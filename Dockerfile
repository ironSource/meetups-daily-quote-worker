FROM node:dubnium
EXPOSE 8022

WORKDIR /usr/src/app
COPY package.json ./
COPY .npmrc .npmrc
RUN npm install
COPY . .

ARG GIT_COMMIT
ENV GIT_COMMIT ${GIT_COMMIT}

HEALTHCHECK --interval=1m --timeout=12s --retries=3 CMD curl --fail http://localhost:8022/management/health || exit 1
CMD ["npm", "start"]
