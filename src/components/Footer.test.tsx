import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("<Footer />", () => {
  it("renders TMDb logo", () => {
    render(<Footer />);

    const logo = screen.getByAltText("TMDb logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders attribution notice", () => {
    render(<Footer />);

    const attrib = screen.getByText("This product uses the TMDb API but is not endorsed or certified by TMDb.");
    expect(attrib).toBeInTheDocument();
  });
});
