import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

describe('Router tests:', async () => {
  const renderPath = (path: string) => {
    window.history.pushState({}, '', path);
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  };

  test('1 - Render "Home Component" at path "/":', () => {
    renderPath('/');
    expect(screen.getByTestId('home')).toBeDefined();
  });

  test('2 - Render "Not Found" at path "/random-query":', () => {
    renderPath('/not-found');
    expect(screen.getByTestId('not-found')).toBeDefined();
  });
});
