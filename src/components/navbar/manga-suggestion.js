import { useEffect } from "react"

const MangaSuggestion = (props) => {

    const {manga,handleSuggestionClick} = {...props}

    return(
        <div className="manga-suggestion" onClick={()=>{
            handleSuggestionClick(manga[6])
        }}>
            {manga[0]}
        </div>
    )
}

export default MangaSuggestion;