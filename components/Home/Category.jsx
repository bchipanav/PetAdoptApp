import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { db } from "./../../config/FirebaseConfig";
export default function Category({ category }) {
	const [categoryList, setCategoryList] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("Bird");
	useEffect(() => {
		GetCategories();
	}, []);
	const GetCategories = async () => {
		setCategoryList([]);
		const snapshot = await getDocs(collection(db, "Category"));
		// biome-ignore lint/complexity/noForEach: <explanation>
		snapshot.forEach((doc) => {
			console.log(doc.data());
			setCategoryList((categoryList) => [...categoryList, doc.data()]);
		});
	};
	return (
		<View
			style={{
				marginTop: 20,
			}}
		>
			<Text
				style={{
					fontFamily: "outfit-medium",
					fontSize: 20,
				}}
			>
				Category
			</Text>
			<FlatList
				data={categoryList}
				numColumns={4}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<TouchableOpacity
						onPress={() => {
							console.log(item.name);
							setSelectedCategory(item.name);
							category(item.name);
						}}
						style={{ flex: 1 }}
					>
						<View
							style={[
								styles?.container,
								selectedCategory === item.name &&
									styles?.selectedCategoryContainer,
							]}
						>
							<Image
								source={{ uri: item?.imageUrl }}
								style={styles?.sliderImage}
							/>
						</View>
						<Text
							style={{
								fontFamily: "outfit",
								textAlign: "center",
							}}
						>
							{item.name}
						</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	sliderImage: {
		width: 40,
		height: 40,
	},
	container: {
		backgroundColor: Colors.LIGHT_PRIMARY,
		padding: 15,
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 15,
		borderColor: Colors.PRIMARY,
		margin: 5,
	},
	selectedCategoryContainer: {
		backgroundColor: Colors.SECONDARY,
		borderColor: Colors.SECONDARY,
	},
});
