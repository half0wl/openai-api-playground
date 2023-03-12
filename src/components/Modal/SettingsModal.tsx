import classNames from 'classnames'
import SetApiKey from './SetApiKey'

interface Props {
  apiKey: string | null
  setApiKey: (apiKey: string | null) => void
  show: boolean
  closeModal: () => void
}

const SettingsModal: React.FC<Props> = ({
  apiKey,
  setApiKey,
  show,
  closeModal,
}) => {
  return (
    <>
      <div className={classNames('modal', show && 'modal-open')}>
        <div className="modal-box relative">
          <button
            className="btn btn-square btn-sm absolute right-5 top-5"
            onClick={() => closeModal()}
          >
            x
          </button>
          <h3 className="text-lg font-bold mb-4">Settings</h3>
          <div className="divider"></div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">API Key (required)</span>
            </label>
            <SetApiKey
              apiKey={apiKey}
              setApiKey={setApiKey}
              onSuccess={() => closeModal()}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsModal
