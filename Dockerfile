FROM node:16.16
LABEL authors="HISP Tanzania"

WORKDIR /dhis2-visualizer

COPY app /dhis2-visualizer/app
COPY visualizer /dhis2-visualizer/visualizer
COPY package.json /dhis2-visualizer
COPY yarn.lock /dhis2-visualizer


RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_DOWNLOAD=true


RUN yarn install --production

EXPOSE 7000

ENTRYPOINT ["yarn", "start"]
