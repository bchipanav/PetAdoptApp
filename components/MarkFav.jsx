import { useUser } from "@clerk/clerk-expo";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import shared from "../shared/shared";

export default function MarkFav({ pet, color = "black" }) {
	const { user } = useUser();
	const [favList, setFavList] = useState();
	useEffect(() => {
		user && GetFav();
	}, [user]);
	const GetFav = async () => {
		const result = await shared.GetFavList(user);
		console.log(result);
		setFavList(result?.favorites ? result?.favorites : []);
	};
	const addToFav = async () => {
		const favResult = favList;
		favResult.push(pet.id);
		await shared.UpdateFav(user, favResult);
		GetFav();
	};

	const removeFromFav = async () => {
		const favResult = favList.filter((item) => item !== pet.id);
		await shared.UpdateFav(user, favResult);
		GetFav();
	};
	return (
		<View>
			{favList?.includes(pet.id) ? (
				<Pressable onPress={() => removeFromFav()}>
					<Entypo name="heart" size={30} color="red" />
				</Pressable>
			) : (
				<Pressable onPress={() => addToFav()}>
					<Entypo name="heart-outlined" size={30} color={color} />
				</Pressable>
			)}
		</View>
	);
}
