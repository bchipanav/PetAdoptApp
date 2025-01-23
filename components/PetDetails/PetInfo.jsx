import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import MarkFav from "../MarkFav";
export default function PetInfo({ pet }) {
	return (
		<View>
			<Image
				source={{ uri: pet.imageUrl }}
				style={{
					width: "100%",
					height: 300,
					objectFit: "cover",
				}}
			/>
			<View style={styles.container}>
				<View style={styles.subContainer}>
					<View>
						<Text style={styles.name}>{pet.name}</Text>
						<Text style={styles.address}>{pet.address}</Text>
					</View>
					<MarkFav pet={pet} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	name: {
		fontFamily: "outfit-bold",
		fontSize: 27,
	},
	address: {
		fontFamily: "outfit",
		fontSize: 16,
		color: Colors.GRAY,
	},
	container: {
		padding: 20,
	},
	subContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
