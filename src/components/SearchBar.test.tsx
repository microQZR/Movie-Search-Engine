import { render, screen } from "@testing-library/react";
import React from "react";
import SearchBar from "./SearchBar";

describe("<SearchBar />", () => {
  const onInputValChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const onSearch = (e: React.FormEvent) => {};

  beforeEach(() => {
    render(<SearchBar searchMovie={onSearch} searchTerm={"test-val"} onInputChange={onInputValChange} classList="" />);
  });

  it("renders a button", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
