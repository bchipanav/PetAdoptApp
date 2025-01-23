import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import About from "../../components/PetDetails/About";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import { db } from "../../config/FirebaseConfig";
import Colors from "../../constants/Colors";

export default function PetDetails() {
	const pet = useLocalSearchParams();
	const navigation = useNavigation();
	const { user } = useUser();
	const router = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		navigation.setOptions({
			headerTransparent: true,
			headerTitle: "",
		});
	}, []);
	const InitiateChat = async () => {
		const docId1 = `${user.primaryEmailAddress.emailAddress}_${pet.emailAddress}`;
		const docId2 = `${pet.emailAddress}_${user.primaryEmailAddress.emailAddress}`;

		const q = query(
			collection(db, "Chat"),
			where("id", "in", [docId1, docId2]),
		);
		const querySnapshot = await getDocs(q);
		// biome-ignore lint/complexity/noForEach: <explanation>
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
			router.push({
				pathname: "/chat",
				params: { id: doc.id },
			});
		});
		if (querySnapshot.docs?.length === 0) {
			await setDoc(doc(db, "Chat", docId1), {
				id: docId1,
				users: [
					{
						email: user.primaryEmailAddress.emailAddress,
						imageUrl: user.imageUrl,
						name: user.fullName,
					},
					{
						email: pet.userEmail,
						imageUrl: pet.userImage,
						name: pet.userName,
					},
				],
				userIds: [user.primaryEmailAddress.emailAddress, pet.userEmail],
			});
			router.push({
				pathname: "/chat",
				params: { id: docId1 },
			});
		}
	};
	return (
		<View>
			<ScrollView>
				{/* Pet Info */}
				<PetInfo pet={pet} />
				{/* Pet Properties */}
				<PetSubInfo pet={pet} />
				{/* about */}
				<About pet={pet} />
				{/* Owner Details */}
				<OwnerInfo pet={pet} />
				{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
				<View style={{ height: 80 }}></View>
				<View style={styles.bottomContainer}>
					<TouchableOpacity style={styles.adoptBtn} onPress={InitiateChat}>
						<Text style={styles.textBtn}>Adopt Me</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			{/* Adopt me button */}
		</View>
	);
}

const styles = StyleSheet.create({
	adoptBtn: {
		padding: 15,
		backgroundColor: Colors.PRIMARY,
	},
	bottomContainer: {
		position: "absolute",
		width: "100%",
		bottom: 0,
	},
	textBtn: {
		textAlign: "center",
		fontFamily: "outfit-medium",
		fontSize: 20,
	},
});
