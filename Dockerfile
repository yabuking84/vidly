FROM node:14.17

WORKDIR /app

COPY ../package*.json ./

RUN npm install \
    && npm install -g nodemon \
    && apt-get update && apt-get install -y vim


COPY . .

ENV PORT=3030 \
    DEBUG=app:startup,app:db,app:default,app:error \
    VIDLY_EMAIL_PASSWORD=vidlysecret

EXPOSE 3030 \
    27017

CMD ["nodemon"]
# CMD ["npm","start"]