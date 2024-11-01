import { render, screen } from "@testing-library/react";
import { MessageBody } from "./MessageBody";
import userEvent from "@testing-library/user-event";
import { displayedMessages } from "@/testing/test-data";
import { ImagePopup } from "@/components/ImagePopup";

describe("Message Body", () => {
  test("MessageBody with image", async () => {
    const user = userEvent.setup();
    render(
      <ImagePopup>
        <MessageBody data={displayedMessages[0]} />
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

  test("MessageBody by auth user", () => {
    render(
      <MessageBody data={displayedMessages[1]}>
        <img
          src={displayedMessages[1].hasSeen ? "/double-check.svg" : "/check.svg"}
          data-testid="check"
        />
      </MessageBody>
    );
    expect(screen.getByTestId("check")).toBeInTheDocument();
  });

  test("MessageBody by another user", () => {
    render(<MessageBody data={displayedMessages[2]} />);
    expect(screen.getByText("message-text-4")).toBeInTheDocument();
  });
});
