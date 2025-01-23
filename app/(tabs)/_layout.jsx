import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import React from "react";
import Colors from "../../constants/Colors";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.PRIMARY,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Inicio",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<Feather name="home" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="favorite"
				options={{
					title: "Favoritos",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<Feather name="heart" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="inbox"
				options={{
					title: "Mensajes",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<Feather name="mail" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Perfil",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<Feather name="user" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
