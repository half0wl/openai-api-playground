/**
 * Models are hardcoded instead of being fetched from the `listModels`
 * endpoint. `listModels` contain a lot of models, including beta models
 * that may not work. Certain models are only compatible with certain
 * endpoints (e.g. gpt-3.5-turbo doesn't work with completions endpoint).
 * To ensure maximum compatability, I'm opting to maintain this manually.
 *
 * @see https://platform.openai.com/docs/models/model-endpoint-compatability
 */

export type QueryType = 'ChatCompletion' | 'Completion'
export type ChatCompletionModel = 'gpt-3.5-turbo' | 'gpt-3.5-turbo-0301'
export type CompletionModel =
  | 'text-davinci-003'
  | 'text-davinci-002'
  | 'text-curie-001'
  | 'text-babbage-001'
  | 'text-ada-001'
  | 'davinci'
  | 'curie'
  | 'babbage'
  | 'ada'
export type Model = ChatCompletionModel | CompletionModel

const QueryTypes: QueryType[] = ['ChatCompletion', 'Completion']
const ChatCompletionModels: ChatCompletionModel[] = [
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-0301',
]
const CompletionModels: CompletionModel[] = [
  'text-davinci-003',
  'text-davinci-002',
  'text-curie-001',
  'text-babbage-001',
  'text-ada-001',
  'davinci',
  'curie',
  'babbage',
  'ada',
]

const DEFAULT_COMPLETION_MODEL: CompletionModel = 'text-davinci-003'
const DEFAULT_CHATCOMPLETION_MODEL: ChatCompletionModel = 'gpt-3.5-turbo'

export {
  QueryTypes,
  ChatCompletionModels,
  CompletionModels,
  DEFAULT_COMPLETION_MODEL,
  DEFAULT_CHATCOMPLETION_MODEL,
}
