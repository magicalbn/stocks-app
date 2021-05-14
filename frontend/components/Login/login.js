import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import Input from '../UI/Input'
import Spinner from '../UI/Spinner'


import { userLogin } from '../../lib/auth-lib'


const Login = () => {



    const [inputform, setinputform] = useState(
        {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                isTouched: false,
                valid: false
            },
            password: {
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                isTouched: false,
                valid: false
            }
        }
    )

    const [formValidation, setformValidation] = useState(false)
    const [error, seterror] = useState(null)
    const [isLoading, setisLoading] = useState(false)

    const changeHandler = (event, identifier) => {
        if (error) seterror(null)
        const allelements = { ...inputform }
        const newelement = allelements[identifier]

        newelement.value = event.target.value;
        newelement.isTouched = true;



        let valid = checkValidation(newelement)

        newelement.valid = valid;

        allelements[identifier] = newelement


        let formValid = checkFormValidation(allelements)

        setformValidation(formValid)
        setinputform(allelements)

    }

    const checkValidation = (element) => {
        let isValid = true;
        const { validation } = element

        if (!validation.required)
            return true
        else {

            isValid = element.value.trim() != ""

            if (validation.isEmail && isValid) {
                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                isValid = re.test(element.value);
            }

            if (validation.min && isValid) {
                isValid = element.value.length > validation.min;
            }
            if (validation.max && isValid) {
                isValid = element.value.length <= validation.max;
            }

        }
        return isValid;

    }

    const checkFormValidation = (allelements) => {
        for (let key in allelements) {
            // console.log(key, allElements[key].valid)
            if (!allelements[key].valid) {
                //  console.log(key, allElements[key].valid );
                return false;
            }
        }
        return true;
    }

    const loginHandler = () => {
        seterror(null)
        setisLoading(true)
        const body = {
            username: inputform.email.value,
            password: inputform.password.value
        }
        userLogin(body).
            then(msg => {
                console.log(msg)

                Router.push('/home')
            }).catch(err => {
                seterror(err.response)
                setisLoading(false)
            })
    }

    const demoLogin = () => {
        const body = {
            username: "test@test.cm",
            password: "@123test"
        }
        userLogin(body).
            then(msg => {
                console.log(msg)

                Router.push('/home')
            }).catch(err => {
                seterror(err.response)
                setisLoading(false)
            })
    }


    let FormElements = [];

    for (let key in inputform) {
        FormElements.push({
            id: key,
            config: inputform[key]
        })
    }


    return (
        <div className="login-form">

            <form>
                {
                    FormElements.map(each => {
                        return <Input key={each.id} config={each.config} changed={(event) => changeHandler(event, each.id)} />
                    })
                }
                {error ? <p className="error">{error.data || "Some Error Occuered"}</p> : null}
                <div className={"login-btn btn " + (formValidation && !isLoading ? "valid" : "")} onClick={formValidation ? loginHandler : null}>{isLoading ? <Spinner /> : "Login"}</div>
            </form>

            <span className="demo-btn btn" onClick={demoLogin}>Demo Login</span>

        </div>
    )
}

export default Login;