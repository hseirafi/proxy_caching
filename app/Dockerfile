FROM node:8.3

# Install Node.js and other dependencies
# RUN apt-get update && \
#     apt-get -y install curl && \
#     curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
     
# RUN apt-get update && apt-get install yarn

COPY build/ /build/
CMD ["npm install", "build/"]

# EXPOSE 3000

CMD ["node", "build/server.js"]



# FROM ubuntu
# MAINTAINER David Weinstein <david@bitjudo.com>

# # install our dependencies and nodejs
# RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
# RUN apt-get update
# RUN apt-get -y install python-software-properties git build-essential
# RUN add-apt-repository -y ppa:chris-lea/node.js
# RUN apt-get update
# RUN apt-get -y install nodejs

# # use changes to package.json to force Docker not to use the cache
# # when we change our application's nodejs dependencies:
# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# # From here we load our application's code in, therefore the previous docker
# # "layer" thats been cached will be used if possible
# WORKDIR /opt/app
# ADD . /opt/app

# EXPOSE 3000

# CMD ["node", "server.js"]
# COPY build/ /usr/share/nginx
# RUN  npm install /usr/share/nginx
# RUN  node /usr/share/nginx/html/server.js


