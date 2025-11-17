import { useEffect, useState } from "react";
import { authService } from "../services/auth/auth.service.js";
import { bugService } from "../services/bug.service.js";
import { useParams } from "react-router";
import { BugList } from "../cmps/BugList";

export function UserProfile() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [loggedinUser, _] = useState(authService.getLoggedinUser());

  const [userBugs, setUserBugs] = useState([]);

  useEffect(() => {
    loadBugs()
  }, [])

  async function loadBugs() {
      const bugs = await bugService.getByUserId(userId);
      setUserBugs(bugs);
      setIsLoading(false);
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



  return (
    <div className="user-profile">
      <section className="user-details">
        <h1>My details</h1>
        <p>Full name: {loggedinUser.fullname}</p>
        <p>Score: {loggedinUser.score}</p>
      </section>

      <section className="user-bugs">
        {isLoading ? (
          "Loading bugs...."
        ) : userBugs.length === 0 ? (
          "No bugs created by you! go to create one! "
        ) : (
          <BugList bugs={userBugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
        )}
      </section>
    </div>
  );
}
