import { View, Text, Image, ScrollView, Pressable, Alert } from "react-native";
import { useAuth } from "@/contexts/auth-context";
import React, { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import axios from "@/api/axios";

type BlogProps = {
  id: number;
  title: string;
  image: string;
  description: string;
};

export default function Home() {
  const [blogs, setBlogs] = useState<BlogProps[]>([]);

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/fetchBlogs");
      setBlogs(response.data);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };

   useFocusEffect(
    useCallback(() => {
      getBlogs();
    }, [])
  );


 return (
    <ScrollView 
      className="flex-1 bg-white" // Clean white background
      showsVerticalScrollIndicator={false}
    >
      <View className="p-5">
        {/* Elegant Header Area */}
        <View className="flex-row justify-between items-center mb-6">
          <Text style={{ fontFamily: 'serif' }} className="text-2xl font-bold text-gray-800">
            Latest Stories
          </Text>
          <Pressable 
            onPress={() => router.navigate("/(default)/(pages)/home/create")}
            className="bg-pink-100 px-4 py-2 rounded-full border border-pink-200"
          >
            <Text style={{ fontFamily: 'serif' }} className="text-pink-600 font-bold text-xs">
              + Create
            </Text>
          </Pressable>
        </View>

        {/* Blog Feed */}
        <View className="gap-6">
          {blogs.map((blog) => (
            <Pressable 
              key={blog.id} 
              onPress={() => router.navigate(`/blogs/${blog.id}`)}
              className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-pink-200/50 border border-gray-100"
            >
              {/* Image with slight overlay/tint potential */}
              <Image
                className="h-52 w-full"
                source={{ uri: `http://127.0.0.1:8000/storage/${blog.image}` }}
              />
              
              <View className="p-4">
                <Text 
                  style={{ fontFamily: 'serif' }} 
                  className="text-lg font-bold text-gray-900 mb-1"
                >
                  {blog.title}
                </Text>
                
                <Text 
                  style={{ fontFamily: 'serif' }} 
                  className="text-sm text-gray-500 leading-5"
                  numberOfLines={2} // Keeps it clean
                >
                  {blog.description}
                </Text>

                {/* Subtle "Read More" line */}
                <Text 
                  style={{ fontFamily: 'serif' }} 
                  className="text-pink-500 text-xs mt-3 font-bold underline"
                >
                  Read full story
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}




// import { View, Text, Image, ScrollView, Pressable, Alert } from "react-native";
// import { useAuth } from "@/contexts/auth-context";
// import React, { useCallback, useState } from "react";
// import { router, useFocusEffect } from "expo-router";
// import axios from "@/api/axios";

// type BlogProps = {
//   id: number;
//   title: string;
//   image: string;
//   description: string;
// };

// export default function Home() {
//   const [blogs, setBlogs] = useState<BlogProps[]>([]);

//   const getBlogs = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/fetchBlogs");
//       setBlogs(response.data);
//     } catch (error) {
//       console.log("Error fetching blogs:", error);
//     }
//   };

//    useFocusEffect(
//     useCallback(() => {
//       getBlogs();
//     }, [])
//   );


//   return (
//  <ScrollView
//   showsVerticalScrollIndicator={false}
//   showsHorizontalScrollIndicator={false}
//   className="p-4"
// >
//   <Pressable 
//     onPress={() => router.navigate("/(default)/(pages)/home/create")} 
//     className="my-4"
//   >
//     <Text className="text-blue-500 text-center">Create a Blog Post</Text>
//   </Pressable>

//   {blogs.map((blog) => (
//     <Pressable 
//       onPress={() => router.navigate(`/blogs/${blog.id}`)} 
//       key={blog.id}
//       className="mb-6"
//     >
//       <Image 
//         source={{ uri: `http://127.0.0.1:8000/storage/${blog.image}` }} 
//         style={{ height: 250 }} 
//         className="w-full "
//       />
      
//       <Text className="text-xl font-bold text-black-600 mt-2">
//         {blog.title}
//       </Text>
      
//       <Text className="text-gray-700">
//         {blog.description}
//       </Text>
//     </Pressable>
//   ))}
// </ScrollView>

//   );
// }

