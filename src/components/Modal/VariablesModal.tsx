import classNames from 'classnames'

interface Props {
  show: boolean
  closeModal: () => void
}

const VariablesModal: React.FC<Props> = ({ show, closeModal }) => {
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
          <h3 className="text-lg font-bold mb-4">Variables</h3>
          <div className="divider"></div>

          <div className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body">
              <div className="form-control w-full mb-2">
                <label className="label">
                  <span className="label-text">Name (required)</span>
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Variable name"
                    // onChange={handleApiKeyInputChange}
                    // value={apiKeyInput}
                    // disabled={apiKey !== null}
                    className={classNames('input', 'input-bordered', 'w-full')}
                  />
                </div>
              </div>

              <div className="form-control w-full mb-2">
                <label className="label">
                  <span className="label-text">Content (required)</span>
                </label>
                <div className="input-group">
                  <textarea
                    rows={2}
                    className="textarea textarea-bordered w-full resize-none"
                    placeholder="..."
                  ></textarea>
                </div>
              </div>
              <button className="btn btn-success">Save</button>
            </div>
          </div>
          <button className="btn btn-success btn-outline w-full">
            Add More
          </button>
        </div>
      </div>
    </>
  )
}

export default VariablesModal
