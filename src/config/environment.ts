import { Api } from "@services/api"
import { Tron } from "@services/reactotron/tron"

let ReactotronDev
if (__DEV__) {
  const { Reactotron } = require("../services/reactotron")
  ReactotronDev = Reactotron
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    // create each service
    this.api = new Api()
  }

  async setup() {
    // allow each service to setup
    if (__DEV__) {
      Tron.configure({
        host: "localhost",
        name: require("../../package.json").name,
      })
        .useReactNative()
        .connect()
    }
    await this.api.setup()
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron: typeof ReactotronDev

  /**
   * Our api.
   */
  api: Api
}
