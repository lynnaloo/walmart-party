'use strict';

const Hapi = require('hapi');
const Good = require('good');
const _ = require('lodash');
const pkg = require('./package.json');

const plugins = [{
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
            log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, {
  register: require('inert'),
  options: {}
}];

const server = new Hapi.Server();
server.connection({ port: 3000 });
server.register(plugins, (err) => {

  if (err) {
    throw err;
  }

  console.log('=> Registered plugins:', { plugins: _.keysIn(server.registrations).join(', ') });

  server.route({
    method: 'GET',
    path:'/version',
    handler: function (request, reply) {
      reply({
        name: pkg.name,
        version: pkg.version
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });

  server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`=> Server running at: ${server.info.uri}`);
  });
});
