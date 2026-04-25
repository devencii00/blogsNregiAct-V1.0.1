import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import axios from "@/api/axios";
import { router } from "expo-router";

export default function Create() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<any>(null);
  const [description, setDescription] = useState("");

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleCreateBlog = async () => {
    try {
      axios.post(
        "/create/blog",
        { title, image: image?.file, description },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

   return (
    <View className="flex-1 bg-pink-50 p-6 justify-center">
      <View className="bg-white p-8 w-full gap-5 rounded-3xl border border-pink-100 shadow-2xl shadow-pink-500/40">
        
        <Text 
          style={{ fontFamily: 'serif' }} 
          className="text-2xl font-bold text-center text-black-600 underline underline-offset-4 decoration-pink-200 mb-2"
        >
          CREATE BLOG
        </Text>

        {/* Title Input */}
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={{ fontFamily: 'serif' }}
          placeholder="Blog Title"
          placeholderTextColor="#f472b6"
          className="h-12 px-4 border border-black-200 bg-pink-50/30 rounded-xl focus:border-pink-500"
        />

        {/* Description Input */}
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={{ fontFamily: 'serif' }}
          placeholder="Write your story..."
          placeholderTextColor="#f472b6"
          multiline
          className="h-24 px-4 py-3 border border-black-200 bg-pink-50/30 rounded-xl focus:border-pink-500 text-top"
        />

        {/* Image Picker Button */}
        <View>
          <TouchableOpacity
            onPress={pickImage}
            className="h-12 bg-pink-100 border border-dashed border-black-400 items-center justify-center rounded-xl"
          >
            <Text style={{ fontFamily: 'serif' }} className="text-pink-600 font-bold">
              {image ? "Change Image" : "Browse Image"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Image Preview */}
        {image && (
          <Image
            className="h-40 w-full rounded-2xl border border-pink-100"
            source={{ uri: image.uri }}
          />
        )}

        {/* Create Button */}
        <TouchableOpacity
          onPress={handleCreateBlog}
          className="h-14 rounded-xl bg-pink-600 items-center justify-center mt-2 shadow-lg shadow-pink-200"
        >
          <Text style={{ fontFamily: 'serif' }} className="text-white font-bold text-lg">
            Publish Post
          </Text>
        </TouchableOpacity>

        {/* Back Link */}
        <Pressable onPress={() => router.navigate("/home")} className="mt-2">
          <Text 
            style={{ fontFamily: 'serif' }} 
            className="text-black-400 text-center underline underline-offset-2"
          >
            Back to home
          </Text>
        </Pressable>
      </View>
    </View>
  );
}