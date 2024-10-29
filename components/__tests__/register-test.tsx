import * as react from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import Register from "../../app/register";

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("register", () => {
  it("renders register correctly", () => {
    render(<Register />);
    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Username")).toBeTruthy();
    expect(screen.getByPlaceholderText("Contraseña")).toBeTruthy();
    expect(screen.getByPlaceholderText("Repetir contraseña")).toBeTruthy();
    expect(screen.getByText("Submit")).toBeTruthy();
  });

  it("validates incorrect email", () => {
    render(<Register />);
    const emailInput = screen.getByPlaceholderText("Email");
    const button = screen.getByText("Submit");
    fireEvent.changeText(emailInput, "user@");
    fireEvent.press(button);
    expect(screen.getByTestId("email-error")).toBeTruthy();
  });

  it("validates correct email", () => {
    render(<Register />);
    const emailInput = screen.getByPlaceholderText("Email");
    const button = screen.getByText("Submit");
    fireEvent.changeText(emailInput, "user@user.com");
    fireEvent.press(button);
    expect(screen.queryByTestId("email-error")).toBeNull();
  });

  it("validates incorrect password", () => {
    render(<Register />);
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const button = screen.getByText("Submit");
    fireEvent.changeText(passwordInput, "asdASD");
    fireEvent.press(button);
    expect(screen.getByTestId("password-error")).toBeTruthy();
  });

  it("validates correct password", () => {
    render(<Register />);
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const button = screen.getByText("Submit");
    fireEvent.changeText(passwordInput, "asdASD12%");
    fireEvent.press(button);
    expect(screen.queryByTestId("password-error")).toBeNull();
  });

  it("validates incorrect repeated password", () => {
    render(<Register />);
    const repeatedPasswordInput =
      screen.getByPlaceholderText("Repetir contraseña");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    fireEvent.changeText(passwordInput, "asdASD12%");
    fireEvent.changeText(repeatedPasswordInput, "asdASD");
    const button = screen.getByText("Submit");
    fireEvent.press(button);
    expect(screen.getByTestId("repeat-password-error")).toBeTruthy();
  });

  it("validates correct repeated password", () => {
    render(<Register />);
    const repeatedPasswordInput =
      screen.getByPlaceholderText("Repetir contraseña");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    fireEvent.changeText(passwordInput, "asdASD12%");
    fireEvent.changeText(repeatedPasswordInput, "asdASD12%");
    const button = screen.getByText("Submit");
    fireEvent.press(button);
    expect(screen.queryByTestId("repeat-password-error")).toBeNull();
  });

  it("validates incorrect username", () => {
    render(<Register />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const button = screen.getByText("Submit");
    fireEvent.changeText(usernameInput, "");
    fireEvent.press(button);
    expect(screen.getByTestId("username-error")).toBeTruthy();
  });

  it("validates correct username", () => {
    render(<Register />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const button = screen.getByText("Submit");
    fireEvent.changeText(usernameInput, "username1");
    fireEvent.press(button);
    expect(screen.queryByTestId("username-error")).toBeNull();
  });

  it("validates correct submit", () => {
    render(<Register />);
    const emailInput = screen.getByPlaceholderText("Email");
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const repeatedPasswordInput =
      screen.getByPlaceholderText("Repetir contraseña");

    const button = screen.getByText("Submit");
    fireEvent.changeText(emailInput, "email@email.com");
    fireEvent.changeText(usernameInput, "username1");
    fireEvent.changeText(passwordInput, "asdASD12%");
    fireEvent.changeText(repeatedPasswordInput, "asdASD12%");
    fireEvent.press(button);
    expect(mockPush).toHaveBeenCalledWith({ pathname: "./" });
  });
});
