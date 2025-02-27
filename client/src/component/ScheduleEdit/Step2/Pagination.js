import React from "react";
import { useState } from "react";

function Pagination({totalPosts,postsPerPage, setCurrentPage,currentPage})
{
    let pages=[];
    let numShow = 5;
    const maxPage = Math.ceil(totalPosts/postsPerPage)
    const [currentNum, setCurrentNum] = useState(1);
    const handlePrevClick = () => {
        if((currentPage-1) % numShow === 0)
            {
                setCurrentNum(currentNum-1)
                alert('warning')
            }
            setCurrentPage(currentPage-1)
        };
    
    const handleNextClick = () => {
        if((currentPage) % numShow === 0)
            {
                setCurrentNum(currentNum+1)
                alert('Geser')
            }
            setCurrentPage(currentPage+1)
        };
        
    for(let i= (numShow * currentNum)-(numShow-1); i<=(maxPage < numShow * currentNum ? maxPage : numShow * currentNum); i++)
    {
        pages.push(i);
    }
    return(
        <div className="flex justify-center items-center gap-2">
            <button onClick={handlePrevClick} className={`w-12 h-8 rounded-xl flex justify-center items-center bg-ourLime ${currentPage===1?"hidden": ""} hover:scale-110 duration-300 ease-in-out transition`}>Prev</button>
            {pages.map((page,index)=>{
                return <button key={index} onClick={()=>setCurrentPage(page)} className={`w-8 h-8 rounded-xl bg-ourLime ${page === currentPage ? 'page-active' : ''} hover:scale-110 duration-300 ease-in-out transition`} >{page} </button>
            })}
            <button onClick={handleNextClick} disabled={currentPage === maxPage} className={`w-12 h-8 rounded-xl flex justify-center items-center bg-ourLime ${currentPage===maxPage?"hidden": ""} hover:scale-110 duration-300 ease-in-out transition`}>Next</button>
        </div>
    )
}
export default Pagination;