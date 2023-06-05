echo "Clearing past builds..."
rimraf build

PKG_VERSION=`node -p "require('./package.json').version"`

echo "Building app"
BUNDLE_NAME="hisptz-dhis2-visualizer-$PKG_VERSION.zip"

mkdir app

mkdir app/visualizer
cp -r packages/visualizer/dist/* app/visualizer
cp -r packages/server/app app/
cp packages/server/package.json app/
cp packages/server/.env.example app/
cp yarn.lock app/
cp Dockerfile app/

bestzip "$BUNDLE_NAME" app package.json .env.example yarn.lock Dockerfile docker-compose.yml
mkdir "build"
mv $BUNDLE_NAME build
#rm -r app
