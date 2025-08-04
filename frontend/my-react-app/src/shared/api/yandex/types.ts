type yandexSuggestionsResultItem ={
    title: {
        text: string
    },
    address: {
        formatted_address: string
    }
}

export type yandexSuggestions = {
    suggest_reqid: string,
    results: yandexSuggestionsResultItem[]
}