import { useAuth, useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

export default function Profile() {
	const { user } = useUser();
	const { signOut } = useAuth();
	const Menu = [
		{
			id: 1,
			name: "Add New Pet",
			icon: "add-circle",
			path: "/add-new-pet",
		},
		{
			id: 5,
			name: "My Post",
			icon: "bookmark",
			path: "/user-post",
		},
		{
			id: 2,
			name: "Favorites",
			icon: "heart",
			path: "/(tabs)/favorite",
		},
		{
			id: 3,
			name: "Inbox",
			icon: "chatbubble",
			path: "/(tabs)/inbox",
		},
		{
			id: 4,
			name: "Logout",
			icon: "exit",
			path: "logout",
		},
	];
	const router = useRouter();
	const onPressMenu = (menu) => {
		if (menu === "logout") {
			signOut();
			return;
		}
		router.push(menu.path);
	};
	return (
		<View style={styles.mainContainer}>
			<Text style={styles.title}>Profile</Text>
			<View style={styles.subContainer}>
				<Image style={styles.image} source={{ uri: user.imageUrl }} />
				<Text style={styles.mainText}>{user.fullName}</Text>
				<Text style={styles.subText}>
					{user.primaryEmailAddress.emailAddress}
				</Text>
			</View>
			<FlatList
				data={Menu}
				renderItem={({ item, index }) => (
					<TouchableOpacity
						onPress={() => onPressMenu(item)}
						key={item.id}
						style={{
							marginVertical: 10,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: 10,
							backgroundColor: Colors.WHITE,
							padding: 10,
							borderRadius: 10,
						}}
					>
						<Ionicons
							style={{
								padding: 10,
								backgroundColor: Colors.LIGHT_PRIMARY,
								borderRadius: 10,
							}}
							name={item.icon}
							size={30}
							color={Colors.PRIMARY}
						/>
						<Text
							style={{
								fontFamily: "outfit",
								fontSize: 20,
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
	mainContainer: {
		padding: 20,
		marginTop: 20,
	},
	title: {
		fontFamily: "outfit-medium",
		fontSize: 30,
	},
	subContainer: {
		display: "flex",
		alignItems: "center",
		marginVertical: 25,
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 99,
	},
	mainText: {
		fontFamily: "outfit-bold",
		fontSize: 20,
		marginTop: 6,
	},
	subText: {
		fontFamily: "outfit",
		fontSize: 16,
		color: Colors.GRAY,
	},
});
