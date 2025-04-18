import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store.js';
import Login from '../components/login/Login.jsx';
import { beforeEach, describe, expect, it } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../config/i18n.js';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary.jsx';
describe('Login component', () => {
    let emailInput;
    let passwordInput;

    beforeEach(() => {
        render(
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <BrowserRouter>
                        <ErrorBoundary>
                            <Login />
                        </ErrorBoundary>
                    </BrowserRouter>
                </Provider>
            </I18nextProvider>
        );

        emailInput = screen.getByPlaceholderText('Enter your email');
        passwordInput = screen.getByPlaceholderText('Enter your password');
    });

    it('renders login correctly', () => {
        expect(emailInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
    });

    it('fills login', async () => {
        await userEvent.type(emailInput, 'test@abv.bg');
        await userEvent.type(passwordInput, 'test123');

        expect(emailInput.value).toBe('test@abv.bg');
        expect(passwordInput.value).toBe('test123');
    });

    it('redirects to home after successful login', async () => {
        await userEvent.type(emailInput, 'test@abv.bg');
        await userEvent.type(passwordInput, 'test123');
        const loginBtn = screen.getByRole('button');
        await userEvent.click(loginBtn);

        expect(window.location.pathname).toBe('/');
    });

    it('Displays error after empty fields', async () => {
        await userEvent.clear(emailInput);
        await userEvent.type(passwordInput, 'test123');

        const loginBtn = screen.getByRole('button');
        await userEvent.click(loginBtn);

        expect(screen.findByText('All fields are required.')).toBeTruthy();
    });

    it('Displays invalid user error', async () => {
        await userEvent.clear(emailInput, 'test7777@abv.bg');
        await userEvent.type(passwordInput, 'test7777');

        const loginBtn = screen.getByRole('button');
        await userEvent.click(loginBtn);

        expect(screen.findByText('Invalid user')).toBeTruthy();
    });

});