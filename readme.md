# Bruce Blog

Create `.env` file on project root copying `example.env`.

## Get started

```sh
# up docker
source docker-alias.sh
# start database
blog-up mongo

# install packages
npm install -g lerna dotenv-cli # if not installed
lerna bootstrap
# run server
dotenv -e .env yarn start:api
dotenv -e .env yarn start:dashboard
```
## Other docs

- [Routes](docs/routes.md)
