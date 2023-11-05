import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProfileRightbar = ({ user }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [friends, setFriends] = useState([]);
	const { user: currentUser, dispatch } = useContext(AuthContext); //current logged user data, replaced to be called currentUser
	const [followed, setFollowed] = useState(false);
	useEffect(() => {
		//set follow
		setFollowed(currentUser.followings.includes(user ? user._id : ""));

		//get friends function
		const getFriends = async () => {
			try {
				const friendList = await axios.get(process.env.REACT_APP_API_URL + "/users/friends/" + user._id);
				setFriends(friendList.data); // axios `data` is the response that was provided by the server
			} catch (error) {
				console.log(error);
			}
		};
		if (user._id) {
			getFriends();
		}
	}, [currentUser, user]);

	const handleFollow = async () => {
		try {
			if (followed) {
				await axios.put(process.env.REACT_APP_API_URL + "/users/" + user._id + "/unfollow", {
					userId: currentUser._id,
				});
				dispatch({ type: "UNFOLLOW", payload: user._id });
			} else {
				await axios.put(process.env.REACT_APP_API_URL + "/users/" + user._id + "/follow", { userId: currentUser._id });
				dispatch({ type: "FOLLOW", payload: user._id });
			}
		} catch (error) {
			console.log(error);
		}
		setFollowed(!followed);
	};

	return (
		<>
			{user.username !== currentUser.username && (
				<button
					className="rightbarFollowButton"
					onClick={handleFollow}
				>
					{followed ? "Unfollow" : "Follow"}
					{followed ? <RemoveIcon /> : <AddIcon />}
				</button>
			)}
			<h4 className="rightbarTitle">User information</h4>
			<div className="rightbarInfo">
				<div className="rightbarInfoItem">
					<span className="rightbarInfoKey">City:</span>
					<span className="rightbarInfoValue">{user.city}</span>
				</div>
				<div className="rightbarInfoItem">
					<span className="rightbarInfoKey">From:</span>
					<span className="rightbarInfoValue">{user.from}</span>
				</div>
				<div className="rightbarInfoItem">
					<span className="rightbarInfoKey">Relationship:</span>
					<span className="rightbarInfValue">
						{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}
					</span>
				</div>
			</div>
			<hr className="rightbarFollowingHr" />
			<h4 className="rightbarTitle">User friends</h4>
			<div className="rightbarFollowings">
				{friends.map((friend) => (
					<Link
						to={"/profile/" + friend.username}
						key={friend._id}
						style={{ textDecoration: "none", color: "inherit" }}
					>
						<div className="rightbarFollowing">
							<img
								src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"}
								alt=""
								className="rightbarFollowingImg"
							/>
							<span className="rightbarFollowingName">{friend.displayName}</span>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

export default ProfileRightbar;
