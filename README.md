# Setup

## Clone the repository

```
$ git clone https://github.com/kshamaraichura/propertyportal.git
```

## Install dependencies
```
$ composer install
$ npm install
```

## Configure database
Update `.env` file with database configuration:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=[DB_NAME]
DB_USERNAME=[DB_USER]
DB_PASSWORD=[DB_PWD]
```

## Run migration
```
$ php artisan migrate
```

## Start application
```
$ php artisan serve
```

## Open in a web browser
```
http://localhost:8000
```

## Admin credentials
```
Username: admin
Password: admin
```
