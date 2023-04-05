import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({currentUser}) {
  return (
    <>
      <nav className="navBar">
        <Link to="/"> <div> Home </div> </Link>
        <Link to={`/catalog/${currentUser}`}> <div> Catalog </div></Link>

        <div className='logo'> Reflix </div>

      </nav>
    </>
  )
}
