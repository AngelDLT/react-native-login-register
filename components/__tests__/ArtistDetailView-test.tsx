import React from "react";
import { render, screen } from "@testing-library/react-native";
import ArtistDetailView from "@/app/ArtistDetailView";
import { useLocalSearchParams } from "expo-router";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

describe("ArtistDetailView", () => {
  it("should render correctly", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      id: "1",
      name: "Artist Name",
      imageUrl: "http://example.com/image.jpg",
    });

    const { getByText, getByRole } = render(<ArtistDetailView />);

    expect(getByText("Artist Name")).toBeTruthy();
    expect(getByText("1")).toBeTruthy();
    expect(screen.getByTestId("image-artist-detail")).toBeTruthy();
  });
});
