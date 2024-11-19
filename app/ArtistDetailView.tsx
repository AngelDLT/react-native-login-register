import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";
import { useLocalSearchParams } from "expo-router";

const MainContainer = styled(View)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const ArtistNameComponent = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
const ArtistIdComponent = styled(Text)`
  font-size: 16px;
  text-align: center;
  color: #666;
`;
const ArtistImageComponent = styled(Image)`
  width: 200px;
  height: 200px;
`;

export default function ArtistDetailView() {
  const { id, name, imageUrl } = useLocalSearchParams();
  return (
    <MainContainer>
      <ArtistNameComponent>{name}</ArtistNameComponent>
      <ArtistIdComponent>{id}</ArtistIdComponent>
      <ArtistImageComponent
        source={{ uri: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl }}
      />
    </MainContainer>
  );
}
