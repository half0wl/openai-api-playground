import classNames from 'classnames'

interface Props {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  placeholder?: string
  readOnly?: boolean
  code?: boolean
}

const Textarea: React.FC<Props> = ({
  value,
  onChange,
  disabled,
  placeholder,
  readOnly,
  code,
}) => {
  return (
    <textarea
      rows={16}
      className={classNames(
        'textarea textarea-bordered w-full resize-none text-xl p-5',
        code && 'font-mono',
      )}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder ?? '...'}
      readOnly={readOnly}
    ></textarea>
  )
}

export default Textarea
