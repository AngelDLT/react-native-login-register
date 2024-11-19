import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import ArtistList from "../ArtistList";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("ArtistList Component", () => {
  const artists = [
    { id: 1, name: "John Doe", genre: "Rock", imageUrl: "path/to/image1.jpg" },
    { id: 2, name: "Jane Smith", genre: "Pop", imageUrl: "path/to/image2.jpg" },
  ];

  test("renders ArtistList component", () => {
    render(<ArtistList artists={artists} />);
    expect(screen.getByTestId("artist-box-John Doe")).toBeTruthy();
    expect(screen.getByTestId("artist-box-Jane Smith")).toBeTruthy();
  });

  test("navigates to ArtistDetailView on artist press", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<ArtistList artists={artists} />);
    fireEvent.press(screen.getByTestId("artist-box-John Doe"));
    expect(pushMock).toHaveBeenCalledWith({
      pathname: "/ArtistDetailView",
      params: { id: 1, name: "John Doe", imageUrl: "path/to/image1.jpg" },
    });
  });
});
