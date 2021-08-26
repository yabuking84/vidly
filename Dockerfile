FROM node:14.17

WORKDIR /app

# or you can use COPY package*.json .
COPY package*.json /app


# npm install nodemon doesnt need to be explicitly run because its already included in the independencies
RUN npm install 
    # && npm install -g nodemon \
    # && apt-get update && apt-get install -y vim


# or you can use COPY . .
COPY . /app

ENV PORT=3030 \
    DEBUG=app:startup,app:db,app:default,app:error \
    VIDLY_EMAIL_PASSWORD=vidlysecret

EXPOSE 3030 

CMD ["npm","run","dev"]