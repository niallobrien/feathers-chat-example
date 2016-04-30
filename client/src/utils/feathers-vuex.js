export default class FeathersVuex {
  constructor (service, eventFunctions) {
    this.service = service
    this.eventFunctions = eventFunctions
    // TODO Check event keys, check service, duck typing?
  }
  createEvents () {
    for (let event in this.eventFunctions) {
      this.service.on(event, this.eventFunctions[event])
      // console.log(`Created event ${event}`)
    }
  }
  destroyEvent (event) {
    this.service.off(event, this.eventFunctions[event])
  }
  destroyEvents (event) {
    for (let event in this.eventFunctions) {
      this.service.off(event, this.eventFunctions[event])
      // console.log(`Removed event ${event}`)
    }
  }
}
