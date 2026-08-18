'use client';

import { Text, View } from 'react-native';

import {
  Artboard,
  Badge,
  Button,
  Divider,
  Drawer,
  Footer,
  FooterTitle,
  Hero,
  HeroContent,
  HeroOverlay,
  Indicator,
  IndicatorItem,
  Join,
  Link,
  Mask,
  Stack,
} from '@/src/components';

export default function LayoutDemo() {
  return (
    <>
      <Hero><HeroOverlay /><HeroContent><Badge tone="neutral">Daily reset</Badge><Text className="text-3xl font-black text-white">Make space for what matters.</Text><Button variant="outline">Start now</Button></HeroContent></Hero>
      <Drawer content={<Text className="text-slate-700 dark:text-slate-200">Responsive content panel</Text>} side={<Text className="font-black text-slate-900 dark:text-white">Drawer navigation</Text>} />
      <View className="gap-4 md:flex-row">
        <Artboard className="flex-1"><Text className="font-black text-slate-950 dark:text-white">Artboard</Text><Divider /><Stack><Badge>Stack item</Badge><Join><Button>Left</Button><Button variant="outline">Right</Button></Join></Stack></Artboard>
        <Indicator><IndicatorItem><Text className="text-xs font-black text-white">3</Text></IndicatorItem><Mask className="h-40 w-40 items-center justify-center bg-brand-100 dark:bg-brand-950"><Text className="font-black text-brand-700 dark:text-brand-200">Masked</Text></Mask></Indicator>
      </View>
      <Footer><View><FooterTitle>Aiko UI</FooterTitle><Text className="mt-2 text-slate-500 dark:text-slate-400">Universal by default.</Text></View><Link>Documentation</Link></Footer>
    </>
  );
}
