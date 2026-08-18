'use client';

import { useState } from 'react';
import { View } from 'react-native';

import { Checkbox, FileInput, Form, Input, Label, Radio, Range, Rating, Select, Textarea, Toggle } from '@/src/components';

const coachingStyles = [
  { label: 'Gentle', value: 'gentle' },
  { label: 'Balanced', value: 'balanced' },
  { label: 'Direct', value: 'direct' },
];

export default function DataInputDemo() {
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState(true);
  const [range, setRange] = useState(68);
  const [rating, setRating] = useState(4);
  const [selected, setSelected] = useState('balanced');
  const [toggle, setToggle] = useState(true);

  return (
    <Form>
      <View><Label>Goal name</Label><Input placeholder="Build a consistent morning routine" /></View>
      <View><Label>Reflection</Label><Textarea placeholder="What would make today meaningful?" /></View>
      <View className="gap-4 sm:flex-row"><Checkbox checked={checked} label="Daily reminder" onChange={setChecked} /><Radio label="Balanced coaching" onChange={setRadio} selected={radio} /></View>
      <Toggle label="Enable private insights" onValueChange={setToggle} value={toggle} />
      <View><Label>Energy: {Math.round(range)}%</Label><Range maximumValue={100} onValueChange={setRange} value={range} /></View>
      <View><Label>Session rating</Label><Rating onChange={setRating} value={rating} /></View>
      <Select onValueChange={setSelected} options={coachingStyles} selectedValue={selected} />
      <FileInput fileName="Attach journal entry" />
    </Form>
  );
}
