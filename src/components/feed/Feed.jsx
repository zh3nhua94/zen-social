import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
// import { Posts } from "../../dummyData"
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
	const [posts, setPosts] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = username
					? await axios.get(process.env.REACT_APP_API_URL + "/posts/profile/" + username)
					: await axios.get(process.env.REACT_APP_API_URL + "/posts/timeline/" + user._id);
				setPosts(
					res.data.sort((post1, post2) => {
						return new Date(post2.createdAt) - new Date(post1.createdAt);
					})
				);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchPosts();
	}, [username, user._id]);

	return (
		<div className="feed">
			<div className="feedWrapper">
				{(!username || username === user.username) && <Share />}
				{posts.map((p) => {
					return (
						<Post
							key={p._id}
							post={p}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Feed;
