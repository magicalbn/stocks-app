import React, { useState , useEffect} from 'react';
import Router from 'next/router'

import Layout from '../frontend/components/Layout'
import Login from '../frontend/components/Login/login'
import Signup from '../frontend/components/Login/signup'
import  {userGetdetails} from '../frontend/lib/auth-lib'

const Index = () => {
    

    const [mail, setmail] = useState()
    const [password, setpassword] = useState()
    const [isLogin, setisLogin] = useState(true)
    const [isLoading, setisLoading] = useState(true)
    
    useEffect(() => {
        userGetdetails().then(user=>{
            if (user.user) Router.push('/home')
        }).catch(err=>{console.log(err.response.data);setisLoading(false)})
    }, [])

    return (
        <Layout title="Stocks | Log In" login>

            <div className="login-section">
                <div className="image">
                    
                </div>
                <div className="login">
                    <div className="login__card">
                        <div className="login__type">
                            <p className={"login-tab " + (isLogin?"active":"")} onClick={() => setisLogin(true)}>Log In</p>
                            <p className={"login-tab " + (!isLogin?"active":"")} onClick={() => setisLogin(false)}>Sign Up</p>
                        </div>
                        {       isLoading? <p className="loading">Checking login status . .</p>:(isLogin ? <Login /> : <Signup />) }
                    </div>
                </div>
            </div>

        </Layout>
    );
}

export default Index;