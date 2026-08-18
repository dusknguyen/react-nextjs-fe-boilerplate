import { act, create, type ReactTestRenderer } from 'react-test-renderer';
import { Text } from 'react-native';

import { Dropdown, DropdownItem } from './Disclosure';

describe('Dropdown presentation', () => {
  it('opens an overlay menu without inserting it into layout flow', () => {
    const onPress = jest.fn();
    let renderer: ReactTestRenderer | undefined;

    act(() => {
      renderer = create(
        <Dropdown label="Quick actions">
          <DropdownItem onPress={onPress}><Text>Start focus session</Text></DropdownItem>
        </Dropdown>,
      );
    });

    const trigger = renderer?.root.findAll(
      (node) => node.props.accessibilityState?.expanded === false && typeof node.props.onPress === 'function',
    )[0];
    act(() => trigger?.props.onPress());

    const menus = renderer?.root.findAll(
      (node) => node.props.accessibilityRole === 'menu' && typeof node.props.className === 'string',
    ) ?? [];
    expect(menus.some((menu) => menu.props.className.includes('absolute'))).toBe(true);

    const item = renderer?.root.findAll(
      (node) => node.props.accessibilityRole === 'menuitem' && typeof node.props.onPress === 'function',
    )[0];
    act(() => item?.props.onPress({}));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(renderer?.root.findAll((node) => node.props.accessibilityRole === 'menu')).toHaveLength(0);

    act(() => renderer?.unmount());
  });
});
