import { useEffect, useState } from "react";
import { authService } from "../services/auth/auth.service";
import { bugService } from "../services/bug.service";
import { useParams } from "react-router";

export function UserProfile() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [loggedinUser, _] = useState(authService.getLoggedinUser());

  const [userBugs, setUserBugs] = useState([]);

  useEffect(() => {
    setUserBugs(getBugs);
    setIsLoading(false);
  }, [userId]);

  async function getBugs() {
    return await bugService.query({ userId: userId });
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
          <BugList bugs={userBugs} />
        ) : (
          "No bugs created by you! go to create one! "
        )}
      </section>
    </div>
  );
}
