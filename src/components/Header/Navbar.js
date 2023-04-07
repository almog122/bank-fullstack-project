import { Link } from 'react-router-dom'
import CONSTANTS from "../../Constants.json";
import './Navbar.css'

export default function Navbar({balance}) {

  const balanceColor = function () {
    return balance > CONSTANTS.POSITIVE_BALANCE ? 'positive' : 'negative' 
  }

  return (
    <>
      <nav className="navBar">
        <Link to="/"> <div className='link'> Transactions </div> </Link>
        <Link to={`/operations`}> <div className='link'> Operations </div></Link>
        <Link to={`/breakdown`}> <div className='link'> Breakdown </div></Link>

        <div className={`balance ${balanceColor()}`}> balance : {balance}$ </div>

        <div className='logo'> Bank Logo </div>

      </nav>
    </>
  )
}
