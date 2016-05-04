'use strict'
function removeClientIntiatedEvents(data, connection, hook) {
  // Dont send events to clients that initiated the resource change
  console.log(connection.user)
  console.log(connection.socketid)
  if(connection.socketid === hook.params.socketid) {
    return false;
  }
  return data;
}
module.exports = {
  all: [removeClientIntiatedEvents]
}
