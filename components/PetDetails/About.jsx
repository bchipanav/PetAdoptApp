import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Colors from "../../constants/Colors";
export default function About({ pet }) {
	const [readMore, setReadMore] = useState(true);
	return (
		<View style={{ padding: 20 }}>
			<Text
				style={{
					fontFamily: "outfit-medium",
					fontSize: 20,
				}}
			>
				About {pet.name}
			</Text>
			<Text
				numberOfLines={readMore ? 3 : 20}
				style={{
					fontFamily: "outfit",
					fontSize: 14,
				}}
			>
				{pet.about}
			</Text>
			<Pressable onPress={() => setReadMore(!readMore)}>
				<Text
					style={{
						fontFamily: "outfit-medium",
						fontSize: 14,
						color: Colors.PRIMARY,
					}}
				>
					{readMore ? "Read More" : "Show Less"}
				</Text>
			</Pressable>
		</View>
	);
}
