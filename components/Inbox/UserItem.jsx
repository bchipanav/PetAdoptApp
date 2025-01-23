import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function UserItem({ userInfo }) {
	console.log({ userInfo });
	return (
		<Link href={`/chat?id=${userInfo.docId}`}>
			<View
				style={{
					marginVertical: 7,
					display: "flex",
					flexDirection: "row",
					gap: 10,
					alignItems: "center",
				}}
			>
				<Image
					source={{ uri: userInfo.imageUrl }}
					style={{
						width: 40,
						height: 40,
						borderRadius: 99,
					}}
				/>
				<Text
					style={{
						fontFamily: "outfit",
						fontSize: 20,
					}}
				>
					{userInfo.name}
				</Text>
			</View>
			{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
			<View
				style={{
					borderWidth: 0.2,
					marginVertical: 5,
					borderColor: Colors.GRAY,
				}}
			></View>
		</Link>
	);
}
