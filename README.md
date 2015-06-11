# QTN Global Social


## Installation

### Dependencies

Installation depends on `node`/`npm` with `grunt` and `bower` installed globally.

    $ npm install -g bower grunt-cli

### Checkout the project:

    git clone https://github.com/qtnglobal/qtnglobal.git

### Install the Node packages:

    npm install

### Clone, install and run in a oneliner

    git clone https://github.com/qtnglobal/qtnglobal.git && cd loopback-angular-admin && npm install && npm start & grunt serve

## Running

The project is separated in a server and a client.

### Server

To run the server you issue the command:

    npm start

Or to run it with nodemon (needs `nodemon` installed globally). This will
automatically restart the server when you change its code:

    npm run dev

### Client

Rebuild the lb-services.js file with the correct `API_URL` for development.

    API_URL=http://0.0.0.0:3000/api grunt

To run the client you issue the command:

    grunt serve

It will open the project in your default browser with livereload enabled.
This will take care of reloading the page when you change your code.

## Connect to a database

You can specify the URL to the MongoDB database you want to use with the `MONGODB_URL` environment variable.

    MONGODB_URL="mongodb://localhost:27017/qtnglobal" npm start

Set `INITDB` to true if you want to load the initial dataset, which creates the admin user. The memory database (default) does this automatically.

    INITDB=true MONGODB_URL="mongodb://localhost:27017/qtnglobal" npm start

## Development

If you want to share your work through a Pull Request, be sure to make it a clean branch (one functionality per PR) and base it off master.

If you plan on making a big change or replace a core function with something else it is probably best to first open an issue to discuss it with me. This will enhance the chance of the eventual changes getting merged a lot :)

These should help you quickly add code to your project. Further details tailored to this project might follow in the future.

### Useful commits

# Issues

If you have any problems please [contact me](https://github.com/qtnglobal/qtnglobal/issues/new).
