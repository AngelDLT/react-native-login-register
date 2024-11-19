import { View, Image, TextInput, Text, Button } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";

const MainContainer = styled(View)`
  flex: 1;
  align-items: center;
  background-color: #f5fcff;
  padding: 40px 20px;
`;

const Container = styled(View)`
  display: flex;
  width: 250px;
  height: 120px;
  margin-bottom: 20px;
`;

const ContainerBig = styled(Container)`
  width: 300px;
  height: auto;
`;

const StyledImage = styled(Image)`
  resize-mode: stretch;
  align-self: center;
  width: 100%;
  height: 100%;
`;

const StyledInput = styled(TextInput)`
  height: 40px;
  border: 1px solid gray;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
`;

const Divider = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const ErrorMessage = styled(Text)`
  color: red;
  margin-top: -20px;
  margin-bottom: 20px;
`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatedPasswordError, setRepeatedPasswordError] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // Para habilitar/deshabilitar el botón

  const router = useRouter();

  useEffect(() => {
    // Si todos los campos están completos y no hay errores, el botón estará habilitado
    if (
      email &&
      password &&
      repeatedPassword &&
      username &&
      !emailError &&
      !passwordError &&
      !repeatedPasswordError &&
      !usernameError
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [
    email,
    password,
    repeatedPassword,
    username,
    emailError,
    passwordError,
    repeatedPasswordError,
    usernameError,
  ]);

  const validateEmail = (value) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Email inválido");
    } else {
      setEmailError("");
    }
  };

  const validateUsername = (value) => {
    setUsername(value);
    if (value !== "") {
      setUsernameError("");
    } else {
      setUsernameError("El nombre de usuario no puede estar vacío");
    }
  };

  const validatePassword = (value) => {
    setPassword(value);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (repeatedPasswordError) validateRepeatedPassword(repeatedPassword);
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial"
      );
    } else {
      setPasswordError("");
    }
  };

  const validateRepeatedPassword = (value) => {
    setRepeatedPassword(value);
    if (!password) {
      setRepeatedPasswordError("Escribe una contraseña primero");
    } else if (value !== password) {
      setRepeatedPasswordError("Las contraseñas no coinciden");
    } else {
      setRepeatedPasswordError("");
    }
  };

  const handleSubmit = () => {
    if (!isSubmitDisabled) {
      router.push({
        pathname: "./",
      });
    }
  };

  return (
    <MainContainer>
      <Container>
        <StyledImage source={require("@/assets/images/img1.jpg")} />
      </Container>
      <ContainerBig>
        <StyledInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => validateEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? (
          <ErrorMessage testID={"email-error"}>{emailError}</ErrorMessage>
        ) : null}
        <StyledInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => validateUsername(text)}
          autoCapitalize="none"
        />
        {usernameError ? (
          <ErrorMessage testID={"username-error"}>{usernameError}</ErrorMessage>
        ) : null}
        <StyledInput
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => validatePassword(text)}
          secureTextEntry
          autoCapitalize="none"
        />
        {passwordError ? (
          <ErrorMessage testID={"password-error"}>{passwordError}</ErrorMessage>
        ) : null}
        <StyledInput
          placeholder="Repetir contraseña"
          value={repeatedPassword}
          onChangeText={(text) => validateRepeatedPassword(text)}
          secureTextEntry
          autoCapitalize="none"
        />
        {repeatedPasswordError ? (
          <ErrorMessage testID={"repeat-password-error"}>
            {repeatedPasswordError}
          </ErrorMessage>
        ) : null}
        <Divider>
          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={isSubmitDisabled}
          />
        </Divider>
      </ContainerBig>
    </MainContainer>
  );
}
