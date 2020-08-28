## Installation

### Node Js

```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs
```

### Yarn

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
sudo apt-get update
sudo apt-get install yarn
```

### PM2

```
sudo npm install -g pm2
```

### Start Project

Change APP_ENV dev to prod in .env file

```
cd ~
cd ecommerce_backend
yarn
yarn build
yarn pm2:start
```

### Nginx Config

Copy api.conf and jenkins.conf to `/etc/nginx/conf.d` folder

## Jenkins Deployment

- create ssh user for localhost without password
- copy deploy file to /var/lib/jenkins/script chmod +x deploy
- create build job

```
yarn
yarn build
sh /var/lib/jenkins/script/deploy
```

## Create Database & Tables

Create `ecommerce` database with utf-8 turkish_ci collection.

```
cd ecommerce_backend
yarn typeorm:sync
```

### Migrations

```
cd ecommerce_backend
yarn typeorm:migration:run
```

## Update Project

```
cd ecommerce_backend
git pull
yarn build
yarn pm2:restart
```
