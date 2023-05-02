import { useContext, useState, useEffect } from 'react'
import NavController from '../../components/NavController'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../statekeeper/state';


function Login({handleLogin}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }).then((r) => {
            if (r.ok) {
              r.json().then((user) => handleLogin(user))
              navigate("/profile");
            } else {
              r.json().then((err) => {
                window.alert(err.message);
              });
            }
          })
          .catch((err) => {
            console.log(err);
            window.alert("Incorrect email or password, please try again");
          });
      }

    return (
        <>
            <h2>LogIn</h2>
            <form onSubmit={handleSubmit}>
                email:
                <br />
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="email"
                    type="text"
                    value={email}
                />
                <br />
                password:
                <br />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    type="password"
                    value={password}
                />
                <br />
                <button type='submit'>Log In</button>
            </form>
            <br />
            <h3>Create an Account for Free!</h3>
            <NavController path='/signup' text='Sign Up' />
        </>
    )
}

export default Login;