import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import LoginPage from "./LoginPage"

const Login = () => {
    return (
        <>
            <div className="bg-gray-200 flex flex-col items-center justify-center min-h-screen">                
                <Header />
                <LoginPage />
                <Footer/>
            </div>
        </>
    )
}

export default Login