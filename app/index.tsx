import { View, Image, TextInput, Text, Button, Alert } from "react-native";
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

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // Estado para controlar la habilitación del botón

  const router = useRouter();

  useEffect(() => {
    // Verifica si hay errores o campos vacíos
    if (email && password && !emailError && !passwordError) {
      setIsSubmitDisabled(false); // Habilita el botón si todo está correcto
    } else {
      setIsSubmitDisabled(true); // Deshabilita el botón si hay errores o campos vacíos
    }
  }, [email, password, emailError, passwordError]);

  const onPressLearnMore = () => {
    router.push({
      pathname: "./register",
    });
  };

  const validateEmail = (value) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Email inválido");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    setPassword(value);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(value)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = () => {
    validateEmail(email);
    validatePassword(password);

    if (!emailError && !passwordError) {
      Alert.alert("Éxito", `Email: ${email}\nPassword: ${password}`);
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
        {emailError ? <ErrorMessage>{emailError}</ErrorMessage> : null}

        <StyledInput
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => validatePassword(text)}
          secureTextEntry
          autoCapitalize="none"
        />
        {passwordError ? <ErrorMessage>{passwordError}</ErrorMessage> : null}
        <Divider>
          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={isSubmitDisabled} // Deshabilita el botón basado en el estado
          />
          <Button title="Register" onPress={onPressLearnMore} />
        </Divider>
      </ContainerBig>
    </MainContainer>
  );
}
