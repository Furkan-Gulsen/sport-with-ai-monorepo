# FROM node:latest as development
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install 
# COPY . .
# RUN npm run build


# FROM node:latest as production
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install --only=production
# COPY . .
# COPY --from=development /usr/src/app/prisma ./prisma
# COPY --from=development /usr/src/app/dist ./dist
# EXPOSE 3000
# CMD npm run start:prod


   

   
FROM node:14 AS builder

# Create app directory
WORKDIR /app

ENV DEV_DATABASE_URL=dev_database_url
ENV AMQPS_URL=amqps_url
ENV EMAIL_ID=email
ENV EMAIL_PASS=password
ENV AWS_ACCESSKEYID=access_key
ENV AWS_SECRETACCESSKEY=secret_key  

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install
RUN npx prisma generate
# RUN npx prisma migrate dev --name init
RUN npx prisma db push

COPY . .

RUN npm run build

FROM node:14

COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]