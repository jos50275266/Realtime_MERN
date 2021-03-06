import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase"

const Login = () => {
    const { dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState('jos50275266@gmail.com');
    const [password, setPassword] = useState('xxx');
    const [loading, setLoading] = useState(false);

    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { user }  = await auth.signInWithEmailAndPassword(email, password);
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })

            history.push('/');
        } catch (error) {
            console.log('Login Error', error);
            toast.error(error.message);
            setLoading(false);
        }
    
        // try {
        //     await auth.signInWithEmailAndPassword(email, password)
        //         .then(async result => {
        //             const { user } = result;
        //             const idTokenResult = await user.getIdTokenResult();

        //             dispatch({
        //                 type: "LOGGED_IN_USER",
        //                 payload: {
        //                     email: user.email,
        //                     token: idTokenResult.token
        //                 }
        //             });

        //             // Send user info to our server mongodb to either update/create

        //             history.push('/');
        //         });
        // } catch(error) {
        //     console.log('Login Error', error);
        //     toast.error(error.message);
        //     setLoading(false);
        // }

    }

    const googleLogin = async () => {
        const { user } = await auth.signInWithPopup(googleAuthProvider);
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
            type: "LOGGED_IN_USER",
            payload: {
                email: user.email,
                token: idTokenResult.token
            }
        })

        // Send user info to our server mongodb to either update/create
        history.push('/');

        // auth.signInWithPopup(googleAuthProvider)
        //     .then(async result => {
        //         const { user } = result;
        //         const idTokenResult = await user.getIdTokenResult();

        //         dispatch({
        //             type: "LOGGED_IN_USER",
        //             payload: {
        //                 email: user.email,
        //                 token: idTokenResult.token
        //             }
        //         });

        //         // Send user info to our server mongodb to either update/create

        //         history.push('/');
        //     });
    }

    return (
        <div className="container p-5">
                {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Login</h4>)}
                <button onClick={googleLogin} className="btn btn-raised btn-danger mt-5">Login with Google</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            className="form-control" 
                            type="email" 
                            value={email} 
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)} 
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            className="form-control" 
                            type="password" 
                            value={password} 
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)} 
                            disabled={loading}
                        />
                    </div>
                    <button className="btn btn-raised btn-primary" disabled={!email || !password || loading}>Submit</button>
                </form>
        </div>
    )
}

export default Login;