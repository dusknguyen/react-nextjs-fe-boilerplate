'use client';

import { Text, View } from 'react-native';

import {
  Accordion,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardActions,
  CardBody,
  CardImage,
  CardTitle,
  Carousel,
  CarouselItem,
  ChatBubble,
  ChatBubbleFooter,
  ChatBubbleHeader,
  ChatBubbleMessage,
  Collapse,
  Countdown,
  Diff,
  Kbd,
  Stat,
  Stats,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Timeline,
  TimelineEnd,
  TimelineItem,
  TimelineMiddle,
  TimelineStart,
} from '@/src/components';

export default function DataDisplayDemo() {
  return (
    <>
      <View className="flex-row flex-wrap items-center gap-3">
        <Avatar initials="AK" />
        <AvatarGroup><Avatar initials="AI" /><Avatar initials="UX" /><Avatar initials="RN" /></AvatarGroup>
        <Badge>NativeWind</Badge>
        <Badge tone="success">Universal</Badge>
        <Kbd>⌘ K</Kbd>
        <Countdown value={12} />
      </View>
      <Card>
        <CardImage />
        <CardBody>
          <CardTitle>Daily clarity card</CardTitle>
          <Text className="mt-2 leading-6 text-slate-600 dark:text-slate-300">
            Cards, titles, media and actions share the same native layout model.
          </Text>
          <CardActions><Button>Continue</Button></CardActions>
        </CardBody>
      </Card>
      <Carousel>
        {['Focus', 'Recover', 'Reflect'].map((item) => (
          <CarouselItem key={item}>
            <Text className="text-lg font-black text-brand-800 dark:text-brand-100">{item}</Text>
            <Text className="mt-2 text-brand-700 dark:text-brand-200">A horizontally scrollable native card.</Text>
          </CarouselItem>
        ))}
      </Carousel>
      <ChatBubble>
        <ChatBubbleHeader>Aiko · now</ChatBubbleHeader>
        <ChatBubbleMessage><Text className="font-semibold text-white">What is the smallest useful next step?</Text></ChatBubbleMessage>
        <ChatBubbleFooter>Delivered securely</ChatBubbleFooter>
      </ChatBubble>
      <View className="gap-3 md:flex-row">
        <Accordion className="flex-1" title="Accordion"><Text className="text-slate-600 dark:text-slate-300">Press to reveal this content.</Text></Accordion>
        <Collapse className="flex-1" title="Collapse"><Text className="text-slate-600 dark:text-slate-300">The same accessible disclosure primitive.</Text></Collapse>
      </View>
      <Stats>
        <Stat><Text className="text-2xl font-black text-slate-950 dark:text-white">84%</Text><Text className="text-slate-500 dark:text-slate-400">Energy</Text></Stat>
        <Stat><Text className="text-2xl font-black text-slate-950 dark:text-white">7</Text><Text className="text-slate-500 dark:text-slate-400">Day streak</Text></Stat>
      </Stats>
      <Table>
        <View>
          <TableHead><TableRow><Text className="w-48 font-black text-slate-700 dark:text-slate-200">Habit</Text><Text className="w-32 font-black text-slate-700 dark:text-slate-200">Status</Text></TableRow></TableHead>
          <TableBody><TableRow><Text className="w-48 text-slate-600 dark:text-slate-300">Morning reset</Text><Text className="w-32 text-emerald-600">Complete</Text></TableRow></TableBody>
        </View>
      </Table>
      <Diff>
        <View className="flex-1 bg-rose-50 p-4 dark:bg-rose-950"><Text className="font-bold text-rose-700 dark:text-rose-200">Before: scattered</Text></View>
        <View className="flex-1 bg-emerald-50 p-4 dark:bg-emerald-950"><Text className="font-bold text-emerald-700 dark:text-emerald-200">After: focused</Text></View>
      </Diff>
      <Timeline>
        <TimelineItem><TimelineStart><Text className="text-slate-500 dark:text-slate-400">08:00</Text></TimelineStart><TimelineMiddle /><TimelineEnd><Text className="font-bold text-slate-900 dark:text-white">Plan the day</Text></TimelineEnd></TimelineItem>
        <TimelineItem><TimelineStart><Text className="text-slate-500 dark:text-slate-400">09:00</Text></TimelineStart><TimelineMiddle /><TimelineEnd><Text className="font-bold text-slate-900 dark:text-white">Deep work</Text></TimelineEnd></TimelineItem>
      </Timeline>
    </>
  );
}
