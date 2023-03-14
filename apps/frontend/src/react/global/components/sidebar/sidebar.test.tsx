import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from '../../../../App';
import '@testing-library/jest-dom';

describe('Sidebar tests:', () => {
  window.history.pushState({}, '', '/');

  afterEach(cleanup);

  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });

  test('1 - Has a sidebar tag type "HEADER" with data-testid="sidebar":', () => {
    expect(screen.getByTestId('sidebar')).toBeDefined();
    expect(screen.getByTestId('sidebar').tagName).eq('HEADER');
  });

  test('2 - Has a sidebar tag type "BUTTON" with data-testid="home-button":', () => {
    expect(screen.getByTestId('home-button')).toBeDefined();
    expect(screen.getByTestId('home-button').tagName).eq('BUTTON');
  });

  test('3 - Has a sidebar tag type "BUTTON" with data-testid="about-button":', () => {
    expect(screen.getByTestId('about-button')).toBeDefined();
    expect(screen.getByTestId('about-button').tagName).eq('BUTTON');
  });

  test('4 - Has a sidebar tag type "BUTTON" with data-testid="contact-button":', () => {
    expect(screen.getByTestId('contact-button')).toBeDefined();
    expect(screen.getByTestId('contact-button').tagName).eq('BUTTON');
  });

  test('5 - Has a sidebar tag with data-testid="select-language-button":', () => {
    expect(screen.getByTestId('select-language-button')).toBeDefined();
  });

  test('6 - Has a sidebar tag type "BUTTON" with data-testid="button-moon-sun":', () => {
    expect(screen.getByTestId('button-moon-sun')).toBeDefined();
    expect(screen.getByTestId('button-moon-sun').tagName).eq('BUTTON');
  });

  test('7 - Should translate buttons when select with data-testid="select-language-button" changes:', () => {
    expect(screen.getByTestId('home-button')).toHaveTextContent('home');
    expect(screen.getByTestId('about-button')).toHaveTextContent('about');
    expect(screen.getByTestId('contact-button')).toHaveTextContent('contact');
    fireEvent.change(screen.getByTestId('select-language-button'), {
      target: { value: 'português' },
    });
    expect(screen.getByTestId('home-button')).toHaveTextContent('início');
    expect(screen.getByTestId('about-button')).toHaveTextContent('sobre');
    expect(screen.getByTestId('contact-button')).toHaveTextContent('contacto');
    // #REFACTOR test is leaking...
    fireEvent.change(screen.getByTestId('select-language-button'), {
      target: { value: 'english' },
    });
  });

  test('8 - Should change class when button with data-testid="button-moon-sun" is clicked:', () => {
    expect(screen.getByTestId('sidebar')).toHaveClass('sidebar-dark');
    fireEvent.click(screen.getByTestId('button-moon-sun'));
    expect(screen.getByTestId('sidebar')).toHaveClass('sidebar-light');
  });

  test('9 - Should navigate to about page when button with data-testid="about-button" is clicked and go back when data-testid="home-button" is clicked:', () => {
    expect(screen.getByTestId('home')).toBeDefined();
    fireEvent.click(screen.getByTestId('about-button'));
    expect(screen.getByTestId('about')).toBeDefined();
    fireEvent.click(screen.getByTestId('home-button'));
    expect(screen.getByTestId('home')).toBeDefined();
  });

  test('10 - Should navigate to contact page when button with data-testid="contact-button" is clicked and go back when data-testid="home-button" is clicked:', () => {
    expect(screen.getByTestId('home')).toBeDefined();
    fireEvent.click(screen.getByTestId('contact-button'));
    expect(screen.getByTestId('contact')).toBeDefined();
    fireEvent.click(screen.getByTestId('home-button'));
    expect(screen.getByTestId('home')).toBeDefined();
  });
});
