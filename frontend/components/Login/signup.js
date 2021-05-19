import React, { useState } from 'react';
import Input from '../UI/Input'
import Spinner from '../UI/Spinner'
import Infotag from '../UI/Infotag'


import { userLogin, userGetdetails, userRegister } from '../../lib/auth-lib'
const Signup = () => {

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
                    required: true,
                    min: 6,
                    
                },
                isTouched: false,
                valid: false
            },
            cpassword: {
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm password'
                },
                value: '',
                validation: {
                    required: true,
                    min: 6,
                    match: true
                },
                isTouched: false,
                valid: false
            }
        }
    )

    const [formValidation, setformValidation] = useState(false)
    const [error, seterror] = useState(null)
    const [success, setsuccess] = useState(null)
    const [isLoading,setisLoading] = useState(false)

    const changeHandler = (event, identifier) => {
        if(error) seterror(null)
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
            if (validation.match && isValid) {
                isValid = element.value == inputform.password.value;
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

    const registerHandler = () => {
        seterror(null)
        setsuccess(null)
        setisLoading(true)
        const body = {
            mail: inputform.email.value,
            password: inputform.password.value
        }
        userRegister(body).
            then(msg => {
                console.log(msg)                
                setsuccess(msg)
                setisLoading(false)
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
            <Infotag/>
            <form>
                {
                    FormElements.map(each => {
                        return <Input key={each.id} config={each.config} changed={(event) => changeHandler(event, each.id)} />
                    })
                }
                 {error?<p className="error">{error.data || "Some Error Occuered"}</p>:null}
                 {success?<p className="success">{success + ". Login to Continue . ."}</p>:null}
                <span className={"login-btn btn " + (formValidation && !isLoading ? "valid" : "")} onClick={formValidation ? registerHandler : null}>{isLoading?<Spinner/>:"Register"}</span>
            </form>

        </div>
    )
}

export default Signup;