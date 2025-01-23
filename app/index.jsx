import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";
export default function Index() {
	const { user } = useUser();
	return (
		user && (
			<View
				style={{
					flex: 1,
				}}
			>
				<Text>{user?.fullName}</Text>
				{user ? (
					<Redirect href={"/(tabs)/home"} />
				) : (
					<Redirect href={"login"} />
				)}
			</View>
		)
	);
}
