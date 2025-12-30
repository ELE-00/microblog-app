
//EditProfileDialog.jsx
import React, {useState, useEffect} from 'react';
import '../styles/editProfileDialog.css'
import profilePic from '../assets/profilepic.jpg';
import bannerPic from '../assets/background.jpg';


const EditProfileDialog = ({profile, handleCloseEditProfile, handleSaveProfile, handleProfilePicUpload, handleBannerPicUpload}) => {

    console.log(profile.profile.name)

    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        occupation: "",
        location: "",
        dateOfBirth: ""

    })

    useEffect(() => {
        const dob = profile.profile.dateOfBirth
        ? profile.profile.dateOfBirth.split("T")[0]
        : "";

        setFormData({
            name: profile.profile.name,
            bio: profile.profile.bio,
            occupation: profile.profile.occupation,
            location: profile.profile.location,   
            dateOfBirth: dob   
        })
    }, [profile]);

    const handleChange = async (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    return (
         <div className="EPDialogWrapper">

            <div className="EPBannerContainer">
                
                
                {profile.profile.bannerPic? (
                <img src={profile.profile.bannerPic} alt="bannerPic"></img>
                ): (
                <img src={bannerPic} alt="bannerPic.jpg" ></img>     
                )}

                <input
                    type="file"
                    id="bannerfileInput"
                    name="bannerpic"
                    style={{ display: "none" }}
                    onChange={handleBannerPicUpload}
                />

                <button
                    type="button"
                    className="EPdialogBtn"
                    onClick={() => document.getElementById("bannerfileInput").click()}
                >
                    Edit Banner Picture
                </button>   

            </div>

            <div className="EPProfilePicContainer">

                {profile.profile.profilePic? (
                <img className="EPprofilePic" src={profile.profile.profilePic} alt="profilePic"></img>
                ): (
                <img className="EPprofilePic"src={profilePic} alt="profilepic.jpg" ></img>     
                )}

                <input
                    type="file"
                    id="profilefileInput"
                    name="profilepic"
                    style={{ display: "none" }}
                    onChange={handleProfilePicUpload}
                />

                <button
                    type="button"
                    className="EPdialogBtn"
                    onClick={() => document.getElementById("profilefileInput").click()}
                >
                    Edit Profile Picture
                </button>   

            </div>


            <div className="EPDialogFormContainer">
                <form className="EPForm">
                    <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange}></input>
                    <input type="date" placeholder="Date of birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}></input>
                    <input type="text" placeholder="Bio" name="bio" value={formData.bio} onChange={handleChange}></input>
                    <input type="text" placeholder="Occupation" name="occupation" value={formData.occupation} onChange={handleChange}></input>
                    <input type="text" placeholder="Location" name="location" value={formData.location} onChange={handleChange}></input>
                </form>

            </div>

        <div className="EPdialogFooterBtn">
            <button  className="EPdialogBtn" onClick={() => handleSaveProfile(formData)}>Save</button>
            <button  className="EPdialogBtn" onClick={() => handleCloseEditProfile()}>Close</button>
        </div>



        </div>
    )
}

export default EditProfileDialog;