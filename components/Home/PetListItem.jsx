import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import MarkFav from "../MarkFav";

export default function PetListItem({ pet }) {
	const router = useRouter();
	return (
		<TouchableOpacity
			onPress={() => router.push({ pathname: "/pet-details", params: pet })}
			style={{
				padding: 10,
				marginRight: 15,
				backgroundColor: Colors.WHITE,
				borderRadius: 10,
			}}
		>
			<View
				style={{
					position: "absolute",
					zIndex: 10,
					right: 10,
					top: 10,
				}}
			>
				<MarkFav pet={pet} color={"white"} />
			</View>
			<Image
				source={{ uri: pet?.imageUrl }}
				style={{
					width: 150,
					height: 135,
					objectFit: "cover",
					borderRadius: 10,
				}}
			/>
			<Text
				style={{
					fontFamily: "outfit-medium",
					fontSize: 18,
				}}
			>
				{pet.name}
			</Text>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						fontFamily: "outfit",
						color: Colors.GRAY,
					}}
				>
					{pet.breed}
				</Text>
				<Text
					style={{
						fontFamily: "outfit",
						color: Colors.PRIMARY,
						backgroundColor: Colors.LIGHT_PRIMARY,
						paddingHorizontal: 9,
						borderRadius: 10,
						fontSize: 11,
					}}
				>
					{pet.age} YRS
				</Text>
			</View>
		</TouchableOpacity>
	);
}
