import { useEffect, useState } from "react"

export function BugFilter({filter,handleFilterChange}){
    const [filterBy,setFilterBy] =useState({...filter})

    useEffect(()=>{
        handleFilterChange(filterBy);
    },[filterBy])

    function onHandleChange(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        const {name,value} = ev.target;
        setFilterBy(prevFilter=> ({...prevFilter,[name]:value}))
    }

    return(
        <form className="flex flex-column align-start filter-form">
            <h2>Filter bugs</h2>
            <label htmlFor="txt">Title: </label>
            <input type="text" name="txt" value={filterBy.txt} onChange={onHandleChange}/>
            <label htmlFor="severity">Severity: </label>
            <input type="range" name="severity"  max={50} value={filterBy.severity} onChange={onHandleChange}/>
            <span>{filterBy.severity}</span>
        </form>
    )
}