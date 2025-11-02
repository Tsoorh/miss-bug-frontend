
import { Link } from 'react-router-dom'
import { BugPreview } from './BugPreview'
import { useEffect, useState } from 'react'
import { bugLocalService } from '../services/bug.service.Local'

export function BugList({ bugs, onRemoveBug, onEditBug }) {
    const [allowedDetails,setAllowedDetails] = useState(true)
    const visCounts = bugLocalService.getVisitedBugsArr();


    useEffect(()=>{
        if(visCounts?.length >2) {
            setAllowedDetails(false)
            setTimeout(()=>{
                setAllowedDetails(true)
            },7000)    
        }
    },[visCounts])

    return (
        <ul className="bug-list">
            {bugs.map((bug) => (
                <li className="bug-preview" key={bug._id}>
                    <BugPreview bug={bug} />
                    <div>
                        <button
                            onClick={() => {
                                onRemoveBug(bug._id)
                            }}
                        >
                            x
                        </button>
                        <button
                            onClick={() => {
                                onEditBug(bug)
                            }}
                        >
                            Edit
                        </button>
                    </div>
                    {allowedDetails?
                    <Link to={`/bug/${bug._id}`}>Details</Link>
                    :<p>Wait a little</p>
}
                </li>
            ))}
        </ul>
    )
}
