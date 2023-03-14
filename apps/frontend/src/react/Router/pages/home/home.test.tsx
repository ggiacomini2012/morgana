import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from '../../../../App';
// import globalStrings from '../../../global/constants/strings/globalStrings';
import '@testing-library/jest-dom';

describe('Home tests:', () => {
  window.history.pushState({}, '', '/');

  afterEach(cleanup);

  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });

  // test('1 - Has the Developer name on it:', () => {
  //   expect(screen.getAllByText(new RegExp(globalStrings.developerName, 'i'))[0]).toBeDefined();
  // });

});
