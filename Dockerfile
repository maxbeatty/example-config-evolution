FROM mhart/alpine-node

WORKDIR /src
COPY . .

# Uncomment for native dependencies
# RUN apk add --no-cache make gcc g++ python

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
