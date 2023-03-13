import PromptRequest from './PromptRequest'
import PromptResponse from './PromptResponse'
import { QueryType } from '@/openai'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { Variable } from '../Modal/VariablesModal'

interface Props {
  apiKey: string | null
  variables: Variable[]
}

const PromptRow: React.FC<Props> = ({ apiKey, variables }) => {
  const [response, setResponse] = useState<AxiosResponse | null>(null)
  const [queryType, setQueryType] = useState<QueryType>('ChatCompletion')

  return (
    <>
      <div className="grid grid-cols-12 gap-3 mb-6">
        <div className="col-span-6">
          <PromptRequest
            apiKey={apiKey}
            variables={variables}
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
