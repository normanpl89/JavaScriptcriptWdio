FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash  && \
    apt-get install -y nodejs  


RUN apt-get update && \
    apt-get install -y fonts-liberation libappindicator3-1 xdg-utils

ENV CHROME_VERSION 105.0.5195.52
RUN apt install wget -y && \ 
    wget -O /usr/src/google-chrome-stable_current_amd64.deb "http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}-1_amd64.deb" && \
  apt-get install -f -y /usr/src/google-chrome-stable_current_amd64.deb

RUN apt-get update && \
    apt install -y default-jre

WORKDIR /app


COPY package*.json .
COPY . .

RUN npm install && \
 npx selenium-standalone install && npx selenium-standalone start > /dev/null 2>&1 &




CMD node --version && \
    npm --version && \
    google-chrome --version && \ 
    java -version && \ 
    ls && \
    npm i && \ 
    ls && \
    npx webdriver-manager update  && \
    npm run wdio -- --cucumberOpts.tagExpression @C86 --headless=true