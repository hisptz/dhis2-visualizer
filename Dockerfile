FROM node:16.16
LABEL authors="HISP Tanzania"

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /dhis2-visualizer

COPY packages/visualizer/dist /dhis2-visualizer/visualizer
COPY packages/server/app /dhis2-visualizer/app
COPY packages/server/package.json /dhis2-visualizer/
COPY yarn.lock /dhis2-visualizer/


RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*


RUN yarn install --production

EXPOSE 7000

ENTRYPOINT ["yarn", "start"]
