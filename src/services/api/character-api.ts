import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetCharactersResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class CharacterApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getCharacters(): Promise<GetCharactersResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://raw.githubusercontent.com/infinitered/ignite/master/data/rick-and-morty.json",
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok", data: response.data.results }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      console.log("response erro =>", e)
      return { kind: "bad-data" }
    }
  }
}
