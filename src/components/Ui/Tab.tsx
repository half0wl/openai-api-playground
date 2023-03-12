import classNames from 'classnames'

interface Props {
  active?: boolean
  name: string
  onClick?: () => void
  disabled?: boolean
  first?: boolean
}

const Tab: React.FC<Props> = ({ active, name, onClick, disabled, first }) => {
  return (
    <span
      className={classNames(
        'tab text-xl',
        disabled && 'tab-disabled',
        active && 'tab-active',
        first && 'p-0',
      )}
      onClick={onClick}
    >
      {name}
    </span>
  )
}

export default Tab
