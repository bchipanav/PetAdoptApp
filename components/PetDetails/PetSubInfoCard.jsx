import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function PetSubInfoCard({ icon, title, value }) {
	return (
		<View style={styles.subContainer}>
			<Image
				source={icon}
				style={{
					width: 40,
					height: 40,
				}}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.mainText}>{title}</Text>
				<Text style={styles.subText}>{value}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	subContainer: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.WHITE,
		padding: 10,
		margin: 5,
		borderRadius: 8,
		gap: 10,
	},
	mainText: {
		fontFamily: "outfit",
		fontSize: 16,
		color: Colors.GRAY,
	},
	subText: {
		fontFamily: "outfit-medium",
		fontSize: 20,
	},
	textContainer: {
		flex: 1,
	},
});
