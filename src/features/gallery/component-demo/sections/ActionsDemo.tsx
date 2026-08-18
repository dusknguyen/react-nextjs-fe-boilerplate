'use client';

import { useState } from 'react';
import { Text, View } from 'react-native';

import { Badge, Button, Dropdown, DropdownItem, Modal, ModalActions, ModalBody, ModalHeader, Swap } from '@/src/components';

export default function ActionsDemo() {
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('Choose an action to preview its behavior.');
  const [swapped, setSwapped] = useState(false);

  return (
    <>
      <View className="min-h-72 gap-4">
        <View className="flex-row flex-wrap items-start gap-3">
          <Button onPress={() => setStatus('Primary action selected.')}>Primary action</Button>
          <Button variant="outline">Outline</Button>
          <Dropdown label="Quick actions">
            <DropdownItem onPress={() => setStatus('Focus session started.')}>
              <Text className="font-semibold text-slate-700 dark:text-slate-200">Start focus session</Text>
            </DropdownItem>
            <DropdownItem onPress={() => setStatus('Reminder scheduled.')}>
              <Text className="font-semibold text-slate-700 dark:text-slate-200">Schedule reminder</Text>
            </DropdownItem>
          </Dropdown>
          <Swap
            active={swapped}
            off={<Badge tone="neutral">Offline</Badge>}
            on={<Badge tone="success">Online</Badge>}
            onChange={setSwapped}
          />
          <Button onPress={() => setModalVisible(true)} variant="ghost">Open modal</Button>
        </View>
        <View className="mt-auto self-start rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
          <Text accessibilityLiveRegion="polite" className="text-sm font-semibold text-slate-600 dark:text-slate-300">{status}</Text>
        </View>
      </View>
      <Modal onClose={() => setModalVisible(false)} visible={modalVisible}>
        <ModalHeader>Universal modal</ModalHeader>
        <ModalBody>
          <Text className="leading-6 text-slate-600 dark:text-slate-300">
            Native Modal works on Android, iOS and web.
          </Text>
        </ModalBody>
        <ModalActions><Button onPress={() => setModalVisible(false)}>Done</Button></ModalActions>
      </Modal>
    </>
  );
}
