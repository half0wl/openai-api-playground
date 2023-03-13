import classNames from 'classnames'
import { Variable } from './VariablesModal'

interface Props {
  variable: Variable
  removeVariable: (v: Variable) => void
}

const VariableItem: React.FC<Props> = ({ removeVariable, variable }) => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body">
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <div className="input-group">
              <input
                type="text"
                placeholder="Variable name"
                readOnly
                value={variable.name}
                className={classNames('input', 'input-bordered', 'w-full')}
              />
            </div>
          </div>

          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <div className="input-group">
              <textarea
                rows={2}
                className="textarea textarea-bordered w-full resize-none"
                readOnly
                value={variable.content}
                placeholder="..."
              ></textarea>
            </div>
          </div>

          <button
            className="btn btn-warning"
            onClick={() => removeVariable(variable)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  )
}

export default VariableItem
