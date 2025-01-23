import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "expo-router";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
	Alert,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { db } from "../../config/FirebaseConfig";
import Colors from "../../constants/Colors";
import PetListItem from "./../../components/Home/PetListItem";
export default function UserPost() {
	const navigation = useNavigation();
	const { user } = useUser();
	const [loader, setLoader] = useState(false);
	const [userPostList, setUserPostList] = useState([]);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		navigation.setOptions({
			headerTitle: "User Post",
		});
		user && GetUserPost();
	}, [user]);
	const GetUserPost = async () => {
		setLoader(true);
		setUserPostList([]);
		const q = query(
			collection(db, "Pets"),
			where("email", "==", user.primaryEmailAddress.emailAddress),
		);
		const querySnapshot = await getDocs(q);
		// biome-ignore lint/complexity/noForEach: <explanation>
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
			setUserPostList((prev) => [...prev, doc.data()]);
		});
		setLoader(false);
	};
	const onDeletePush = (docId) => {
		Alert.alert(
			"Do you want to Delete?",
			"Do you really want to delete this post?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel click"),
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => deletePost(docId),
				},
			],
		);
	};
	const deletePost = async (docId) => {
		await deleteDoc(doc(db, "Pets", docId));
		GetUserPost();
	};
	return (
		<View
			style={{
				padding: 20,
			}}
		>
			<Text
				style={{
					fontFamily: "outfit-medium",
					fontSize: 30,
				}}
			>
				UserPost
			</Text>
			<FlatList
				data={userPostList}
				refreshing={loader}
				onRefresh={GetUserPost}
				numColumns={2}
				renderItem={({ item, index }) => (
					<View>
						<PetListItem pet={item} key={index} />
						<Pressable
							style={styles.deleteBtn}
							onPress={() => onDeletePush(item.id)}
						>
							<Text
								style={{
									fontFamily: "outfit",
									textAlign: "center",
								}}
							>
								Delete
							</Text>
						</Pressable>
					</View>
				)}
			/>
			{userPostList.length === 0 && <Text>No Post found</Text>}
		</View>
	);
}
const styles = StyleSheet.create({
	deleteBtn: {
		backgroundColor: Colors.LIGHT_PRIMARY,
		padding: 5,
		borderRadius: 7,
		marginTop: 5,
		marginRight: 10,
	},
});
