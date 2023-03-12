import { Tab } from '@/components/Ui'
import { QueryType } from '@/openai'
import { AxiosResponse } from 'axios'
import { CreateChatCompletionResponse, CreateCompletionResponse } from 'openai'
import { useState } from 'react'
import { match } from 'ts-pattern'
import Textarea from './Textarea'

type Tab = 'Response' | 'Raw'

interface Props {
  queryType: QueryType
  response: AxiosResponse | null
}

const PromptResponse: React.FC<Props> = ({ queryType, response }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Response')

  if (response === null) {
    return (
      <>
        <div className="tabs">
          <Tab name="Response" disabled first />
          <Tab name="Raw" disabled />
        </div>
        <Textarea disabled />
      </>
    )
  }

  const formatResponseText = () => {
    // @TODO Should handle choices rendering better in the UI
    return match(queryType)
      .with('ChatCompletion', () => {
        const data = response.data as CreateChatCompletionResponse
        return data.choices
          .map((c) => {
            const contentString = c.message?.content
            if (!contentString) {
              return
            }
            return contentString.trimStart().trimEnd()
          })
          .join('\n\n')
      })
      .with('Completion', () => {
        const data = response.data as CreateCompletionResponse
        return data.choices
          .map((c) => {
            const contentString = c.text
            if (!contentString) {
              return
            }
            return contentString.trimStart().trimEnd()
          })
          .join('\n\n')
      })
      .exhaustive()
  }

  const Response = () => {
    return match(activeTab)
      .with('Response', () => (
        <Textarea readOnly value={formatResponseText()} />
      ))
      .with('Raw', () => (
        <Textarea readOnly value={JSON.stringify(response.data, null, 2)} />
      ))
      .exhaustive()
  }

  return (
    <>
      <div className="tabs">
        <Tab
          name="Response"
          onClick={() => setActiveTab('Response')}
          active={activeTab === 'Response'}
          first
        />
        <Tab
          name="Raw"
          onClick={() => setActiveTab('Raw')}
          active={activeTab === 'Raw'}
        />
      </div>
      <Response />
    </>
  )
}

export default PromptResponse
