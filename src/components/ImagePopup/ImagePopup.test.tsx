import { render, screen } from "@testing-library/react";
import { ImagePopup, useImagePopup } from "./ImagePopup";
import userEvent from "@testing-library/user-event";

const Image = () => {
  const setImagePopup = useImagePopup();
  const src = "https://url";
  return <img src={src} alt={"message with image"} onClick={() => setImagePopup(src)} />;
};

describe("Image Popup", () => {
  test("to show a popup and close it after", async () => {
    const user = userEvent.setup();

    render(
      <ImagePopup>
        <Image />
      </ImagePopup>
    );

    const image = screen.getByAltText("message with image");
    expect(image).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(image);
    expect(screen.queryByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByAltText("message image")).toBeInTheDocument();

    const closing = screen.getByRole("button");
    expect(closing).toBeInTheDocument();
    await user.click(closing);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
