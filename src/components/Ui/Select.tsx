import {
  ChatCompletionModel,
  CompletionModel,
  ChatCompletionModels,
  CompletionModels,
  QueryType,
} from '@/openai'
import { match } from 'ts-pattern'

interface BaseProps<T> {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
  value: T
  options: T[]
}
type OptionSelectProps<T> = Omit<BaseProps<T>, 'options'>

const Select = <T extends string>({
  onChange,
  value,
  disabled,
  options,
}: BaseProps<T>) => {
  return (
    <select
      disabled={disabled}
      className="select select-bordered w-full"
      onChange={onChange}
      value={value}
    >
      {options.map((q) => (
        <option key={q}>{q}</option>
      ))}
    </select>
  )
}

const ChatCompletionModelSelect: React.FC<
  OptionSelectProps<ChatCompletionModel>
> = ({ onChange, value, disabled }) => {
  return (
    <Select<ChatCompletionModel>
      value={value}
      onChange={onChange}
      disabled={disabled}
      options={ChatCompletionModels}
    />
  )
}

const CompletionModelSelect: React.FC<OptionSelectProps<CompletionModel>> = ({
  onChange,
  value,
  disabled,
}) => {
  return (
    <Select<CompletionModel>
      value={value}
      onChange={onChange}
      disabled={disabled}
      options={CompletionModels}
    />
  )
}

interface ModelSelect
  extends OptionSelectProps<ChatCompletionModel | CompletionModel> {
  queryType: QueryType
}

const ModelSelect: React.FC<ModelSelect> = ({
  queryType,
  onChange,
  value,
  disabled,
}) => {
  return match(queryType)
    .with('ChatCompletion', () => (
      <ChatCompletionModelSelect
        value={value as ChatCompletionModel}
        onChange={onChange}
        disabled={disabled}
      />
    ))
    .with('Completion', () => (
      <CompletionModelSelect
        value={value as CompletionModel}
        onChange={onChange}
        disabled={disabled}
      />
    ))
    .exhaustive()
}

export default ModelSelect
