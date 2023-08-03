import { useState } from "react"
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { FaSignInAlt } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { login } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password, } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector(
    (state) => state.auth
  )

  //NOTE: no need for useEffect here as we can catch the AsyncThunkAction rejection in our onSubmit or redirect them on the resolution
  // useEffect(() => {
  //   if(isError){
  //     toast.error(message)
  //   }

  //   //Redirect when logged in
  //   if(isSuccess || user){
  //     navigate('/')
  //   }

  //   dispatch(reset())
  // }, [isError, isSuccess, user, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
    .unwrap()
    .then((user) => {
      //NOTE: by unwrapping the AsyncThunkAction we can navigate the user after getting a good response from our Api or catch them
      toast.success(`Logged in as ${user.name}`)
      navigate('/')
    })
    .catch(toast.error)
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
     <section className="heading">
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Please login to view or report an Incidents</p>
     </section>

     <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input 
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder='Enter your email'
          required 
          />
        </div>
        <div className="form-group">
          <input 
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder='Enter your password'
          required 
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
     </section>
    </>
  )
}

export default Login