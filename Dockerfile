FROM node:lts-alpine3.16

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN yarn

# RUN yarn build

ENTRYPOINT ["/entrypoint.sh"]

CMD ["yarn", "dev"]
# CMD ["yarn", "--host", "serve"]