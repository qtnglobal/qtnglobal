# QTN Global Social Network

## Try it now!

Deploy an instance on your AWS account to play around with it!

## Users

After an installation the following users are created:

- **Admin user**: Email: ```admin@admin.com```, password: ```admin```
- **Regular user**: Email: ```user@user.com```:, password ```user```

## Features and implemented projects

- A LoopBack REST API with authentication enabled built on the [LoopBack Generator](https://www.npmjs.org/package/generator-loopback)
- A GUI built with AngularJS based on the [Angular Generator](https://github.com/yeoman/generator-angular)
- Angular UI-Router
- JSON-based based forms by [angular-formly](https://formly-js.github.io/angular-formly/)
- Notifications by [angular-toasty](https://github.com/Salakar/angular-toasty)
- File upload with [LoopBack storage services](https://github.com/strongloop/loopback-component-storage/)
- Admin template powered by [almasaeed2010/AdminLTE](https://github.com/almasaeed2010/AdminLTE)
- Markdown Editor with live preview with [angular-markdown-editor](https://github.com/JimLiu/angular-markdown-editor)
- Bunch of useful filters for AngularJS: [a8m/angular-filter](https://github.com/a8m/angular-filter)
- [t4t5/sweetalert](https://github.com/t4t5/sweetalert) provided by [oitozero/ngSweetAlert](https://github.com/oitozero/ngSweetAlert)
- Automatically growing textarea's by [monospaced/angular-elastic](https://github.com/monospaced/angular-elastic)
- Social authentication with [LoopBack passport](https://github.com/strongloop/loopback-component-passport/)
- Multi-language support by [rubenv/angular-gettext](https://github.com/rubenv/angular-gettext)
- User management
- Loading indicators [chieffancypants/angular-loading-bar](https://github.com/chieffancypants/angular-loading-bar)?


## TODO:

- Permissions on user actions (non-admins cannot access advanced functions)
- permissions on content items (non-admins can only edit own content, etc)
- Detect if API is online [HubSpot/offline](https://github.com/HubSpot/offline)?
- Map API roles to [Narzerus/angular-permission](https://github.com/Narzerus/angular-permission)
- Add tests
- Add Dockerfile
- Add Vagrantfile



## Screenshots

## Installation

### Dependencies

Installation depends on `node`/`npm` with `grunt` and `bower` installed globally.

    $ npm install -g bower grunt-cli

### Checkout the project:

    git clone https://bitbucket.org/thuanqh/qtnglobal.git

### Install the Node packages:

    npm install

### Clone, install and run in a oneliner

    git clone https://bitbucket.org/thuanqh/qtnglobal.git && cd loopback-angular-admin && npm install && npm start & grunt serve

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

      MONGODB_URL="mongodb://localhost:27017/loopback-angular-admin" npm start

Set `INITDB` to true if you want to load the initial dataset, which creates the admin user. The memory database (default) does this automatically.

    INITDB=true MONGODB_URL="mongodb://localhost:27017/loopback-angular-admin" npm start


## Development

If you want to share your work through a Pull Request, be sure to make it a clean branch (one functionality per PR) and base it off master.

If you plan on making a big change or replace a core function with something else it is probably best to first open an issue to discuss it with me. This will enhance the chance of the eventual changes getting merged a lot :)

The API is built with [generator-loopback](https://www.npmjs.org/package/generator-loopback).

The GUI is built with [generator-angular](https://www.npmjs.org/package/generator-angular) but is no longer compatible due to refactoring the project into modules.

These should help you quickly add code to your project. Further details tailored to this project might follow in the future.

### Useful commits

These commits might be useful when extending the functionality.

- [Add support for MongoDB databases](https://github.com/beeman/loopback-angular-admin/commit/6b884e601d535ed64b4ef4f6f07e0f55d357a5b6)
- [Add custom method to the API](https://github.com/beeman/loopback-angular-admin/commit/eedbd03f755ddf2234872886ee390ac4f6753c64)
- [Rename a model](https://github.com/beeman/loopback-angular-admin/commit/88254ce59af29818aec900514693e3fe6c94acea)

### WebSockets / socket.io

At this moment there is no integration for socket.io or websockets, nor will there be in the near future. Once LoopBack has integrated support for it we will leverage from that.

Having that said, it's certainly possible to integrate socket.io, check [this](https://github.com/beeman/loopback-angular-admin/pull/44) pull request by [@movibe](https://github.com/movibe).

# Issues

If you have any problems please [contact me](https://github.com/beeman/loopback-angular-admin/issues/new).
