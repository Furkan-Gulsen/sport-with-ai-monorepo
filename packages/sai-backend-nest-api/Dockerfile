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

ENV DEV_DATABASE_URL=postgresql://postgres:J0tk0gwECPBPMF0jJTeX@sai-postgres.chrxubv5fkw8.us-east-2.rds.amazonaws.com:5432/swai_database
ENV AMQPS_URL=amqps://yfecuoqj:NTKDvMwTks6XFC9VTB4xZYrcXBQkRi8U@cow.rmq2.cloudamqp.com/yfecuoqj
ENV EMAIL_ID=sportwithai@gmail.com
ENV EMAIL_PASS=D83Ju1I2O4HfSzIoJZlO
ENV AWS_ACCESSKEYID=AKIA3NNSYTEPCIYHGLAW
ENV AWS_SECRETACCESSKEY=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  

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