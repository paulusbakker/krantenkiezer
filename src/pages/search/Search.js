import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from "axios";
import "./Search.css";

function Search() {
    const {handleSubmit, register, watch} = useForm();
    const [option, setOption] = useState("title");
    const watchField = watch();
    const [searchTerm, setSearchTerm] = useState("");
    const [fetchedArticles, setFetchedArticles] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [loading, toggleLoading] = useState(false);
    const [results, toggleResults] = useState(true);
    const [noChange, toggleNoChange] = useState(false);
    const firstMount = useRef(true);
    let formSearchTerm;
    let papers = ['ad', 'nrc', 'parool', 'telegraaf', 'trouw', 'volkskrant'];
    let showDetails;
    let regex;
    let andArray;
    let filteredArticlesOnPapers = [];
    let filteredArticlesFinal = [];
    const history = useHistory();

    async function fetchData() {
        try {
            toggleLoading(true);
            toggleResults(true);
            const source = axios.CancelToken.source();
            const {data} = await axios.get(`https://newsdata.io/api/1/archive?apikey=${process.env.REACT_APP_API_KEY}&country=nl&${searchTerm}&page=${pageNumber}`, {
                cancelToken: source.token,
            });
            setFetchedArticles(fetchedArticles.concat(data.results));
            data.nextPage ? setPageNumber(pageNumber + 1) : toggleLoading(false);

            // request anuleren
            return function cleanup() {
                source.cancel();
            }
        } catch (e) {
            console.error(e)
        }
    }

    function filterData() {
        filteredArticlesOnPapers = [];
        // filter on the six national papers
        fetchedArticles.forEach(article => {
            if (papers.includes(article.source_id)) filteredArticlesOnPapers.push(article)
        })
        filteredArticlesFinal = [];

        // only standalone words count, for example when searching on 'Rutte', don't count results like 'pruttelen'
        if (option === "title") {
            // showDetails will contain search info on results screen
            showDetails = `titel: ${watchField.title.replace(/\s+/g, "+")}`;
            // regex for only standalone words, no word inside another word
            regex = new RegExp('\\b' + watchField.title.trim().toLowerCase() + '\\b');
            filteredArticlesOnPapers.forEach(article => {
                article.title.toLowerCase().search(regex) >= 0 && filteredArticlesFinal.push(article)
            })
        } else {
            showDetails = `hele artikel: ${watchField.and.replace(/\s+/g, " + ")}`;
            if (watchField.not && watchField.not.trim()) {
                showDetails += ` zonder ${watchField.not.replace(/\s+/g, " en zonder ")}`;
            }
            // seperate user input by spaces
            andArray = watchField.and.trim().toLowerCase().split(' ');
            // search per word
            andArray.forEach(andWord => {
                // regex for only standalone words, no word inside another word
                regex = new RegExp('\\b' + andWord + '\\b');
                // search whole article on standalone word, if found push to final results array
                filteredArticlesOnPapers.forEach(article => {
                    if ((article.title && article.title.toLowerCase().search(regex) >= 0) ||
                        (article.description && article.description.toLowerCase().search(regex) >= 0) ||
                        (article.content && article.content.toLowerCase().search(regex) >= 0))
                        filteredArticlesFinal.push(article)
                })
            })
        }
        // if results found then go to the results page, if not then error message
        filteredArticlesFinal.length ? history.push(`/results/${searchTerm}`, {
                filteredArticlesFinal: filteredArticlesFinal,
                showDetails: showDetails,
            })
            : toggleResults(false)
    }

    // prevent executing function on first mount, fetchData when searchTerm or pageNumber changes
    useEffect(() => {
        if (!firstMount.current) {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, searchTerm]);

    // toggle firstMount var after first mount, filter fetched data when loading has ended
    useEffect(() => {
        if (firstMount.current) {
            firstMount.current = false
        } else {
            !loading && filterData()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    function onSubmit() {
        // make search string for the news api
        switch (option) {
            case "title":
                formSearchTerm = "qInTitle=" + watchField.title.replace(/\s+/g, "%20");
                break;
            case "and":
                formSearchTerm = "q=" + watchField.and.replace(/\s+/g, "%20");
                if (watchField.not && watchField.not.trim()) {
                    formSearchTerm += "%20-" + watchField.not.replace(/\s+/g, "%20-");
                }
                break;
            default:
        }
        // only search when the user input has changed
        if (searchTerm !== formSearchTerm) {
            setSearchTerm(formSearchTerm);
            setPageNumber(0);
            toggleNoChange(false)
        } else toggleNoChange(true)
    }

    return <>
        <div className="break"></div>
        <div className="break"></div>
        <div className="break"></div>
        <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="search-form-header">Publicaties vinden met...</h2><br/>
            <label className="search-form-container">
                <h3 className="search-form-header">alleen in de titel zoeken</h3>
                <p className="search-form-label-p">bevat woord of zin:</p>
                <div className="search-form-input-text">
                    <input className="search-form-radio" type="radio" onChange={() => setOption("title")}
                           checked={option === "title"}/>
                    <input
                        className="search-form-input-field"
                        type="text"
                        {...register("title")}
                        id="title"
                        disabled={option !== "title"}
                    />
                </div>
                <span className="search-form-explanation">bv: sociaal pizza</span>
                <div className="break"></div>
                <h4 className="search-form-header">doorzoek hele artikelen</h4>
                <p className="search-form-label-p">bevat deze woorden:</p>
                <div className="search-form-input-text">
                    <input className="search-form-radio" type="radio" onChange={() => setOption("and")}
                           checked={option === "and"}/>
                    <input
                        className="search-form-input-field"
                        type="text"
                        {...register("and")}
                        // turn off when other option is selected
                        disabled={option !== "and"}
                        id="and"
                    />
                </div>
                <span className="search-form-explanation">bv: sociaal pizza</span><br/>

                <p className="search-form-label-p">woorden uitsluiten:</p>
                <div className="search-form-input-text">
                    <input className="search-form-radio-fake" disabled type="radio"/>
                    <input
                        className="search-form-input-field"
                        type="text"
                        {...register("not")}
                        // turn off when other option is selected
                        disabled={option === "title"
                        || (option === "and" && !watchField.and)
                        || (option === "and" && watchField.and && !watchField.and.trim())}
                        id="not"
                    />
                </div>
                <span className="search-form-explanation">bv: ansjovis kaas</span>
                <div className="break"></div>
                {loading && <p className="search-form-loading">please wait..</p>}
                {noChange && <p className="search-form-error">hierop is al gezocht, veranderen de zoekopdracht!</p>}
                {!results && <p className="search-form-error">geen resultaten, verander de zoekopdracht!</p>}
                <button
                    type="submit"
                    className="search-form-label-button"
                    // turn submit button on or off depending on valid user input and if it is fetching data
                    disabled={loading ||
                    (option === "title" && !watchField.title)
                    || (option === "title" && watchField.title && !watchField.title.trim())
                    || (option === "and" && !watchField.and)
                    || (option === "and" && watchField.and && !watchField.and.trim())}
                >
                    Zoeken
                </button>
            </label>
        </form>

    </>
        ;
}

export default Search;
