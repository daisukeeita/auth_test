'use strict'

const listenToPort = () => {
  console.info(
    `Application is listening to http://${process.env.APP_HOST}:${process.env.APP_PORT}!`
  )
}

export default listenToPort
