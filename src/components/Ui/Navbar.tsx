import Link from 'next/link'

const Navbar: React.FC = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link href="/" className="normal-case text-2xl p-0">
            OpenAI API Playground
          </Link>
        </div>
      </div>
      <div className="divider"></div>
    </>
  )
}

export default Navbar
