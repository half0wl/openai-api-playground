import { Icon } from '@/components/Ui'
import Link from 'next/link'

interface Props {
  openVariablesModal: () => void
  openSettingsModal: () => void
}

const itemClassNames =
  'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg ' +
  'dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full'

const Sidebar: React.FC<Props> = ({
  openVariablesModal,
  openSettingsModal,
}) => {
  return (
    <aside aria-label="Sidebar" className="fixed">
      <div className="h-full px-3 py-4 mb-3 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 d-flex">
          <li>
            <button className={itemClassNames} onClick={openSettingsModal}>
              Settings
            </button>
          </li>
          <li>
            <button
              className={itemClassNames}
              onClick={openVariablesModal}
            >
              Variables
            </button>
          </li>
        </ul>
      </div>
      <ul className="menu w-full">
        <li>
          <Link className="w-full" href="">
            GitHub
          </Link>
        </li>
        <li>
          <Link href="/">
            <span className="text-slate-600 text-sm flex items-center">
              <Icon name="arrow-up" h={18} w={18} />
              &nbsp; Scroll to top
            </span>
          </Link>
        </li>
      </ul>
    </aside>
  )
}
export default Sidebar
