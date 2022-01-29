import React, { useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import "./UserForms..css"

function SignUp() {
    const {handleSubmit, register, formState: {errors, isValid}, getValues} = useForm({mode: 'onChange'});
    const history = useHistory();
    const [axiosError, toggleAxiosError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function onSubmit(data) {
        console.log(data);
        try {
            const source = axios.CancelToken.source();
            toggleLoading(true);
            const result = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signup', {
                "username": data.username,
                "email": data.email,
                "password": data.password,
                role: ["user"],
            }, {
                cancelToken: source.token,
            })
            console.log(result);
            history.push('/signin');
            return function cleanup() {
                source.cancel(); // <--- request annuleren
            }

        } catch (e) {
            console.log('failed!');
            console.error(e.response.data.message);
            toggleAxiosError(true);
        }
        console.log('loaded');
        toggleLoading(false);
    }

    return (
        <>
            <div className="break"></div>
            <div className="break"></div>
            <div className="break"></div>
            <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="user-form-header">Inschrijven</h2>
                <div className="break"></div>
                <label className="user-form-label">
                    <p className="user-form-label-p">Email:</p>
                    <input
                        className="user-form-label-input"
                        type="email"
                        {...register("email", {
                            required: "mag niet leeg zijn",
                            pattern: {
                                // regex pattern for email
                                value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid Email'
                            }, minLength: {value: 6, message: "minstens 6 tekens"}
                        })}
                    />
                    {errors.email && <p className="user-form-error"> {errors.email.message}</p>}

                    <p className="user-form-label-p">Gebruikersnaam:</p>
                    <input
                        className="user-form-label-input"
                        type="text"
                        // username minimum length =6 as required by Novi backend
                        {...register("username", {
                            required: "mag niet leeg zijn",
                            minLength: {value: 6, message: "gebruikersnaam moet minstens 6 tekens bevatten"}
                        })}
                    />
                    {errors.username && <p className="user-form-error">{errors.username.message}</p>}

                    <p className="user-form-label-p">Wachtwoord:</p>
                    <input
                        className="user-form-label-input"
                        type="password"
                        // password minimum length =6 as required by Novi backend
                        {...register("password", {
                            required: "mag niet leeg zijn",
                            validate: () => getValues("password") === getValues("confirmPassword"),
                            minLength: {value: 6, message: "wachtwoord moet minstens 6 tekens bevatten"}
                        })}
                    />
                    {errors.password && errors.password.message &&
                    <p className="user-form-error">{errors.password.message}</p>}

                    <p className="user-form-label-p">Herhaal wachtwoord:</p>
                    <input
                        className="user-form-label-input"
                        type="password"
                        // password minimum length =6 as required by Novi backend
                        {...register("confirmPassword", {
                            required: "mag niet leeg zijn",
                            validate: () => getValues("password") === getValues("confirmPassword"),
                            minLength: {value: 6, message: "minstens 6 tekens"}
                        })}
                    />
                    {errors.confirmPassword && errors.confirmPassword.message &&
                    <p className="user-form-error">  {errors.confirmPassword.message}</p>}
                    {errors.password && errors.confirmPassword && errors.confirmPassword.type === "validate" &&
                    <p className="user-form-error">herhaal wachtwoord</p>}
                    {axiosError &&
                    <p className="user-form-error">Dit account bestaat al. Probeer een ander emailadres.</p>}
                    <div className="break"></div>
                    {loading && <p className="user-form-loading">please wait..</p>}
                    <button
                        className="user-form-label-button"
                        type="submit"
                        disabled={loading || !isValid}
                    >
                        Maak account aan
                    </button>
                    <p className="user-form-p">Heb je al een account? Je kunt je <Link
                        to="/signin">hier</Link> inloggen.</p>
                </label>


            </form>

        </>
    )
        ;
}

export default SignUp;
