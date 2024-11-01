import { render, screen } from "@testing-library/react";
import { ChatAvatar } from "./ChatAvatar";

describe("Chat Avatar", () => {
  test("Avatar with photo", () => {
    const user = "Firstname Lastname";
    render(<ChatAvatar photoURL={"https://url"} name={user} />);
    expect(screen.getByAltText("Photo of " + user)).toBeInTheDocument();
  });

  test("Avatar without photo", () => {
    const user = "Firstname Lastname";
    render(<ChatAvatar name={user} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("Avatar with online indicator", () => {
    const user = "Firstname Lastname";
    render(<ChatAvatar name={user} online={true} />);
    expect(screen.getByTestId("online-indicator")).toBeInTheDocument();
  });

  test("Avatar with offline indicator", () => {
    const user = "Firstname Lastname";
    render(<ChatAvatar name={user} online={false} />);
    expect(screen.queryByTestId("online-indicator")).not.toBeInTheDocument();
  });
});
