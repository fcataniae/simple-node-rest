module.exports = function (){

  const amqplib = require('amqplib');
  this.channel = null;

  this.init = function(config){
    return require('amqplib').connect('amqp://'+config.rabbitHost)
        .then(conn => conn.createChannel())
        .then(ch => {
            channel = ch;

            //this queue is a "Direct reply-to" read more at the docs
            //When some msg comes in, we "emit" a message to the proper "correlationId" listener
            ch.consume('amq.rabbitmq.reply-to', msg => eventEmitter.emit(msg.properties.correlationId, msg.content), {noAck: true});
        });
  }

  this.uploadToQueue = function(queueName,toUpload){

    channel.assertQueue(queueName)
        //Sent the buffered img to the queue with the ID and the responseQueue
        .then(() => channel.sendToQueue(queueName, toUpload, {replyTo: 'amq.rabbitmq.reply-to'}));

  }

}
