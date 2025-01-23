import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function OwnerInfo({ pet }) {
	console.log({ pet });
	return (
		<View style={styles.mainContainer}>
			<View style={styles.subContainer}>
				<Image source={{ uri: pet.userImage }} style={styles.imageContainer} />
				<View>
					<Text style={styles.mainText}>{pet.userName}</Text>
					<Text style={styles.subText}>Pet Owner</Text>
				</View>
			</View>
			<Feather name="send" size={24} color={Colors.PRIMARY} />
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		marginHorizontal: 20,
		paddingHorizontal: 20,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
		borderWidth: 1,
		borderRadius: 15,
		padding: 20,
		borderColor: Colors.PRIMARY,
		backgroundColor: Colors.WHITE,
		justifyContent: "space-between",
	},
	subContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 20,
	},
	imageContainer: {
		width: 40,
		height: 40,
		borderRadius: 99,
	},
	mainText: { fontFamily: "outfit-medium", fontSize: 17 },
	subText: {
		fontFamily: "outfit",
		fontSize: 13,
		color: Colors.GRAY,
	},
});
