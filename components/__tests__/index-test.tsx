import * as react from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import Index from '../../app/index';
import { Alert } from 'react-native';

// Mock para Alert.alert
jest.spyOn(Alert, 'alert');

describe('index', () => {
    it('renders correctly', () => {
        render(<Index />);
        expect(screen.getByPlaceholderText('Email')).toBeTruthy();
        expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
        expect(screen.getByText('Iniciar sesión')).toBeTruthy();
        expect(screen.getByText('Registrarse')).toBeTruthy();
        expect(screen.getByTestId('index-image')).toBeTruthy();
    });

    it('validates incorrect email', () => {
        render(<Index />);
        const emailInput = screen.getByPlaceholderText('Email');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(emailInput, 'user@');
        fireEvent.press(button);
        expect(screen.getByTestId('email-error')).toBeTruthy();
    });

    it('validates correct email', () => {
        render(<Index />);
        const emailInput = screen.getByPlaceholderText('Email');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(emailInput, 'user@user.com');
        fireEvent.press(button);
        expect(screen.queryByTestId('email-error')).toBeNull();
    });

    it('validates incorrect password', () => {
        render(<Index />);
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(passwordInput, 'asdASD');
        fireEvent.press(button);
        expect(screen.getByTestId('password-error')).toBeTruthy();
    });

    it('validates correct password', () => {
        render(<Index />);
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(passwordInput, 'asdASD12%');
        fireEvent.press(button);
        expect(screen.queryByTestId('password-error')).toBeNull();
    });

    it('validates submit', () => {
        render(<Index />);
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(emailInput, 'email@email.com');
        fireEvent.changeText(passwordInput, 'asdASD12%');
        fireEvent.press(button);

        expect(Alert.alert).toHaveBeenCalledWith(
            'Éxito',
            'Email: email@email.com\nPassword: asdASD12%'
        );
    });
});
