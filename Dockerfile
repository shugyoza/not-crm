FROM node:16-alpine

# create a working directory
WORKDIR /usr/src/app

# copy package.json to current directory
COPY "package.json" .

RUN npm install

# add whatever that came out after npm i to current directory
ADD . /usr/src/app

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 4200