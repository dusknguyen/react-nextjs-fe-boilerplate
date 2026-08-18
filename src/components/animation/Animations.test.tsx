import {
  act,
  create,
  type ReactTestRenderer,
  type ReactTestRendererJSON,
} from 'react-test-renderer';

import { Button } from '../foundation/actions/Button';
import { PressScale } from './Animations';

jest.mock('../core/useReducedMotion', () => ({
  useReducedMotion: () => false,
}));

function countButtonNodes(node: ReactTestRendererJSON | ReactTestRendererJSON[] | null): number {
  if (!node) return 0;
  if (Array.isArray(node)) return node.reduce((total, child) => total + countButtonNodes(child), 0);
  const children = node.children?.filter(
    (child): child is ReactTestRendererJSON => typeof child !== 'string',
  ) ?? [];
  return Number(node.props.accessibilityRole === 'button') + countButtonNodes(children);
}

describe('PressScale composition', () => {
  it('decorates an existing button without nesting another press target', () => {
    let renderer: ReactTestRenderer | undefined;

    act(() => {
      renderer = create(
        <PressScale asChild>
          <Button variant="outline">PressScale</Button>
        </PressScale>,
      );
    });

    expect(countButtonNodes(renderer?.toJSON() ?? null)).toBe(1);

    act(() => renderer?.unmount());
  });
});
