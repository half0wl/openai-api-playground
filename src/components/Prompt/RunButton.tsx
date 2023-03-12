import { Icon, Spinner } from '@/components/Ui'

interface Props {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
}

const RunButton: React.FC<Props> = ({ onClick, loading, disabled }) => {
  return (
    <button
      className="btn btn-success btn-outline w-full mb-4"
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Icon name="run" />
          &nbsp; Run
        </>
      )}
    </button>
  )
}
export default RunButton
