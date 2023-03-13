import { useState } from 'react'
import { toast } from 'react-hot-toast'
import classNames from 'classnames'
import { Variable } from './VariablesModal'

interface Props {
  addVariable: (v: Variable) => void
}

const AddNewVariableItem: React.FC<Props> = ({ addVariable }) => {
  const [name, setName] = useState<string>('')
  const [content, setContent] = useState<string>('')

  return (
    <>
      <div>
        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text">Name (required)</span>
          </label>
          <div className="input-group">
            <input
              type="text"
              placeholder="Variable name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={classNames('input', 'input-bordered', 'w-full')}
            />
          </div>
        </div>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Content (required)</span>
          </label>
          <div className="input-group">
            <textarea
              rows={2}
              className="textarea textarea-bordered w-full resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="..."
            ></textarea>
          </div>
        </div>
        <button
          className="btn btn-success w-full"
          disabled={name === '' || content === ''}
          onClick={() => {
            try {
              addVariable({ name, content })
            } catch (RangeError) {
              toast.error(`Variable already exists: ${name}`)
              return
            }
            setName('')
            setContent('')
          }}
        >
          Save
        </button>
      </div>
    </>
  )
}

export default AddNewVariableItem
