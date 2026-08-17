'use client';

import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { z } from 'zod';

import { AppButton, SectionHeading, Surface, TextField } from '@/src/components';

const profileSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  intention: z.string().min(8, 'Use at least 8 characters.'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export function ValidationDemo() {
  const [result, setResult] = useState('Submit to validate with Zod.');
  const { control, formState: { errors }, handleSubmit, setError } = useForm<ProfileForm>({
    defaultValues: { email: 'alex@example.com', intention: 'Build a focused universal experience' },
  });

  const submit = handleSubmit((values) => {
    const parsed = profileSchema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === 'email' || field === 'intention') setError(field, { message: issue.message });
      }
      return;
    }
    setResult(`Validated: ${parsed.data.email}`);
  });

  return (
    <Surface>
      <SectionHeading
        description="React Hook Form owns field state; Zod is the replaceable validation boundary. Existing TextField is imported unchanged."
        eyebrow="Forms + schema"
        title="Typed validation workflow"
      />
      <View className="gap-4 md:flex-row">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              autoCapitalize="none"
              className="flex-1"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              keyboardType="email-address"
              label="Email"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="intention"
          render={({ field }) => (
            <TextField
              className="flex-1"
              error={Boolean(errors.intention)}
              helperText={errors.intention?.message}
              label="Intention"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
      </View>
      <View className="mt-4 flex-row flex-wrap items-center justify-between gap-3">
        <Text className="text-sm font-semibold text-slate-600 dark:text-slate-300">{result}</Text>
        <AppButton onPress={() => void submit()} size="small">Validate</AppButton>
      </View>
    </Surface>
  );
}
