import classNames from 'classnames'
import AddNewVariableItem from './AddNewVariableItem'
import VariableItem from './VariableItem'

export interface Variable {
  name: string
  content: string
}

interface Props {
  show: boolean
  closeModal: () => void
  variables: Variable[]
  addVariable: (v: Variable) => void
  removeVariable: (v: Variable) => void
}

const VariablesModal: React.FC<Props> = ({
  addVariable,
  variables,
  removeVariable,
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
          <h3 className="text-lg font-bold mb-4">Variables</h3>
          <div className="divider"></div>
          <AddNewVariableItem addVariable={addVariable} />
          <div className="divider" />
          {variables.map((v) => (
            <VariableItem
              key={v.name}
              variable={v}
              removeVariable={removeVariable}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default VariablesModal
