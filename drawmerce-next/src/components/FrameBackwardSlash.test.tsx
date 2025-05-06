import React from 'react';
import { render, screen } from '@testing-library/react';
import FrameBackwardSlash from './FrameBackwardSlash';

describe('FrameBackwardSlash', () => {
  it('renders correctly', () => {
    render(<FrameBackwardSlash displacement={0} setDisplacement={() => {}} />);
    expect(screen.getByText(/framebackwardslash/i)).toBeInTheDocument();
  });
});