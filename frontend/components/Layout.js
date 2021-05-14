import React from 'react';
import Head from 'next/head'

import Navbar from './Navbar'


const Layout = (props) => {
    const { title } = props;
    return (
        <>
            <Head>
                {title && <title>{title}</title>}
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="icon" href="static/svg/increasing-stocks-graphic.svg" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />

            </Head>
            {props.login?null:<Navbar />}
          {props.children}

            
        </>
    )
}

export default Layout;