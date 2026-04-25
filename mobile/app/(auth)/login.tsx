import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import { router } from "expo-router";


export default function Login() {



  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    login({ email, password });
    const newErrors: { email?: string[]; password?: string[]; } = {};




    if (!email) {
      newErrors.email = ["Email is required"];``
    }



    if (!password) {
      newErrors.password = ["Password is required"];
    }




    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    login({ email, password });
  };



   return (
    <View className="flex-1 bg-pink-50 p-6 justify-center">

      <View className="bg-white p-8 w-full gap-6 rounded-3xl border border-pink-100 shadow-2xl shadow-pink-500/40">
        
        <Text 
          style={{ fontFamily: 'serif' }} 
          className="text-2xl font-bold text-center text-black underline underline-offset-4 decoration-pink-200 mb-2"
        >
          LOGIN TO YOUR ACCOUNT
        </Text>


        <View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{ fontFamily: 'serif' }}
            placeholder="Enter your email"
            placeholderTextColor="#f472b6"
            keyboardType="email-address"
            autoCapitalize="none"
            className="h-12 px-4 border border-black-200 bg-pink-50/30 rounded-xl focus:border-pink-500"
          />
          {errors.email && (
            <Text style={{ fontFamily: 'serif' }} className="text-pink-500 text-xs mt-1 ml-1">
              {errors.email[0]}
            </Text>
          )}
        </View>

        <View>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={{ fontFamily: 'serif' }}
            placeholder="Enter your password"
            placeholderTextColor="#f472b6"
            secureTextEntry
            className="h-12 px-4 border border-black-200 bg-pink-50/30 rounded-xl focus:border-pink-500"
          />
          {errors.password && (
            <Text style={{ fontFamily: 'serif' }} className="text-pink-500 text-xs mt-1 ml-1">
              {errors.password[0]}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          className="h-14 rounded-xl bg-pink-600 items-center justify-center mt-2 shadow-lg shadow-pink-200"
        >
          <Text style={{ fontFamily: 'serif' }} className="text-white font-bold text-lg">
            Login
          </Text>
        </TouchableOpacity>


        <Pressable onPress={() => router.navigate("/register")} className="mt-2">
          <Text 
            style={{ fontFamily: 'serif' }} 
            className="text-black-400 text-center underline underline-offset-2"
          >
            Register your account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}