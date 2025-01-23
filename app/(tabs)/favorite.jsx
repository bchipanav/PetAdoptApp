import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import PetListItem from "../../components/Home/PetListItem";
import { db } from "../../config/FirebaseConfig";
import shared from "../../shared/shared";

export default function Favorite() {
	const { user } = useUser();
	const [favIds, setFavIds] = useState([]);
	const [favPetList, setFavPetList] = useState([]);
	const [loader, setLoader] = useState(false);
	useEffect(() => {
		user && GetFavPetIds();
	}, [user]);
	//Fav Ids
	const GetFavPetIds = async () => {
		setLoader(true);
		const result = await shared.GetFavList(user);
		setFavIds(result?.favorites);
		setLoader(false);
		GetFavPetList(result?.favorites);
	};

	//Fetch Related Pet List
	const GetFavPetList = async (favId_) => {
		setLoader(true);
		setFavPetList([]);
		const q = query(collection(db, "Pets"), where("id", "in", favId_));
		const querySnapshot = await getDocs(q);
		// biome-ignore lint/complexity/noForEach: <explanation>
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
			setFavPetList((prev) => [...prev, doc.data()]);
		});
		setLoader(false);
	};
	return (
		<View
			style={{
				padding: 20,
				marginTop: 20,
			}}
		>
			<Text
				style={{
					fontFamily: "outfit-medium",
					fontSize: 30,
				}}
			>
				Favoritos
			</Text>
			<FlatList
				data={favPetList}
				numColumns={2}
				onRefresh={GetFavPetIds}
				refreshing={loader}
				renderItem={({ item, index }) => (
					<View>
						<PetListItem pet={item} />
					</View>
				)}
			/>
		</View>
	);
}
