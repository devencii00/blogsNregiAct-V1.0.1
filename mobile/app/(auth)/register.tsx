import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Alert, Image } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [profile_image, setProfileImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  
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
      setProfileImage(result.assets[0]);
    }
  };

  // const handleRegistrations = async () => {
  //   const newErrors: any = {};
  //   if (!name) newErrors.name = ["Name is required"];
  //   if (!email) newErrors.email = ["Email is required"];
  //   if (!password) newErrors.password = ["Password is required"];
  //   if (password !== password_confirmation) newErrors.password_confirmation = ["Passwords do not match"];

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   setErrors({});

  //   try {
  //     await register({
  //       name,
  //       email,
  //       password,
  //       password_confirmation,
  //       profile_image
  //     });
  //   } catch (e) {
  //     Alert.alert("Registration Failed", "Something went wrong.");
  //   }
  // };

  const handleRegistration = async () => {
     const newErrors: any = {};
    if (!name) newErrors.name = ["Name is required"];
    if (!email) newErrors.email = ["Email is required"];
    if (!password) newErrors.password = ["Password is required"];
    if (password !== password_confirmation) newErrors.password_confirmation = ["Passwords do not match"];

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

   try {

    await register({
      name,
      email,
      password,
      password_confirmation,
      profile_image 
    });
  } catch (e: any) {
    if (e.response && e.response.status === 422) {
      setErrors(e.response.data.errors);
    } else {
      Alert.alert("Error", "Something went wrong.");
    }
  }
};

  return (
    <View className="flex-1 bg-pink-50 p-6 justify-center">

      <View className="bg-white p-8 w-full gap-4 rounded-3xl border border-pink-100 shadow-2xl shadow-pink-500/40">
        
        <Text 
          style={{ fontFamily: 'serif' }} 
          className="text-2xl font-bold text-center text-black underline underline-offset-4 decoration-pink-200 mb-2"
        >
          REGISTER ACCOUNT
        </Text>


        <View className="items-center mb-2">
          <TouchableOpacity
            onPress={pickImage}
            className="w-24 h-24 rounded-full bg-pink-100 justify-center items-center overflow-hidden border-2 border-dashed border-black-400"
          >
            {profile_image ? (
              <Image source={{ uri: profile_image.uri }} className="w-full h-full" />
            ) : (
              <Text style={{ fontFamily: 'serif' }} className="text-[10px] text-center text-pink-600 px-2 font-bold">
                Upload Photo
              </Text>
            )}
          </TouchableOpacity>
        </View>


        <View>
          <TextInput 
            value={name} 
            onChangeText={setName} 
            style={{ fontFamily: 'serif' }}
            placeholder="Full Name" 
            placeholderTextColor="#f472b6"
            className="h-11 px-4 border border-black-200 bg-pink-50/30 rounded-xl focus:border-pink-500" 
          />
          {errors.name && <Text style={{ fontFamily: 'serif' }} className="text-pink-500 text-[10px] mt-1 ml-1">{errors.name[0]}</Text>}
        </View>

        <View>
          <TextInput 
            value={email} 
            onChangeText={setEmail} 
            style={{ fontFamily: 'serif' }}
            placeholder="Email Address" 
            placeholderTextColor="#f472b6"
            keyboardType="email-address"
            autoCapitalize="none"
            className="h-11 px-4 border border-black-200 bg-pink-50/30 rounded-xl focus:border-pink-500" 
          />
          {errors.email && <Text style={{ fontFamily: 'serif' }} className="text-pink-500 text-[10px] mt-1 ml-1">{errors.email[0]}</Text>}
        </View>

        <View>
          <TextInput 
            value={password} 
            onChangeText={setPassword} 
            style={{ fontFamily: 'serif' }}
            placeholder="Password" 
            secureTextEntry 
            placeholderTextColor="#f472b6"
            className="h-11 px-4 border border-black-200 bg-pink-50/30 rounded-xl focus:border-pink-500" 
          />
          {errors.password && <Text style={{ fontFamily: 'serif' }} className="text-pink-500 text-[10px] mt-1 ml-1">{errors.password[0]}</Text>}
        </View>

        <View>
          <TextInput 
            value={password_confirmation} 
            onChangeText={setPasswordConfirmation} 
            style={{ fontFamily: 'serif' }}
            placeholder="Confirm Password" 
            secureTextEntry 
            placeholderTextColor="#f472b6"
            className="h-11 px-4 border border-black-200 bg-pink-50/30 rounded-xl focus:border-pink-500" 
          />
        </View>

        <TouchableOpacity 
          onPress={handleRegistration} 
          className="h-14 rounded-xl bg-pink-600 items-center justify-center mt-2 shadow-lg shadow-pink-200"
        >
          <Text style={{ fontFamily: 'serif' }} className="text-white font-bold text-lg">Create Account</Text>
        </TouchableOpacity>


        <Pressable onPress={() => router.navigate("/login")} className="mt-1">
          <Text 
            style={{ fontFamily: 'serif' }} 
            className="text-black-400 text-center underline underline-offset-2"
          >
            Back to Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
