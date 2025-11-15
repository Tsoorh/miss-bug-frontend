import { useNavigate } from "react-router";
import { UserList } from "../cmps/UserList";
export function UserIndex(){
    const navigate = useNavigate();


    return(
        <section>
            <button onClick={()=>navigate("/user/edit")}>Add new user</button>
            <UserList/>
        </section>
        
    )
}