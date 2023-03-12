import { Spinner } from '@/components/Ui'
import { isApiKeyValid } from '@/openai'
import classNames from 'classnames'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface Props {
  apiKey: string | null
  setApiKey: (apiKey: string | null) => void
  onSuccess: () => void
}

const SetApiKey: React.FC<Props> = ({ onSuccess, apiKey, setApiKey }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  const SaveApiKeyButton = (
    <button
      disabled={loading || input === ''}
      className="btn btn-success"
      onClick={async () => {
        if (input === '') {
          return
        }

        setLoading(true)

        const valid = await isApiKeyValid(input)

        if (valid) {
          setLoading(false)
          setInput('...')
          toast.success('API key successfully set')
          setApiKey(input)
          onSuccess()
          return
        }

        setLoading(false)
        setInput('')
        toast.error('Invalid API key')
      }}
    >
      {loading ? <Spinner /> : 'Save'}
    </button>
  )

  const ResetSavedApiKeyButton = (
    <button
      className="btn btn-info"
      onClick={() => {
        setInput('')
        setLoading(false)
        setApiKey(null)
      }}
    >
      Reset
    </button>
  )

  return (
    <>
      <div className="input-group">
        <input
          type="password"
          placeholder="Enter your OpenAI API key"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          disabled={apiKey !== null}
          className={classNames('input', 'input-bordered', 'w-full')}
        />
        {apiKey === null ? SaveApiKeyButton : ResetSavedApiKeyButton}
      </div>
    </>
  )
}

export default SetApiKey
