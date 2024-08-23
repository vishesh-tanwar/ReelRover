import { useCallback, useEffect, useState } from "react";
import "../styles/IMDB.css"



const Pagination = ({onPageChange}) => { 
    const totalpages = 150 ;  
    const maxvisiblepagecount = 10 ; 

    const [activePage,setactivePage] = useState(1);
    const [pages,setpages] = useState([]) ;

    function getPages (totalPages,maxvisiblepagecount,activepage) {
        const maxresultsize = totalPages > maxvisiblepagecount ? maxvisiblepagecount : totalPages;
        const startingpage = activepage + maxresultsize > totalPages ? totalPages - maxresultsize + 1 : activepage ; 
        return [...Array(maxresultsize)].map((_,idx)=>{
            return startingpage + idx  ; 
        }); 
    }

    const handlepage = useCallback((e) => { 
        let selectedpageno = 0  ; 
        if (e.target.dataset.id === "previous") {
            selectedpageno = activePage - 1 ; 
        }
        else if (e.target.dataset.id === "next") {
            selectedpageno = activePage + 1 ;
        }
        else {
            selectedpageno = Number(e.target.dataset.id) ;
        }  
        setactivePage(selectedpageno) ; 
        onPageChange(selectedpageno); 
    },[activePage , onPageChange]) ;

    useEffect(()=>{
        const newPages = getPages(totalpages,maxvisiblepagecount,activePage) ; 
        setpages(newPages);
    },[activePage])

    return (
        <div className="pageno">
            <button data-id={"previous"} disabled={activePage===1} onClick={handlepage}>Prev</button>
            {
                pages.map((num)=> (
                    <div data-id={num} className={`pagebox ${activePage === num ? 'active' : ''}`} onClick={handlepage}>{num}</div>
                ))
            } 
            <button data-id={"next"} disabled={activePage===totalpages} onClick={handlepage}>Next</button> 
        </div>
    )
}

export default Pagination ; 