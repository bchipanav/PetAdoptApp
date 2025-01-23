import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { db } from "../../config/FirebaseConfig";
import Category from "./Category";
import PetListItem from "./PetListItem";

export default function PetListByCategory() {
	const [petList, setPetList] = useState([]);
	useEffect(() => {
		getPetList("Bird");
	}, []);
	const getPetList = async (categoryName) => {
		setPetList([]);
		const q = query(
			collection(db, "Pets"),
			where("category", "==", categoryName),
		);
		const querySnapshot = await getDocs(q);

		// biome-ignore lint/complexity/noForEach: <explanation>
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
			setPetList((petList) => [...petList, doc.data()]);
		});
	};
	return (
		<View>
			<Category category={(value) => getPetList(value)} />
			<FlatList
				data={petList}
				style={{ marginTop: 10 }}
				horizontal={true}
				renderItem={({ item, index }) => <PetListItem pet={item} />}
			/>
		</View>
	);
}
