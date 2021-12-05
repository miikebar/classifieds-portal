import { render } from '@testing-library/react';

import FeatureAuth from './feature-auth';

describe('FeatureAuth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureAuth />);
    expect(baseElement).toBeTruthy();
  });
});
