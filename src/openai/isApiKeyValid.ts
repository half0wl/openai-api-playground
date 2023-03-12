import { axiosSettings } from '@/openai'
import { Configuration, OpenAIApi } from 'openai'

/**
 * Make a request to listModels to check if the provided API key is valid.
 */
const isApiKeyValid = async (apiKey: string): Promise<boolean> => {
  const oaiConfig = new Configuration({ apiKey })
  const oai = new OpenAIApi(oaiConfig)
  const res = await oai.listModels(axiosSettings)
  switch (res.status) {
    case 200:
      return true
    case 401:
      return false
    default:
      const errmsg =
        `Received HTTP ${res.status} ` +
        `(response: ${JSON.stringify(res.data)})`
      throw new Error(errmsg)
  }
}

export default isApiKeyValid
