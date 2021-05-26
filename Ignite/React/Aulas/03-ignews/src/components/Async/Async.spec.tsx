import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { Async } from '.';

describe('Async component', () => {
  it('renders correctly', async () => {
    render(<Async />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();

    //Async test
    // expect(await screen.findByText('Button')).toBeInTheDocument();
    //OR
    await waitFor(() => {
      return expect(screen.getByText('Button')).toBeInTheDocument();
    });

    //Removing Component
    // await waitFor(() => {
    //   return expect(screen.queryByText('Button')).not.toBeInTheDocument();
    // });
    // OR
    // await waitForElementToBeRemoved(screen.queryByText('Button'));
  });
});
