import { LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { AppContext } from "../context/AppContext.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { validateEmail } from "../util/validation.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {setUser } = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // basic validation
        if(!validateEmail(email)){
            setError("Please enter your valid email address");
            setIsLoading(false);
            return;
        }
        
        if(!password.trim()){
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }
        
        setError("");

        // LOGIN API call
        try{
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            })
            const {token, user} = response.data;
            if(token){
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        }catch(err){
            if(err.response && err.response.data.message){
                setError(err.response.data.message);
            }else{
                console.error("Something went wrong");
                setError(err.message);
            }
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-black">
            {/* Background image with blur */}
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm opacity-30" />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Log In to Your Account
                    </h3>

                    <p className="text-sm text-gray-700 text-center mb-8">
                        Enter your credentials to access your dashboard.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            placeholder="you@example.com"
                            type="email"
                        />

                        <Input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="Your secure password"
                            type="password"
                        />

                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button disabled={isLoading} className={`w-full py-3 text-lg font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Logging in...
                                </>
                            ): (
                                "LOGIN"
                            )}
                        </button>

                        <p className="text-sm text-black text-center mt-6">
                            New here?
                            <Link to="/signup" className="font-medium text-black underline hover:text-gray-700 transition-colors ml-1">
                                Create Account
                            </Link>
                        </p>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;
