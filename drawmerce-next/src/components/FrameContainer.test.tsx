import React from 'react';
import { render } from '@testing-library/react';
import FrameContainer from './FrameContainer';

describe('FrameContainer', () => {
  it('renders correctly', () => {
    const { getByText } = render(<FrameContainer />);
    expect(getByText(/frame container/i)).toBeInTheDocument();
  });
});