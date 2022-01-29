function FormatDatum(IsoDateString) {

    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };

    const date = IsoDateString ? new Date(IsoDateString) : new Date();
    return date.toLocaleString('nl-NL', dateOptions);
}

export default FormatDatum;