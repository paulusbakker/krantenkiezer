import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {AuthContext} from "../../context/AuthContext";
import "./UserForms..css"

function SignIn() {

    const {login} = useContext(AuthContext);
    const {handleSubmit, register, formState: {errors, isValid}} = useForm({mode: 'onChange'});
    const [axiosError, toggleAxiosError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function onSubmit(data) {
        console.log(data);
        try {
            const source = axios.CancelToken.source();
            toggleLoading(true);
            const result = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signin', {
                "username": data.username,
                "password": data.password,
            }, {
                cancelToken: source.token,
            })
            login(data.username, result.data.accessToken);
            // request anuleren
            return function cleanup() {
                source.cancel();
            }
        } catch (e) {
            console.error(e.response);
            toggleAxiosError(true);
        }
        toggleLoading(false);
    }

    return (
        <>
            <div className="break"></div>
            <div className="break"></div>
            <div className="break"></div>
            <div className="break"></div>

            <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="user-form-header">Inloggen</h2>
                <div className="break"></div>
                <label className="user-form-label">
                    <p className="user-form-label-p">Gebruikersnaam:</p>
                    <input
                        className="user-form-label-input"
                        type="text"
                        // username minimum length =6 as required by Novi backend
                        {...register("username", {
                            required: "mag niet leeg zijn",
                            minLength: {value: 6, message: "minstens 6 tekens"}
                        })}
                    />
                    {errors.username && errors.username.message &&
                    <p className="user-form-error">{errors.username.message}</p>}

                    <p className="user-form-label-p">Wachtwoord:</p>
                    <input
                        className="user-form-label-input"
                        type="password"
                        // password minimum length =6 as required by Novi backend
                        {...register("password", {
                            required: "mag niet leeg zijn",
                            minLength: {value: 6, message: "minstens 6 tekens"}
                        })}
                    />
                    {errors.password && errors.password.message &&
                    <p className="user-form-error">{errors.password.message}</p>}
                    {axiosError && <p className="user-form-error">Deze combi is onbekend!</p>}
                    <div className="break"></div>
                    {loading && <p className="user-form-loading">please wait..</p>}
                    <button
                        className="user-form-label-button"
                        type="submit"
                        disabled={loading || !isValid}
                    >
                        Inloggen
                    </button>
                    <p className="user-form-p">Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan
                        eerst.
                    </p>
                </label>

            </form>

        </>
    );
}

export default SignIn;