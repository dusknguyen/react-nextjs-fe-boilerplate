'use client';

import { useState } from 'react';
import { Text, View } from 'react-native';

import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  BottomNavigation,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  Dialog,
  Divider,
  Fab,
  Grid,
  GridItem,
  IconButton,
  List,
  ListItem,
  Pagination,
  Paper,
  Progress,
  Radio,
  Range,
  Rating,
  Select,
  Skeleton,
  Snackbar,
  SpeedDial,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Toggle,
  Typography,
} from '@/src/components';
import type { PageNavigationPort } from '@/src/modules/navigation/ports/navigation';
import { AppPageShell } from '@/src/views/layout/AppPageShell';

function DemoSection({
  children,
  description,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <Paper className="mt-6" elevation={1}>
      <Typography variant="overline">{eyebrow}</Typography>
      <Typography className="mt-2" variant="h4">{title}</Typography>
      <Typography className="mb-6 mt-2 max-w-3xl" variant="body2">{description}</Typography>
      {children}
    </Paper>
  );
}

function DemoIcon({ children }: { children: string }) {
  return (
    <View className="h-8 w-8 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900">
      <Text className="text-xs font-black text-brand-700 dark:text-brand-100">{children}</Text>
    </View>
  );
}

export default function FoundationsPageView({ navigation }: { navigation: PageNavigationPort }) {
  const [bottomRoute, setBottomRoute] = useState('home');
  const [checked, setChecked] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('alex@example.com');
  const [energy, setEnergy] = useState(72);
  const [notifications, setNotifications] = useState(true);
  const [page, setPage] = useState(1);
  const [plan, setPlan] = useState('balanced');
  const [rating, setRating] = useState(4);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tab, setTab] = useState('components');

  const emailInvalid = email.length > 0 && !email.includes('@');

  return (
    <AppPageShell
      activeRoute="foundations"
      description="Foundational component capabilities built with React Native primitives and NativeWind for one consistent native and web runtime."
      eyebrow="NativeWind design system"
      navigation={navigation}
      title="Foundation patterns, universal runtime"
    >
      <View className="overflow-hidden rounded-[36px] bg-slate-950 p-6 sm:p-9">
        <View className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/30" />
        <View className="absolute -bottom-24 left-32 h-52 w-52 rounded-full bg-cyan-400/10" />
        <View className="relative max-w-3xl">
          <Badge tone="success">Expo + Next · NativeWind only</Badge>
          <Typography className="mt-5 text-white dark:text-white" variant="h2">
            Clear visual hierarchy, designed for native first.
          </Typography>
          <Typography className="mt-4 text-slate-300 dark:text-slate-300" variant="body1">
            Palette, typography, elevation, shape, responsive layout, accessible states and interaction patterns share one TypeScript implementation.
          </Typography>
          <View className="mt-6 flex-row flex-wrap gap-2">
            {['Inputs', 'Data display', 'Feedback', 'Surfaces', 'Navigation', 'Layout'].map((item) => (
              <Chip className="border-white/15 bg-white/10" key={item} label={item} />
            ))}
          </View>
        </View>
      </View>

      <DemoSection
        description="A responsive type scale, semantic palette, rounded shape and five practical elevation levels use the existing theme variables and dark-mode contract."
        eyebrow="Foundation"
        title="Theme, typography and elevation"
      >
        <Grid columns={3}>
          {[0, 1, 3].map((elevation) => (
            <GridItem key={elevation}>
              <Paper className="h-full" elevation={elevation as 0 | 1 | 3} variant={elevation === 0 ? 'outlined' : 'elevated'}>
                <Typography variant="overline">Elevation {elevation}</Typography>
                <Typography className="mt-2" variant="h5">Surface hierarchy</Typography>
                <Typography className="mt-2" variant="body2">The same NativeWind shadow and dark surface on every platform.</Typography>
              </Paper>
            </GridItem>
          ))}
        </Grid>
        <Divider />
        <View className="gap-2">
          <Typography variant="h3">Responsive heading</Typography>
          <Typography variant="subtitle1">Subtitle with stronger hierarchy</Typography>
          <Typography variant="body1">Body copy optimized for comfortable reading across phone, tablet and desktop.</Typography>
          <Typography variant="caption">Caption · supporting metadata</Typography>
        </View>
      </DemoSection>

      <DemoSection
        description="Solid, outlined and ghost buttons retain native Pressable semantics. Text fields compose labels, variants, adornments and helper/error feedback."
        eyebrow="Inputs"
        title="Actions and form controls"
      >
        <View className="flex-row flex-wrap gap-3">
          <Button onPress={() => setSnackbarOpen(true)} shape="pill">Solid</Button>
          <Button shape="pill" variant="outline">Outline</Button>
          <Button shape="pill" variant="ghost">Ghost</Button>
          <Button shape="pill" tone="success">Success</Button>
          <IconButton accessibilityLabel="Favorite"><Text className="text-lg">♥</Text></IconButton>
          <Fab accessibilityLabel="Create item">+</Fab>
          <Fab accessibilityLabel="Start coaching" extended>Start coaching</Fab>
        </View>

        <ButtonGroup className="mt-5 self-start">
          {['Day', 'Week', 'Month'].map((item, index) => (
            <Button key={item} shape="pill" size="small" variant={index === 1 ? 'solid' : 'ghost'}>{item}</Button>
          ))}
        </ButtonGroup>

        <Grid className="mt-6" columns={2}>
          <GridItem className="gap-4">
            <TextField label="Email" onChangeText={setEmail} value={email} variant="outlined" />
            <TextField helperText="Filled input with supporting text" label="Daily intention" placeholder="What matters today?" variant="filled" />
            <TextField error={emailInvalid} helperText={emailInvalid ? 'Enter a valid email address.' : 'Standard input'} label="Validation" onChangeText={setEmail} value={email} variant="standard" />
          </GridItem>
          <GridItem className="gap-5">
            <Select
              onValueChange={setPlan}
              options={[
                { label: 'Gentle', value: 'gentle' },
                { label: 'Balanced', value: 'balanced' },
                { label: 'Direct', value: 'direct' },
              ]}
              selectedValue={plan}
            />
            <Checkbox checked={checked} label="Remember preference" onChange={setChecked} />
            <View className="flex-row flex-wrap gap-5">
              <Radio label="Option A" onChange={() => undefined} selected />
              <Radio label="Option B" onChange={() => undefined} />
            </View>
            <Toggle label="Daily notifications" onValueChange={setNotifications} value={notifications} />
            <View>
              <Typography variant="caption">Energy: {Math.round(energy)}%</Typography>
              <Range maximumValue={100} minimumValue={0} onValueChange={setEnergy} value={energy} />
            </View>
            <Rating onChange={setRating} value={rating} />
          </GridItem>
        </Grid>
      </DemoSection>

      <DemoSection
        description="Avatar, badge, chips and lists preserve compact information density without relying on browser-only elements."
        eyebrow="Data display"
        title="People, status and structured content"
      >
        <View className="mb-5 flex-row flex-wrap items-center gap-3">
          <Avatar initials="AL" />
          <Badge tone="success">Online</Badge>
          <Chip color="primary" label="Mindfulness" selected />
          <Chip color="success" label="7 day streak" />
          <Chip color="error" label="Removable" onDelete={() => undefined} />
        </View>
        <List className="border border-slate-200 dark:border-slate-800">
          <ListItem leading={<DemoIcon>AM</DemoIcon>} primary="Morning check-in" secondary="Completed · 8:30 AM" trailing={<Badge tone="success">Done</Badge>} />
          <ListItem leading={<DemoIcon>FW</DemoIcon>} onPress={() => setSnackbarOpen(true)} primary="Focus work" secondary="45 minute session" selected trailing={<Text className="text-slate-400">›</Text>} />
          <ListItem leading={<DemoIcon>ER</DemoIcon>} primary="Evening reflection" secondary="Scheduled · 9:00 PM" />
        </List>
      </DemoSection>

      <DemoSection
        description="Alerts remain in document flow, dialogs request a decision, and snackbars deliver brief non-blocking process updates."
        eyebrow="Feedback"
        title="Status, progress and interruption levels"
      >
        <View className="gap-3">
          <Alert tone="info"><Typography variant="body2">Your coaching plan was updated across devices.</Typography></Alert>
          <Alert tone="success"><Typography variant="body2">All habits are synced and ready.</Typography></Alert>
          <Progress value={72} />
          <View className="flex-row items-center gap-4">
            <View className="flex-1 gap-2"><Skeleton /><Skeleton className="h-10" /></View>
            <View className="w-16"><Text className="text-center text-xs text-slate-500">Loading</Text><View className="mt-2"><Progress value={45} /></View></View>
          </View>
          <View className="flex-row flex-wrap gap-3">
            <Button onPress={() => setDialogOpen(true)} shape="pill" variant="outline">Open dialog</Button>
            <Button onPress={() => setSnackbarOpen(true)} shape="pill">Show snackbar</Button>
          </View>
        </View>
      </DemoSection>

      <DemoSection
        description="App bars, tabs, bottom navigation, pagination and speed dial cover top-level, peer, sequential and contextual navigation patterns."
        eyebrow="Navigation"
        title="Move through information clearly"
      >
        <Toolbar
          actions={<IconButton accessibilityLabel="Account" className="bg-white/15"><Text className="font-black text-white">AL</Text></IconButton>}
          leading={<IconButton accessibilityLabel="Open menu" className="bg-white/15"><Text className="font-black text-white">≡</Text></IconButton>}
          subtitle="Unified NativeWind components"
          title="Life Coach"
          variant="brand"
        />
        <Tabs className="mt-5">
          {['components', 'tokens', 'patterns'].map((item) => (
            <Tab active={tab === item} key={item} onPress={() => setTab(item)}>{item}</Tab>
          ))}
        </Tabs>
        <View className="mt-5 items-center gap-5 sm:flex-row sm:justify-between">
          <Pagination onChange={setPage} page={page} total={4} />
          <SpeedDial
            actions={[
              { icon: <Text>✓</Text>, label: 'Complete', onPress: () => setSnackbarOpen(true) },
              { icon: <Text>✎</Text>, label: 'Edit', onPress: () => setSnackbarOpen(true) },
              { icon: <Text>↗</Text>, label: 'Share', onPress: () => setSnackbarOpen(true) },
            ]}
          />
        </View>
        <BottomNavigation
          actions={[
            { icon: <DemoIcon>H</DemoIcon>, label: 'Home', value: 'home' },
            { icon: <DemoIcon>T</DemoIcon>, label: 'Tasks', value: 'tasks' },
            { icon: <DemoIcon>P</DemoIcon>, label: 'Profile', value: 'profile' },
          ]}
          onChange={setBottomRoute}
          value={bottomRoute}
        />
      </DemoSection>

      <DemoSection
        description="Accordion, card-like Paper and responsive Grid compose higher-level screens without a DOM-specific layout engine."
        eyebrow="Surfaces and layout"
        title="Composable building blocks"
      >
        <Grid columns={2}>
          <GridItem>
            <Accordion defaultOpen title="Why one shared NativeWind runtime?">
              <Typography variant="body2">The same component tree runs through React Native on Android/iOS and React Native Web inside Next.js.</Typography>
            </Accordion>
          </GridItem>
          <GridItem>
            <Paper className="h-full bg-brand-50 dark:bg-brand-950" variant="outlined">
              <Typography variant="overline">Composition first</Typography>
              <Typography className="mt-2" variant="h5">Open for extension</Typography>
              <Typography className="mt-2" variant="body2">Use className and children to extend components without editing their internals.</Typography>
            </Paper>
          </GridItem>
        </Grid>
      </DemoSection>

      <Dialog
        actions={
          <>
            <Button onPress={() => setDialogOpen(false)} shape="pill" variant="ghost">Cancel</Button>
            <Button onPress={() => { setDialogOpen(false); setSnackbarOpen(true); }} shape="pill">Confirm</Button>
          </>
        }
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
        title="Start a new coaching plan?"
      >
        <Typography variant="body1">This universal dialog uses React Native Modal and NativeWind on every platform.</Typography>
      </Dialog>

      <Snackbar
        action={<Button onPress={() => setSnackbarOpen(false)} shape="pill" size="small" variant="ghost">Close</Button>}
        autoHideDuration={4000}
        message="Your changes were saved."
        onClose={() => setSnackbarOpen(false)}
        open={snackbarOpen}
      />
    </AppPageShell>
  );
}
