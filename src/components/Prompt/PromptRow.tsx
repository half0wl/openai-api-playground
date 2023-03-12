import PromptRequest from './PromptRequest'
import PromptResponse from './PromptResponse'
import { QueryType } from '@/openai'
import { AxiosResponse } from 'axios'
import { useState } from 'react'

interface Props {
  apiKey: string | null
}

const PromptRow: React.FC<Props> = ({ apiKey }) => {
  const [response, setResponse] = useState<AxiosResponse | null>(null)
  const [queryType, setQueryType] = useState<QueryType>('ChatCompletion')

  return (
    <>
      <div className="grid grid-cols-12 gap-3 mb-6">
        <div className="col-span-6">
          <PromptRequest
            apiKey={apiKey}
            setResponse={setResponse}
            setQueryType={setQueryType}
          />
        </div>
        <div className="col-span-6">
          <PromptResponse queryType={queryType} response={response} />
        </div>
      </div>
      <div className="divider"></div>
    </>
  )
}

export default PromptRow
