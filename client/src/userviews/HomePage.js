// import NavButton from './NavButton'
import Login from '../userviews/auth/Login'
import NavBar from './NavBar'

export const Root = ({ onLogout, user }) => {
    if (user) {
        return (
            <>
                <NavBar onLogout={onLogout} />
                <h1>Welcome to VideoGameSocial!</h1>
                <Login />
            </>
        )
    } else {
        return <Login />;
    }

    // return (
    //     <div>
    //         <NavBar onLogout={onLogout} />
    //         <h1>Landing Page</h1>
    //         <Login />



    //         <br />
    //         <NavButton path="/signup" text="Sign Up" />


    //     </div>
    // )
}

export const NotFound = () => {
    return (
        <>
            {/* <NavButton /> */}
            <br />
            <h1>404 Not Found</h1>
        </>
    )

}