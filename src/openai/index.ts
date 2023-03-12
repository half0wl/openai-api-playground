import isApiKeyValid from './isApiKeyValid'
import {
  ChatCompletionModel,
  CompletionModel,
  ChatCompletionModels,
  CompletionModels,
  QueryType,
  QueryTypes,
  Model,
} from './models'
import axiosSettings from './utils'

export { QueryTypes, axiosSettings, isApiKeyValid, ChatCompletionModels, CompletionModels }
export type { ChatCompletionModel, CompletionModel, QueryType, Model }
