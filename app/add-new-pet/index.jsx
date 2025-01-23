import { useUser } from "@clerk/clerk-expo";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRouter } from "expo-router";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	ToastAndroid,
	View,
} from "react-native";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { db, storage } from "./../../config/FirebaseConfig";

export default function addNewPet() {
	const { user } = useUser();
	const router = useRouter();
	const navigation = useNavigation();
	const [image, setImage] = useState();
	const [loader, setLoader] = useState(false);
	const [formData, setFormData] = useState({ category: "Dogs", sex: "Male" });
	const [gender, setGender] = useState();
	const [categoryList, setCategoryList] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		GetCategories();
		navigation.setOptions({
			headerTitle: "Add New Pet",
		});
	}, []);

	const GetCategories = async () => {
		setCategoryList([]);
		const snapshot = await getDocs(collection(db, "Category"));
		// biome-ignore lint/complexity/noForEach: <explanation>
		snapshot.forEach((doc) => {
			setCategoryList((categoryList) => [...categoryList, doc.data()]);
		});
	};
	const handleInputChange = (fieldName, fieldValue) => {
		setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
	};

	const imagePicker = async () => {
		// biome-ignore lint/style/useConst: <explanation>
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	const onSubmit = () => {
		if (Object.keys(formData).length !== 8) {
			ToastAndroid.show("Enter All Details", ToastAndroid.SHORT);
			return;
		}

		UploadImage();
	};
	const UploadImage = async () => {
		setLoader(true);
		const resp = await fetch(image);
		const blobImage = await resp.blob();
		const storageRef = ref(storage, `PetAdopt/${Date.now()}jpg`);
		uploadBytes(storageRef, blobImage)
			.then((snapshot) => {
				console.log("File uploaded");
			})
			.then((resp) => {
				getDownloadURL(storageRef).then(async (downloadUrl) => {
					console.log(downloadUrl);
					SaveFormData(downloadUrl);
				});
			});
	};
	const SaveFormData = async (imageUrl) => {
		const docId = Date.now().toString();
		await setDoc(doc(db, "Pets", docId), {
			...formData,
			imageUrl: imageUrl,
			userName: user.fullName,
			email: user.primaryEmailAddress.emailAddress,
			userImage: user?.imageUrl,
			id: docId,
		});
		setLoader(false);
		router.replace("/(tabs)/home");
	};

	return (
		<ScrollView
			style={{
				padding: 20,
			}}
		>
			<Text
				style={{
					fontFamily: "outfit-medium",
					fontSize: 20,
				}}
			>
				Add New Pet for adoption
			</Text>
			<Pressable onPress={imagePicker}>
				{!image ? (
					<Image
						source={{
							uri: "https://assets.animalclinic.org/wp-content/uploads/2019/05/paw-placeholder.webp",
						}}
						style={{
							height: 100,
							width: 100,
							borderRadius: 15,
							borderWidth: 1,
							borderColor: Colors.GRAY,
						}}
					/>
				) : (
					<Image
						source={{
							uri: image,
						}}
						style={{
							height: 100,
							width: 100,
							borderRadius: 15,
						}}
					/>
				)}
			</Pressable>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Pet Name *</Text>
				<TextInput
					placeholder="Pet Name"
					style={styles.input}
					onChangeText={(value) => handleInputChange("name", value)}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Category *</Text>
				<Picker
					selectedValue={selectedCategory}
					style={styles.input}
					onValueChange={(itemValue, itemIndex) => {
						setSelectedCategory(itemValue);
						handleInputChange("category", itemValue);
					}}
				>
					{categoryList.map((category, index) => (
						<Picker.Item
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							label={category.name}
							value={category.name}
						/>
					))}
				</Picker>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Age *</Text>
				<TextInput
					placeholder="Age"
					style={styles.input}
					keyboardType="numeric"
					onChangeText={(value) => handleInputChange("age", value)}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Sex *</Text>
				<Picker
					selectedValue={gender}
					style={styles.input}
					onValueChange={(itemValue, itemIndex) => {
						setGender(itemValue);
						handleInputChange("sex", itemValue);
					}}
				>
					<Picker.Item label="Male" value="Male" />
					<Picker.Item label="Female" value="Female" />
				</Picker>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Weight *</Text>
				<TextInput
					placeholder="Weight"
					style={styles.input}
					keyboardType="numeric"
					onChangeText={(value) => handleInputChange("weight", value)}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Breed *</Text>
				<TextInput
					placeholder="Breed"
					style={styles.input}
					onChangeText={(value) => handleInputChange("breed", value)}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Address *</Text>
				<TextInput
					placeholder="Address"
					style={styles.input}
					onChangeText={(value) => handleInputChange("address", value)}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>About *</Text>
				<TextInput
					placeholder="About"
					style={styles.input}
					numberOfLines={5}
					multiline={true}
					onChangeText={(value) => handleInputChange("about", value)}
				/>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={onSubmit}
				disabled={loader}
			>
				{loader ? (
					<ActivityIndicator size={"large"} />
				) : (
					<Text style={styles.buttonText}>Submit</Text>
				)}
			</TouchableOpacity>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 5,
	},
	input: {
		padding: 10,
		backgroundColor: Colors.WHITE,
		borderRadius: 7,
		fontFamily: "outfit",
	},
	label: {
		marginVertical: 5,
		fontFamily: "outfit",
	},
	button: {
		backgroundColor: Colors.PRIMARY,
		padding: 15,
		borderRadius: 7,
		marginVertical: 10,
		marginBottom: 50,
	},
	buttonText: {
		fontFamily: "outfit-medium",
		textAlign: "center",
	},
});
