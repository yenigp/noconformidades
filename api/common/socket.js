/**
 * Created by zxc on 18/07/17.
 */

(function (skt) {
  skt.create = create;

  var socketAuthenticate = require('./socket-auth');
  var eventHandler       = require('./utils/event-handler');
  var endPoint = {
    all: '/v1/connect'
  };

  function create(server) {
    var io = require('socket.io')(server);
    io.use(socketAuthenticate.authenticate);
    createSocketEndPoint(io);
  }


  function createSocketEndPoint(io) {
    var socketAll = undefined;
    socketAll     = io.of(endPoint.all);

    socketAll.on('connection', function (socket) {
        console.log('\n\n\n\n\n\n\nnew socket connection: ', socket.request.user.id.toString())
        socket.join(socket.request.user.id.toString());
        socket.on('logout', function () {
          socket.disconnect();
        });
        socket.on('disconnect', function () {
          console.log('desconectandose x');
        });

      socket.emit('hola', {a: 123}); //saludando al cliente que acaba de conectarse
        socket.on('hola', function () {
         /**
         * Si el cliente nos envia `hola`
         * entonces mostramos la info que nos ha mandado
         * 
         */
          socket.broadcast.emit('hi');
          socket.emit('hola', {a: 123});
        });
      }
    );

      /**
       * Este eventHandler se utiliza para desde cualquier parte
       * del proyecto emitir un evento y escucharlo en cualquier parte dentro del mismo
       * proyecto
       */
    eventHandler.on('checkUserActive', function (data) {
      data.isConnected = socketAll.adapter.rooms[data.id] != undefined;
    });

    eventHandler.on('notification', function (data) {
      socketAll.to(data.ReceiverId.toString())
       .emit('notification-' + data.ReceiverId.toString(), data);
    });
  }
})
(module.exports);
