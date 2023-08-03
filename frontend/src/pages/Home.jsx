import { Link } from "react-router-dom"
import { FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'

function Home() {
  return (
   <>
   <section className="heading">
    <h1>Citizens Reporting Solution in which one can submit an incident e.g Accident, Fighting etc</h1>
    <p>Please choose from an option below</p>
   </section>

   <Link to='/new-ticket' className='btn btn-reverse btn-block'>
     <FaQuestionCircle />Report an Incident
   </Link>

   <Link to='/tickets' className='btn btn-block'>
     <FaTicketAlt />View your Incidents Reports
   </Link>

   </>
  )
}

export default Home