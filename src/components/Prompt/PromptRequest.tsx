import { useEffect } from 'react'

import { ModelSelect, Tab } from '@/components/Ui'
import { chatCompletion, completion } from '@/openai/calls'
import {
  ChatCompletionModel,
  CompletionModel,
  DEFAULT_CHATCOMPLETION_MODEL,
  DEFAULT_COMPLETION_MODEL,
  Model,
  QueryType,
} from '@/openai/models'
import RunButton from './RunButton'
import Textarea from './Textarea'

import { match } from 'ts-pattern'

import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { Variable } from '../Modal/VariablesModal'

interface Props {
  apiKey: string | null
  variables: Variable[]
  setResponse: (response: AxiosResponse | null) => void
  setQueryType: (queryType: QueryType) => void
}

const PromptRequest: React.FC<Props> = ({
  apiKey,
  variables,
  setQueryType,
  setResponse,
}) => {
  const [activeTab, setActiveTab] = useState<QueryType>('ChatCompletion')
  const [loading, setLoading] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<string>('')
  const [model, setModel] = useState<ChatCompletionModel | CompletionModel>(
    DEFAULT_CHATCOMPLETION_MODEL,
  )

  useEffect(() => {
    setQueryType(activeTab)
    match(activeTab)
      .with('ChatCompletion', () => setModel(DEFAULT_CHATCOMPLETION_MODEL))
      .with('Completion', () => setModel(DEFAULT_COMPLETION_MODEL))
      .exhaustive()
  }, [activeTab, setQueryType])

  const run = async () => {
    if (apiKey === null) {
      return
    }
    if (prompt === '') {
      return
    }

    // Detect and substitue variables in request
    let substitutedPrompt = prompt
    variables.forEach((v) => {
      const regex = new RegExp(`{{ ${v.name} }}`, 'g')
      if (prompt.match(regex)) {
        substitutedPrompt = substitutedPrompt.replaceAll(regex, v.content)
      }
    })

    setLoading(true)
    const res = await match(activeTab)
      .with('ChatCompletion', async () => {
        return await chatCompletion(apiKey, model, substitutedPrompt)
      })
      .with('Completion', async () => {
        return await completion(apiKey, model, substitutedPrompt)
      })
      .exhaustive()

    setLoading(false)
    if (res !== null) {
      setResponse(res)
    }
  }

  return (
    <>
      <div className="tabs">
        <Tab
          name="ChatCompletion"
          active={activeTab === 'ChatCompletion'}
          onClick={() => setActiveTab('ChatCompletion')}
          first
        />
        <Tab
          name="Completion"
          active={activeTab === 'Completion'}
          onClick={() => setActiveTab('Completion')}
        />
      </div>
      <div>
        <Textarea
          disabled={apiKey === null}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-12 gap-3 mt-4">
        <div className="col-span-8">
          <div className="form-control w-full">
            <ModelSelect
              queryType={activeTab}
              onChange={(e) => {
                setModel(e.target.value as Model)
              }}
              disabled={apiKey === null}
              value={model}
            />
          </div>
        </div>
        <div className="col-span-4">
          <RunButton
            disabled={apiKey === null || loading || prompt === ''}
            onClick={run}
            loading={loading}
          />
        </div>
      </div>
    </>
  )
}

export default PromptRequest
