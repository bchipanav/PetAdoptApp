import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Header from "../../components/Home/Header";
import PetListByCategory from "../../components/Home/PetListByCategory";
import Slider from "../../components/Home/Slider";
import Colors from "../../constants/Colors";
export default function Home() {
	return (
		<View
			style={{
				padding: 20,
				marginTop: 20,
			}}
		>
			{/*Header*/}
			<Header />
			{/*Slider*/}
			<Slider />
			{/*PetList + Category*/}
			<PetListByCategory />
			{/*List*/}
			{/*Add Button*/}
			<Link
				href={"/add-new-pet"}
				style={{
					display: "flex",
					flexDirection: "row",
					gap: 10,
					alignItems: "center",
					padding: 20,
					marginTop: 15,
					textAlign: "center",
					backgroundColor: Colors.LIGHT_PRIMARY,
					borderWidth: 1,
					borderColor: Colors.PRIMARY,
					borderRadius: 15,
					borderStyle: "dashed",
					justifyContent: "center",
				}}
			>
				<MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
				<Text
					style={{
						color: Colors.PRIMARY,
						fontFamily: "outfit-medium",
						fontSize: 18,
					}}
				>
					Add New Pet
				</Text>
			</Link>
		</View>
	);
}
