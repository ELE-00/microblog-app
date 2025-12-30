//Profile.jsx
import React, {useState, useEffect} from 'react';
import '../styles/profile.css'
import { useAuth } from '../context/AuthContext.jsx';
import { useParams } from 'react-router-dom';

import ProfileCard from '../components/profileCard.jsx';
import FeedItem from '../components/FeedItem.jsx';
import { getUserData } from '../api/auth.js';
import { deletePostById } from '../api/auth.js';
import { followUser, unfollowUser, removeFollower, getfollowers, getfollowing } from '../api/auth.js';
import FollowDialog from '../components/FollowDialog.jsx';
import EditProfileDialog from '../components/EditProfileDialog.jsx';
import { UpdateProfileData, uploadProfileImage, uploadBannerImage } from '../api/auth';

const Profile = () => {
   
    const { user, currentUserProfile, currentUserPosts, updateProfilePic, updateBannerPic, updateProfileData, updatePosts} = useAuth();


    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [openfollowDialog, setOpenFollowDialog] = useState(false);
    const [dialogType, setDialogType] = useState(null)
    const [actionStatus, setActionStatus] = useState(false)
    const [editProfileDialog, setEditProfileDialog] = useState(false)
    const [otherUserProfile, setOtherUserProfile] = useState(null);
    const [otherUserPosts, setOtherUserPosts] = useState([]);

    const { id } = useParams();
    const isMe = Number(id) === user?.id;
    const targetUserId = isMe ? user?.id : Number(id);
    const profile = isMe ? currentUserProfile : otherUserProfile;
    const posts = isMe ? currentUserPosts : otherUserPosts || [];

    useEffect(() => {
        if (isMe) return;

        const fetchOtherUser = async () => {
            try {
                const res = await getUserData(id);
                if (!res.data) return;

                setOtherUserProfile(res.data);
                setOtherUserPosts(res.data.posts || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchOtherUser();
    }, [id, isMe]);


    useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
        try {
        const followersRes = await getfollowers(targetUserId);
        setFollowers(followersRes.data);

        const followingRes = await getfollowing(targetUserId);
        setFollowing(followingRes.data);
        } catch (err) {
        console.log(err);
        }
    };

    fetchData();
    }, [targetUserId, actionStatus]);
    

    async function handleDeletePost(postId) {
        try{
            const res = await deletePostById(postId);
            updatePosts({ delete: true, id: postId });
        } catch (err) {
            console.log(err)
        }
    }


    function handleOpenFollowers() {
        setDialogType("followers");
        setOpenFollowDialog(true);
    }

    function handleOpenFollowing() {
        setDialogType("following");
        setOpenFollowDialog(true);
    }

    function handleClose() {
        setDialogType(null);
        setOpenFollowDialog(false);
    }
 

    //Handle remove followers
    async function handleRemoveFollower(userId) {
        try{
            await removeFollower(userId);
            setActionStatus(true)

        }catch(err) {
            console.log(err)
        }
    }

    //Handle follow user
    async function handleFollow(profileId) {
    try {
        const res = await followUser(profileId);
        setActionStatus(prev => !prev); // trigger refetch
        console.log("FOLLOW RESPONSE:", res);
    } catch (err) {
        console.log(err);
    }
    }

    //Handle unfollow user

    async function handleUnfollow(profileId) {
    try {
        const res = await unfollowUser(profileId);
        setActionStatus(prev => !prev); // triggers refetch
        console.error("FOLLOW ERROR:", err);
    } catch (err) {
        console.log(err);
    }
    }

    //Open edit profile dialog
    function handleOpenEditProfile(){
        setEditProfileDialog(true)
    }

    //Close edit profile dialog
    function handleCloseEditProfile(){
        setEditProfileDialog(false)
    }

    //UPDATE PROFILE
    async function handleSaveProfile(updatedProfileData) {
        try {
        await UpdateProfileData(updatedProfileData)
            updateProfileData(updatedProfileData);
        
        setEditProfileDialog(false);

        } catch (err) {
            console.log(err)
        }
    }



    async function handleProfilePicUpload(e) {
        const file = e.target.files[0];

        if(!file) return

            const formDataImage = new FormData();
            formDataImage.append("profilepic", file); 

        
        try {
            const res = await uploadProfileImage(formDataImage)
            console.log("Profile image uploaded:", res.data);

            updateProfilePic(res.data.profilePic)
            
        } catch(err) {
            console.log(err)
        }

    }


  async function handleBannerPicUpload(e) {
        const file = e.target.files[0];

        if(!file) return

            const formDataImage = new FormData();
            formDataImage.append("bannerpic", file); 

        
        try {
            const res = await uploadBannerImage(formDataImage)
            console.log("Banner image uploaded:", res.data);

            updateBannerPic(res.data.bannerPic)
    
        } catch(err) {
            console.log(err)
        }

    }

    return (
        <div>
            
            <div className="mainContent">
                {profile && (
                    <ProfileCard
                        profile={profile}
                        followers={followers}
                        following={following}
                        handleOpenEditProfile={isMe ? handleOpenEditProfile : undefined}
                        handleFollow={!isMe ? handleFollow : undefined}
                        handleUnfollow={!isMe ? handleUnfollow : undefined}
                        actionStatus={actionStatus} 
                        handleOpenFollowers={isMe ? handleOpenFollowers: undefined}       
                        handleOpenFollowing={isMe ? handleOpenFollowing: undefined}   
                    />
                )}
            </div>


            <div className="mainContent">
                {posts?.map(post => (
                    <FeedItem
                        key={post.id}
                        item={post}
                        handleDeletePost={isMe ? handleDeletePost : undefined}
                    />
                ))}
            </div>

            
            {openfollowDialog && (
                <dialog open className="followDialog">
                    <FollowDialog 
                    users = {dialogType === "followers" ? followers : following} 
                    type={dialogType}                  
                    handleClose={handleClose}
                    handleRemoveFollower={handleRemoveFollower}
                    handleUnfollow={handleUnfollow}   
    
                    >
                    </FollowDialog>
                </dialog>
            )}

            {editProfileDialog && (
                <dialog open className="followDialog" >
                    <EditProfileDialog 
                    handleCloseEditProfile={handleCloseEditProfile} 
                    profile={currentUserProfile} 
                    handleSaveProfile={handleSaveProfile}
                    handleProfilePicUpload={handleProfilePicUpload}
                    handleBannerPicUpload={handleBannerPicUpload}
                    >

                    </EditProfileDialog>
                </dialog>
            )}



        </div>
    );
}


export default Profile;