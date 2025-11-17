import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'
import { useState,useEffect } from 'react'
import { bugLocalService } from '../services/bug.service.Local.js'
import { authService } from '../services/auth/auth.service.js'


export function BugIndex() {
    const [bugs, setBugs] = useState([])
    const [filter,setFilter] = useState(bugLocalService.getDefaultFilter())


    useEffect(() => {
        loadBugs(filter)
    }, [filter])

    async function loadBugs() {
        const bugs = await bugService.query(filter)
        setBugs(bugs)
    }

    async function onRemoveBug(bugId) {
        try {
            await bugService.remove(bugId)
            console.log('Deleted Succesfully!')
            setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
            showSuccessMsg('Bug removed')
        } catch (err) {
            console.log('Error from onRemoveBug ->', err)
            showErrorMsg('Cannot remove bug')
        }
    }

    async function onAddBug() {
        const currentUser = authService.getLoggedinUser()
        if (!currentUser) return showErrorMsg('Please login'); 
        
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity?'),
            description: prompt('Bug description?'),
            createdAt:+new Date(),
            creator:{
                _id: currentUser._id,
                fullname: currentUser.fullname
            }
        }
        try {
            const savedBug = await bugService.save(bug)
            console.log('Added Bug', savedBug)
            setBugs(prevBugs => [...prevBugs, savedBug])
            showSuccessMsg('Bug added')
        } catch (err) {
            console.log('Error from onAddBug ->', err)
            showErrorMsg('Cannot add bug')
        }
    }

    async function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        try {
            const savedBug = await bugService.save(bugToSave)
            console.log('Updated Bug:', savedBug)
            setBugs(prevBugs => prevBugs.map((currBug) =>
                currBug._id === savedBug._id ? savedBug : currBug
            ))
            showSuccessMsg('Bug updated')
        } catch (err) {
            console.log('Error from onEditBug ->', err)
            showErrorMsg('Cannot update bug')
        }
    }

    function handleFilterChange(newFilter){
        setFilter(prevFil=>({...prevFil,...newFilter}))
    }

    return (
        <section >
            <h3>Bugs App</h3>
            <main>
                <button onClick={onAddBug}>Add Bug 🐞</button>
                <button onClick={()=>bugService.getBugsPDF()}>Get Bugs PDF🐞</button>
                <BugFilter filter={filter} handleFilterChange={handleFilterChange}/>
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
            </main>
        </section>
    )
}
