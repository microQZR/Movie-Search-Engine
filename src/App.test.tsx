import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import mockData from "./test/search-result-example.json";

describe("<App />", () => {
  it("renders `Search now to find flicks that you'll love.` on load", () => {
    render(<App />);

    const text = screen.getByText("Search now to find flicks that you'll love.");
    expect(text).toBeInTheDocument();
  });

  it("renders a footer on load", () => {
    render(<App />);

    const attrib = screen.getByText("This product uses the TMDb API but is not endorsed or certified by TMDb.");
    expect(attrib).toBeInTheDocument();
  });

  it("updates the search bar input value when a user changes the input content", () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    expect((input as HTMLInputElement).value).toBe("");

    userEvent.paste(input, "test-string");
    expect((input as HTMLInputElement).value).toBe("test-string");
  });

  it("renders list of 'SearchResultItem' if query succeeds", async () => {
    window.fetch = jest.fn();
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData)
    });
    render(<App />);

    const input = screen.getByRole("textbox");
    userEvent.paste(input, "test-string");

    const resultItemPosters = await screen.findAllByAltText("movie poster");
    expect(resultItemPosters).toHaveLength(20);
  });

  it("renders network error message on failed query operation", async () => {
    window.fetch = jest.fn();
    (window.fetch as jest.Mock).mockReturnValueOnce(new Error("test"));
    render(<App />);

    const input = screen.getByRole("textbox");
    userEvent.paste(input, "test-string");

    const errorMsg = await screen.findByText(/Oops, a network error has occured/);
    expect(errorMsg).toBeInTheDocument();
  });

  it("renders `No result has been found.` when result of query operation is empty", async () => {
    window.fetch = jest.fn();
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ ...mockData, results: [] })
    });
    render(<App />);

    const input = screen.getByRole("textbox");
    userEvent.paste(input, "test-string");

    const msg = await screen.findByText("No result has been found.");
    expect(msg).toBeInTheDocument();
  });

  it("shows loading spinner while fetching results", async () => {
    window.fetch = jest.fn().mockImplementationOnce(() => {
      const spinner = screen.getByAltText("loading content");
      expect(spinner).toBeInTheDocument();
      console.log("SPINNER CHECK PASSED");
      return {
        json: () => Promise.resolve(mockData)
      };
    });
    render(<App />);

    const input = screen.getByRole("textbox");
    userEvent.paste(input, "test-string");

    const resultItemPosters = await screen.findAllByAltText("movie poster");
    expect(resultItemPosters).toHaveLength(20);
  });
});
