import { PromptRow } from '@/components/Prompt'
import { Navbar, Sidebar, Icon } from '@/components/Ui'
import { SettingsModal, VariablesModal } from '@/components/Modal'
import { Variable } from '@/components/Modal/VariablesModal'
import { range } from 'lodash'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

const Home: React.FC = () => {
  // Global state is stored in this component. This is fine for now because
  // it's small (`apiKey` is the only hard dependency); there's a tiiiny bit
  // of prop-drilling but not so much that it's a code smell. If we end up
  // adding more stuff, we should use useReducer or a state management library.

  const [apiKey, setApiKey] = useState<string | null>(null)

  const [variables, setVariables] = useState<Variable[]>([])
  const addVariable = (v0: Variable) => {
    if (v0.name === '' || v0.content === '') {
      throw new Error(`Variable name/content must not be empty`)
    }
    const existing = variables.find((v1) => v0.name === v1.name)
    if (existing) {
      throw new RangeError(`Variable already exists: ${v0.name}`)
    }
    setVariables((prev) => [...prev, v0])
  }
  const removeVariable = (v0: Variable) => {
    setVariables(variables.filter((v1) => v0.name !== v1.name))
  }

  const [promptRows, setPromptRows] = useState<number>(3)
  const incrementPromptRows = () => setPromptRows((p) => p + 1)

  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)
  const openSettingsModal = () => setShowSettingsModal(true)
  const closeSettingsModal = () => setShowSettingsModal(false)

  const [showVariablesModal, setShowVariablesModal] = useState<boolean>(false)
  const openVariablesModal = () => setShowVariablesModal(true)
  const closeVariablesModal = () => setShowVariablesModal(false)

  return (
    <>
      <Head>
        <title>OpenAI API Playground</title>
        <meta name="description" content="An alternative UI for playing with ChatGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SettingsModal
        apiKey={apiKey}
        setApiKey={setApiKey}
        show={showSettingsModal}
        closeModal={closeSettingsModal}
      />
      <VariablesModal
        variables={variables}
        show={showVariablesModal}
        addVariable={addVariable}
        removeVariable={removeVariable}
        closeModal={closeVariablesModal}
      />
      <div
        className={`app container mx-auto mt-12 p-3 pb-12 ${inter.className}`}
      >
        <Navbar />
        <main className="mt-6">
          <Toaster
            toastOptions={{
              className: 'mt-6',
            }}
          />
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-2 w-full">
              <Sidebar
                openVariablesModal={openVariablesModal}
                openSettingsModal={openSettingsModal}
              />
            </div>
            <div className="col-span-10 w-full">
              {range(promptRows).map((pr) => (
                <PromptRow key={pr} apiKey={apiKey} variables={variables} />
              ))}
              <button
                className="btn btn-success w-full"
                disabled={apiKey === null}
                onClick={incrementPromptRows}
              >
                <Icon name="plus" />
                &nbsp; Add Row
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
