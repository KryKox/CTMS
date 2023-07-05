import {Link} from "react-router-dom";
import { useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import '../styles/Register.scss';

export default function Register() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/register', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className="register-body login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Inscription</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Prénom"/>
          <input ref={emailRef} type="email" placeholder="Addresse email"/>
          <input ref={passwordRef} type="password" placeholder="Mot de passe"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="Confirmation mot de passe"/>
          <button className="btn btn-block">S'inscire</button>
          <p className="message">Déjà un compte ? <Link to="/login">Se connecter</Link></p>
        </form>
      </div>
    </div>
  )
}
