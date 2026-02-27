//UserList.jsx
import React, {useState, useEffect} from 'react';
import { getAllUsers } from '../api/auth';
import '../styles/userList.css'
import UserCard from '../components/UserCard';
import { useNavigate } from 'react-router-dom';

function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState({content: ""});

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const res = await getAllUsers();
                setUsers(res.data);
            }catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])


    function handleOpenProfile(id) {
        navigate(`/profile/${id}`)
    }


    const handleChange = (e) => {
       setSearchInput({...searchInput, [e.target.name]: e.target.value})
               
    }

    const filteredUsers = () => {
        if(!searchInput.content) return users

        return users.filter(u => 
            u.username.toLowerCase().includes(searchInput.content.toLowerCase()))
    }


    console.log("filteredUsers: ", filteredUsers())
    console.log("users: ", users)


    return (
        <div className="userListWrapper">

            <div className="searchBarContainer">
                <form>
                    <input className="userSearchBar" placeholder='search' name="content" value={searchInput.content} onChange={handleChange}></input>
                </form>
            </div>



            <div className="userListContainer">
                {filteredUsers().map(user => (
                    <UserCard key={user.id} user={user} handleOpenProfile={handleOpenProfile}></UserCard>
                ))}
            </div>
        </div>
    )


}

export default UserList