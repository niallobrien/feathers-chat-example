'use strict'
function removeClientIntiatedEvents(data, connection, hook) {
  // Dont send events to clients that initiated the resource change
  if(connection.socketid === hook.params.socketid) {
    return false;
  }
  return data;
}
module.exports = {
  all: [removeClientIntiatedEvents]
}
