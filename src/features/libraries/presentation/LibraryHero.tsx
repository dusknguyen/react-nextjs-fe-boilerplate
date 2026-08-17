'use client';

import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Text, View } from 'react-native';

export function LibraryHero() {
  return (
    <LinearGradient
      className="relative mb-6 overflow-hidden rounded-[34px] p-6 sm:p-8"
      colors={['#312E81', '#5B5CE2', '#0891B2']}
      end={{ x: 1, y: 1 }}
      start={{ x: 0, y: 0 }}
    >
      <View className="absolute -right-14 -top-16 h-52 w-52 rounded-full bg-white/10" />
      <View className="absolute -bottom-20 left-20 h-44 w-44 rounded-full bg-cyan-200/10" />
      <MotiView
        animate={{ opacity: 1, translateY: 0 }}
        from={{ opacity: 0.35, translateY: 10 }}
        transition={{ type: 'timing', duration: 450 }}
      >
        <View className="gap-6 md:flex-row md:items-center md:justify-between">
          <View className="max-w-2xl flex-1">
            <Text className="text-xs font-black uppercase tracking-[2px] text-cyan-100">React Native ecosystem lab</Text>
            <Text className="mt-3 text-3xl font-black leading-10 text-white sm:text-4xl">
              29 packages, one Android + Web feature boundary.
            </Text>
            <Text className="mt-3 max-w-xl text-base leading-6 text-indigo-100">
              Device APIs, async cache, validation, media, vector graphics and high-performance lists without replacing the existing UI package.
            </Text>
          </View>

          <BlurView className="self-start overflow-hidden rounded-[28px] border border-white/20" intensity={28} tint="dark">
            <View className="flex-row items-center gap-4 bg-white/10 p-4">
              <Image
                accessibilityLabel="Application icon rendered by Expo Image"
                className="h-16 w-16 rounded-2xl"
                contentFit="cover"
                source={require('../../../../assets/images/icon.png')}
                transition={250}
              />
              <View>
                <Text className="text-2xl font-black text-white">455</Text>
                <Text className="mt-1 text-xs font-bold text-indigo-100">maintained candidates reviewed</Text>
              </View>
            </View>
          </BlurView>
        </View>
      </MotiView>
    </LinearGradient>
  );
}
