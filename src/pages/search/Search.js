import React, {useState} from 'react';
import styles from './Search.module.css';
import {useHistory} from 'react-router-dom';

function Search() {

    const newspapers = [
        {
            name: "Volkskrant",
            value: false,
        },
        {
            name: "Parool",
            value: false,
        },
        {
            name: "Trouw",
            value: false,
        },
        {
            name: "AD",
            value: false,
        },
        {
            name: "NRC",
            value: false,
        },
        {
            name: "Telegraaf",
            value: false,
        },
    ]
    const [searchTerm, setSearchTerm] = useState("")

    const [newspaper, toggleNewspaper] = useState(newspapers)

    const [error, setError] = useState("Selecteer tenminste 2 kranten")
    const history = useHistory();


    function handleSubmit(e) {
        console.log('Verstuurd');
        e.preventDefault();
        history.push("/results", {searchTerm});
    }

    function handleChange(evt) {
        const changedFieldName = evt.target.name;
        console.log(changedFieldName)

        if (changedFieldName === "searchTerm") {
            setSearchTerm(evt.target.value)

        } else {

            let updatedList = newspaper.map(item => {
                if (item.name === changedFieldName) {
                    return {...item, value: !item.value};
                } else return item;
            });
            console.log(searchTerm, newspaper)
            console.log("updatedlist", updatedList);

            toggleNewspaper(updatedList);

            let counter = 0;
            updatedList.map(item => item.value ? counter += 1 : counter += 0);
            console.log("counter", counter);

            if (counter < 2) {
                setError("Selecteer tenminste 2 kranten")
            } else {
                setError(" ")
            }
        }


    }

    return (
        <>
            <form className={styles.formStyling} onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Zoekgegevens</legend>
                    <label>Zoekterm</label>
                    <input
                        type="text"
                        name="searchTerm"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <br/><br/>
                    <div className={styles['checkbox-container']}>


                        {newspaper.map((item, index) => (
                                <span key={index} className={styles['checkbox-item']}>
                                <input type="checkbox" id={item.name} name={item.name} checked={item.value}
                                       onChange={handleChange}/>
                                <label htmlFor="paper">{item.name}</label>
                            </span>

                            )
                        )}
                        <span>{error}</span>
                        <input type="datetime-local" id="Test_DatetimeLocal"/>
                        <input type="datetime-local" id="Test_DatetimeLocal"/>

                    </div>
                    <button type='submit' disabled={error !== " "}>Versturen</button>
                </fieldset>
            </form>
        </>
    );
}

export default Search;
