import React ,{useState}from 'react';
import Link from 'next/link'
import Router, { useRouter } from "next/router";

import { userLogout } from '../lib/auth-lib'


const Navbar = () => {

    const[toggle,settoggle] = useState(false)
    const router = useRouter();


    const logout = async () => {
        await userLogout();
        Router.replace("/")
    }

    const toggleMenu = () =>{
        settoggle(!toggle)
    }

    return (
        <nav>
            
            <div className="navbar">
            <Link href="/home"><h1 className="navbar__logo">STOCKS</h1></Link>
                <ul className={"navbar__links"+(toggle?' activate-nav':'')}>
                    <li className={router.pathname == "/home" ? "active" : null}>
                        <Link href="/home">Home</Link>
                    </li>
                    <li className={router.pathname == "/stocks" ? "active" : null}>
                        <Link href="/stocks">Search</Link>
                    </li>
                    <li >
                        <a onClick={logout} >Logout</a>
                    </li>

                </ul>
                <div onClick={toggleMenu} className={"burger" + (toggle?' toggle':'')}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </div>

        </nav>
    )

}

export default Navbar;