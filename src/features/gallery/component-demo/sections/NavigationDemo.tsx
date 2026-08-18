'use client';

import { useState } from 'react';
import { Text, View } from 'react-native';

import {
  Avatar,
  Breadcrumbs,
  BreadcrumbsItem,
  Dock,
  DockItem,
  DockLabel,
  Link,
  Menu,
  MenuItem,
  MenuTitle,
  Navbar,
  NavbarSection,
  Pagination,
  Step,
  Steps,
  Tab,
  Tabs,
} from '@/src/components';

export default function NavigationDemo() {
  const [page, setPage] = useState(2);
  const [tab, setTab] = useState('Overview');

  return (
    <>
      <Navbar><NavbarSection><Avatar initials="AI" /><Text className="font-black text-slate-950 dark:text-white">Aiko</Text></NavbarSection><Link>Profile</Link></Navbar>
      <Breadcrumbs><BreadcrumbsItem>Home</BreadcrumbsItem><Text className="text-slate-400">/</Text><BreadcrumbsItem>Components</BreadcrumbsItem></Breadcrumbs>
      <Tabs>{['Overview', 'Activity', 'Settings'].map((item) => <Tab active={tab === item} key={item} onPress={() => setTab(item)}>{item}</Tab>)}</Tabs>
      <Pagination onChange={setPage} page={page} total={4} />
      <Steps><Step><Text className="font-bold text-brand-700 dark:text-brand-200">Plan</Text></Step><Step><Text className="font-bold text-brand-700 dark:text-brand-200">Act</Text></Step><Step><Text className="font-bold text-brand-700 dark:text-brand-200">Reflect</Text></Step></Steps>
      <View className="gap-4 md:flex-row">
        <Menu className="flex-1"><MenuTitle>Workspace</MenuTitle><MenuItem><Text className="font-semibold text-slate-700 dark:text-slate-200">Dashboard</Text></MenuItem><MenuItem><Text className="font-semibold text-slate-700 dark:text-slate-200">Journal</Text></MenuItem></Menu>
        <Dock className="flex-1"><DockItem><Text className="text-xl">⌂</Text><DockLabel>Home</DockLabel></DockItem><DockItem><Text className="text-xl">◎</Text><DockLabel>Coach</DockLabel></DockItem><DockItem><Text className="text-xl">○</Text><DockLabel>Profile</DockLabel></DockItem></Dock>
      </View>
    </>
  );
}
