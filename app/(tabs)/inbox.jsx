import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import UserItem from "../../components/Inbox/UserItem";
import { db } from "../../config/FirebaseConfig";

export default function Inbox() {
	const { user } = useUser();
	const [userList, setUserList] = useState([]);
	const [loader, setLoader] = useState(false);
	useEffect(() => {
		user && GetUserList();
	}, [user]);
	//Get User List Depends on current user emails
	const GetUserList = async () => {
		setLoader(true);
		setUserList([]);
		const q = query(
			collection(db, "Chat"),
			where("userIds", "array-contains", user.primaryEmailAddress.emailAddress),
		);
		const querySnapshot = await getDocs(q);
		// biome-ignore lint/complexity/noForEach: <explanation>
		querySnapshot.forEach((doc) => {
			setUserList((prevList) => [...prevList, doc.data()]);
		});
		setLoader(false);
	};
	//Filter the list of other user in one state
	const MapOtherUserList = () => {
		const list = [];
		// biome-ignore lint/complexity/noForEach: <explanation>
		userList.forEach((record) => {
			const otherUser = record.users?.filter(
				(user) => user?.email !== user?.primaryEmailAddress?.emailAddress,
			);
			const result = {
				docId: record.id,
				...otherUser[0],
			};
			list.push(result);
			console.log({ list });
		});
		return list;
	};

	return (
		<View style={styles.main}>
			<Text style={styles.mainText}>Inbox</Text>
			<FlatList
				refreshing={loader}
				onRefresh={GetUserList}
				style={{
					marginTop: 20,
				}}
				data={MapOtherUserList()}
				renderItem={({ item, index }) => (
					<UserItem userInfo={item} key={index} />
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		padding: 20,
		marginTop: 20,
	},
	mainText: {
		fontFamily: "outfit-medium",
		fontSize: 30,
	},
});
