import { render, screen } from "@testing-library/react";
import SearchResultItem from "./SearchResultItem";

describe("<SearchResultItem />", () => {
  beforeEach(() => {
    render(
      <SearchResultItem
        movieEntry={{
          id: 10,
          overview: "test-overview",
          poster_path: "/",
          title: "test-title"
        }}
      />
    );
  });

  it("renders poster", () => {
    const poster = screen.getByAltText("movie poster");
    expect(poster).toBeInTheDocument();
  });

  it("renders movie title", () => {
    const title = screen.getByText("test-title");
    expect(title).toBeInTheDocument();
  });

  it("renders movie description", () => {
    const description = screen.getByText("test-overview");
    expect(description).toBeInTheDocument();
  });
});
