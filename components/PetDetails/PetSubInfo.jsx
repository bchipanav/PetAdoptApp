import React from "react";
import { StyleSheet, View } from "react-native";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }) {
	return (
		<View style={styles.mainContainer}>
			<View style={styles.mainSubContainer}>
				<PetSubInfoCard
					icon={{ uri: "https://i.ibb.co/QXjbQyQ/calendar.png" }}
					title={"Age"}
					// biome-ignore lint/style/useTemplate: <explanation>
					value={pet.age + " Years"}
				/>
				<PetSubInfoCard
					icon={{ uri: "https://i.ibb.co/FWvmZdW/bone.png" }}
					title={"Breed"}
					value={pet.breed}
				/>
			</View>
			<View style={styles.mainSubContainer}>
				<PetSubInfoCard
					icon={{ uri: "https://i.ibb.co/kSNS3Bm/weight.png" }}
					title={"Weight"}
					// biome-ignore lint/style/useTemplate: <explanation>
					value={pet.weight + " Kg"}
				/>
				<PetSubInfoCard
					icon={{ uri: "https://i.ibb.co/CH1FVYD/sex.png" }}
					title={"Sex"}
					value={pet.sex}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		paddingHorizontal: 20,
	},
	mainSubContainer: {
		display: "flex",
		flexDirection: "row",
	},
});
