import React, {useContext} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {useForm} from 'react-hook-form';



function SignUp() {

    const {login} = useContext(AuthContext);
    const history = useHistory();
    const {handleSubmit, formState: {errors}, register} = useForm({mode: 'onBlur'});

    function onFormSubmit(e) {
        console.log(e);
        login();
        history.push('/');
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input
                    type='text'
                    id='email'
                    {...register('email', {
                        required: 'wachtwoord mag niet leeg zijn',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        },
                        value: "email adres"
                    })}
                />
                {errors.email && errors.email.message}

                <input
                    type='text'
                    id='password'
                    {...register('password', {
                        required: 'wachtwoord mag niet leeg zijn',
                        validate: value => value !== "admin" || "Nice try!",
                        value: 'wachtwoord'
                    })}
                />
                {errors.password && <div>{errors.password.message}</div>}

                <input
                    type='text'
                    id='username'
                    {...register('username', {
                        required: 'gebruikersnaam mag niet leeg zijn',
                        value: "gebruikersnaam"
                    })}
                />
                {errors.username && errors.username.message}
                <button type="submit">Registeren</button>

            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;