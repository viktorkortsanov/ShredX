import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../store/store.js'
import Register from '../components/register/Register.jsx'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Register component', () => {
    let renderComponent;
    let usernameInput;
    let emailInput;
    let passwordInput;
    let rePasswordInput

    beforeEach(() => {
        renderComponent = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
    });

    usernameInput = screen.findByPlaceholderText('Enter your username');
    emailInput = screen.findByPlaceholderText("Enter your emai");
    passwordInput = screen.findByPlaceholderText("Enter your password");
    rePasswordInput = screen.findByPlaceholderText("Confirm your password");

    it('renders register correctly', async () => {
        expect(usernameInput).toBeTruthy();
        expect(emailInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
        expect(rePasswordInput).toBeTruthy();
    });
})