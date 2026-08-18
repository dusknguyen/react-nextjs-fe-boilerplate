import { act, create, type ReactTestRenderer } from 'react-test-renderer';
import { StyleSheet, Text } from 'react-native';

import { Dialog, Snackbar } from './Feedback';

function backgroundColors(renderer: ReactTestRenderer | undefined): unknown[] {
  return renderer?.root.findAll((node) => node.props.style !== undefined)
    .map((node) => StyleSheet.flatten(node.props.style)?.backgroundColor)
    .filter(Boolean) ?? [];
}

describe('feedback surfaces', () => {
  it('renders a reliable dialog backdrop outside utility CSS', () => {
    let renderer: ReactTestRenderer | undefined;

    act(() => {
      renderer = create(
        <Dialog onClose={jest.fn()} open title="Confirm">
          <Text>Content</Text>
        </Dialog>,
      );
    });

    expect(backgroundColors(renderer)).toContain('rgba(2, 6, 23, 0.72)');
    act(() => renderer?.unmount());
  });

  it('keeps the snackbar surface visible without blocking the page backdrop', () => {
    let renderer: ReactTestRenderer | undefined;

    act(() => {
      renderer = create(
        <Snackbar message="Saved" onClose={jest.fn()} open />,
      );
    });

    expect(backgroundColors(renderer)).toContain('#0f172a');
    expect(backgroundColors(renderer)).not.toContain('rgba(2, 6, 23, 0.72)');
    act(() => renderer?.unmount());
  });
});
