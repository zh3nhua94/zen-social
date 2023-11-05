import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Users } from "../../dummyData";
import axios from "axios";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
	const [user, setUser] = useState([]);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext);
	const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id));
	const like = post.likes.includes(currentUser._id) ? post.likes.length - 1 : post.likes.length;

	useEffect(() => {
		setIsLiked(post.likes.includes(currentUser._id));
	}, [currentUser._id, post.likes]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get(process.env.REACT_APP_API_URL + `/users?userId=${post.userId}`);
				setUser(res.data);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchUser();
	}, [post.userId]);

	const likeHandler = async () => {
		try {
			await axios.put(process.env.REACT_APP_API_URL + "/posts/" + post._id + "/like", { userId: currentUser._id });
		} catch (error) {}
		setIsLiked(!isLiked);
	};

	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`/profile/${user.username}`}>
							<img
								src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
								alt=""
								className="postProfileImg"
							/>
						</Link>
						<Link
							to={`/profile/${user.username}`}
							className="postUserNameLink"
						>
							<span className="postUserName">{user.displayName}</span>
						</Link>
						<span className="postDate">
							<TimeAgo date={post.createdAt} />
						</span>
					</div>
					<div className="postTopTight">
						<MoreVertIcon />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post.desc ? post.desc : ""}</span>
					{post.img ? (
						<img
							src={PF + post.img}
							alt=""
							className="postImg"
						/>
					) : (
						""
					)}
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img
							src={`${PF}like.png`}
							alt=""
							className="likeIcon"
							onClick={likeHandler}
						/>
						<img
							src={`${PF}heart.png`}
							alt=""
							className="likeIcon"
							onClick={likeHandler}
						/>
						<span className="postLikeCounter">
							{isLiked ? "You and " : ""}
							{like} people liked it
						</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">{post.comment} comments</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
