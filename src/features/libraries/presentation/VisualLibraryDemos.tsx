'use client';

import { format } from 'date-fns';
import { Fragment, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar, type DateData } from 'react-native-calendars';
import { useMarkdown } from 'react-native-marked';
import QRCode from 'react-native-qrcode-svg';
import Svg, { Circle, Line, Polyline, Rect } from 'react-native-svg';
import { useColorScheme } from 'nativewind';

import { SectionHeading, Surface } from '@/src/components';

const markdown = `### Markdown adapter

- **Android + Web** rendering
- CommonMark content
- Backed by \`react-native-svg\``;

function VectorChart() {
  return (
    <Svg accessibilityLabel="Weekly capability score chart" height={130} role="img" viewBox="0 0 320 130" width="100%">
      {[30, 65, 100].map((y) => <Line key={y} stroke="#CBD5E1" strokeWidth={1} x1={8} x2={312} y1={y} y2={y} />)}
      {[42, 76, 58, 104, 88, 115, 98].map((height, index) => (
        <Rect fill={index === 5 ? '#5B5CE2' : '#A5B4FC'} height={height} key={height + index} rx={6} width={24} x={18 + index * 43} y={122 - height} />
      ))}
      <Polyline fill="none" points="30,82 73,59 116,72 159,38 202,48 245,22 288,35" stroke="#0891B2" strokeWidth={4} />
      <Circle cx={245} cy={22} fill="#FFFFFF" r={6} stroke="#0891B2" strokeWidth={3} />
    </Svg>
  );
}

export function VisualLibraryDemos() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [selectedDay, setSelectedDay] = useState(today);
  const { colorScheme } = useColorScheme();
  const markdownElements = useMarkdown(markdown, { colorScheme: colorScheme === 'dark' ? 'dark' : 'light' });
  const markedDates = useMemo(() => ({
    [selectedDay]: { selected: true, selectedColor: '#5B5CE2' },
    [today]: { marked: true, dotColor: '#0891B2' },
  }), [selectedDay, today]);

  return (
    <View className="gap-6 lg:flex-row">
      <Surface className="flex-1">
        <SectionHeading eyebrow="SVG primitives" title="Chart + QR" description="Vector output stays sharp across densities and browser zoom." />
        <VectorChart />
        <View className="mt-4 flex-row items-center gap-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <QRCode backgroundColor="transparent" color={colorScheme === 'dark' ? '#E0E7FF' : '#312E81'} quietZone={4} size={112} value="https://reactnative.directory/packages?android=true&web=true" />
          <View className="min-w-0 flex-1">
            <Text className="font-black text-slate-950 dark:text-white">Scan the filtered directory</Text>
            <Text className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">Generated locally with react-native-qrcode-svg and react-native-svg.</Text>
          </View>
        </View>
      </Surface>

      <Surface className="flex-1">
        <SectionHeading eyebrow="Calendar + Markdown" title="Composable content" description="Two maintained universal renderers inside the existing design system surfaces." />
        <View className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
          <Calendar
            current={today}
            markedDates={markedDates}
            onDayPress={(day: DateData) => setSelectedDay(day.dateString)}
          />
        </View>
        <Text className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Selected {selectedDay}</Text>
        <View className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          {markdownElements.map((element, index) => <Fragment key={`markdown-${index}`}>{element}</Fragment>)}
        </View>
      </Surface>
    </View>
  );
}
