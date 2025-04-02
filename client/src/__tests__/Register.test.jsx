import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store.js';
import Register from '../components/register/Register.jsx';
import { beforeEach, describe, expect, it } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../config/i18n.js';

describe('Register component', () => {
    let usernameInput;
    let emailInput;
    let passwordInput;
    let rePasswordInput;

    beforeEach(() => {
        render(
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Register />
                    </BrowserRouter>
                </Provider>
            </I18nextProvider>
        );

        usernameInput = screen.getByPlaceholderText('Enter your username');
        emailInput = screen.getByPlaceholderText('Enter your email');
        passwordInput = screen.getByPlaceholderText('Enter your password');
        rePasswordInput = screen.getByPlaceholderText('Confirm your password');
    });

    it('renders register correctly', () => {
        expect(usernameInput).toBeTruthy();
        expect(emailInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
        expect(rePasswordInput).toBeTruthy();
    });

    it('fills register', async () => {
        await userEvent.type(usernameInput, 'test');
        await userEvent.type(emailInput, 'test@abv.bg');
        await userEvent.type(passwordInput, 'test123');
        await userEvent.type(rePasswordInput, 'test123');

        expect(usernameInput.value).toBe('test');
        expect(emailInput.value).toBe('test@abv.bg');
        expect(passwordInput.value).toBe('test123');
        expect(rePasswordInput.value).toBe('test123');
    });

    it('redirects to home after successful register', async () => {
        await userEvent.type(usernameInput, 'test');
        await userEvent.type(emailInput, 'test@abv.bg');
        await userEvent.type(passwordInput, 'test123');
        await userEvent.type(rePasswordInput, 'test123');
        const registerBtn = screen.getByText('Register');
        userEvent.click(registerBtn);

        expect(window.location.pathname).toBe('/');
    });

    it('Display error after empty fields', async () => {
        await userEvent.clear(usernameInput);
        await userEvent.type(emailInput, 'test@abv.bg');
        await userEvent.type(passwordInput, 'test123');
        await userEvent.type(rePasswordInput, 'test123');

        const registerBtn = screen.getByText('Register');
        await userEvent.click(registerBtn);

        expect(screen.getByText('All fields are required.')).toBeTruthy();

    });

    it('Display error if passwords do not match', async () => {
        await userEvent.type(usernameInput, 'test');
        await userEvent.type(emailInput, 'test@abv.bg');
        await userEvent.type(passwordInput, 'test123');
        await userEvent.type(rePasswordInput, 'test1234');

        const registerBtn = screen.getByText('Register');
        await userEvent.click(registerBtn);

        expect(screen.findByText('Passwords do not match')).toBeTruthy();

    });

});