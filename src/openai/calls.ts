import { Model } from '@/openai/models'

import { toast } from 'react-hot-toast'
import { match } from 'ts-pattern'

import { AxiosResponse } from 'axios'
import { Configuration, OpenAIApi } from 'openai'
import axiosSettings from './utils'

const oai = (apiKey: string) => new OpenAIApi(new Configuration({ apiKey }))

const handleResponse = (res: AxiosResponse): AxiosResponse | null => {
  return match(res.status)
    .with(200, () => res)
    .otherwise(() => {
      const errmsg = `OpenAI API Error (HTTP ${res.status}). See console for more details.`
      toast.error(errmsg)
      console.error('OpenAI API Response Error', res)
      return null
    })
}

const completion = async (apiKey: string, model: Model, prompt: string) => {
  const res = await oai(apiKey).createCompletion(
    { model, prompt },
    axiosSettings,
  )
  return handleResponse(res)
}

const chatCompletion = async (apiKey: string, model: Model, prompt: string) => {
  const res = await oai(apiKey).createChatCompletion(
    {
      model,
      messages: [{ role: 'user', content: prompt }],
    },
    axiosSettings,
  )
  return handleResponse(res)
}

export { completion, chatCompletion }
