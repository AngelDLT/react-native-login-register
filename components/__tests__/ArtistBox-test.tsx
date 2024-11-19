import React from "react";
import { render, screen } from "@testing-library/react-native";
import ArtistBox from "../ArtistBox";

describe("ArtistBox Component", () => {
  const artist = {
    id: 1,
    name: "John Doe",
    genre: "Rock",
    imageUrl: "path/to/image.jpg",
  };

  test("renders ArtistBox component", () => {
    render(<ArtistBox artist={artist} />);
    expect(screen.getByTestId("artist-box")).toBeTruthy();
  });

  test("displays artist name", () => {
    render(<ArtistBox artist={artist} />);
    expect(screen.getByText("John Doe")).toBeTruthy();
  });

  test("displays artist image", () => {
    render(<ArtistBox artist={artist} />);
    const img = screen.getByTestId("artist-image");
    expect(img).toBeTruthy();
    expect(img.props.source).toEqual({ uri: "path/to/image.jpg" });
  });
});
