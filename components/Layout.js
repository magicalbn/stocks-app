import React from 'react';
import Head from 'next/head'




const Layout = (props) => {
    const { title } = props;
    return (
        <>
            <Head>
                {title && <title>{title}</title>}
                <link rel="preconnect" href="https://fonts.gstatic.com" />
               
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />

            </Head>
            
          {props.children}

            
        </>
    )
}

export default Layout;