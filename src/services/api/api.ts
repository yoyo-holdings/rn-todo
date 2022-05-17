import Config from "react-native-config"
import { loadString } from "@utils/storage"
import { ApisauceInstance, create } from "apisauce"

export interface ApiConfig {
  url: string
  timeout: number
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.BASE_URL,
  timeout: 30000, // miliseconds
}

export class Api {
  apisauce!: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })

    this.apisauce.addAsyncRequestTransform((request) => async () => {
      const authKey = await loadString("bearer_token")
      if (authKey) {
        request.headers.Authorization = "Bearer " + authKey
      }
    })
  }
}
