import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useAuth } from "@/contexts/auth-context";

export default function Profile() {
  const { logout } = useAuth();
  const { user } = useAuth();

 return (
    <View className="flex-1 bg-pink-50 p-6 justify-center">
  
      <View className="bg-white p-8 w-full gap-6 rounded-3xl border border-pink-100 shadow-2xl shadow-pink-500/40 items-center">
        
        <Text 
          style={{ fontFamily: 'serif' }} 
          className="text-2xl font-bold text-center text-black underline underline-offset-4 decoration-pink-200 mb-2"
        >
          YOUR PROFILE
        </Text>

      
        <View className="shadow-lg shadow-pink-200">
          <Image
            className="h-32 w-32 rounded-full border-4 border-pink-100"
            source={{
              uri: `http://127.0.0.1:8000/storage/${user?.profile_image}`,
            }}
          />
        </View>


        <View className="w-full gap-3 mt-2">
          <View className="bg-pink-50/50 p-4 rounded-xl border border-black-100">
            <Text style={{ fontFamily: 'serif' }} className="text-gray-500 text-xs uppercase tracking-widest">Name</Text>
            <Text style={{ fontFamily: 'serif' }} className="text-black text-lg font-bold">{user?.name}</Text>
          </View>

          <View className="bg-pink-50/50 p-4 rounded-xl border border-black-100">
            <Text style={{ fontFamily: 'serif' }} className="text-gray-500 text-xs uppercase tracking-widest">Email</Text>
            <Text style={{ fontFamily: 'serif' }} className="text-black text-lg font-bold">{user?.email}</Text>
          </View>
        </View>

        {/* Logout Button matches Publish/Login style */}
        <TouchableOpacity
          onPress={logout}
          className="h-14 w-full rounded-xl bg-pink-600 items-center justify-center mt-4 shadow-lg shadow-pink-200"
        >
          <Text style={{ fontFamily: 'serif' }} className="text-white font-bold text-lg">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}