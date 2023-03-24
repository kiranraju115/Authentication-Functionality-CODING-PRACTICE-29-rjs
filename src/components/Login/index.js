// Write your JS code here
import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const jwtToken = Cookies.get('jwt_token')
  const userDetails = {username: 'rahul', password: 'rahul@2021'}

  const setCookiesAndNavigateToHome = token => {
    const {history} = props

    Cookies.set('jwt_token', token, {
      expires: 30,
    })
    history.replace('/')
  }

  const onClickLogin = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      setCookiesAndNavigateToHome(data.jwt_token)
    }
  }
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login">
      <h1>Please Login</h1>
      <button type="button" onClick={onClickLogin}>
        Login with Sample Creds
      </button>
    </div>
  )
}

export default withRouter(Login)
