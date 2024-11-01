import { chatUsers, displayedMessages, messages } from "@/testing/test-data";
import { transformMessage } from "../utils/transformMsg";

describe("transform a message to DisplayedMessageType", () => {
  test("to transform all data", () => {
    expect(transformMessage(messages[0], "user-id-1", chatUsers)).toEqual(displayedMessages[0]);
    expect(transformMessage(messages[1], "user-id-3", chatUsers)).toEqual(displayedMessages[1]);
    expect(transformMessage(messages[2], "user-id-2", chatUsers)).toEqual(displayedMessages[2]);
  });

  test("if the function returns a value", () => {
    const transformSpy = vi.fn(transformMessage);
    const result = transformSpy(messages[0], "user-id-1", chatUsers);

    expect(result).toEqual(displayedMessages[0]);
    expect(transformSpy).toHaveReturned();
  });

  test("if the function doesn't return a value, but returns null", () => {
    const result = transformMessage();

    expect(result).not.toEqual(displayedMessages[0]);
    expect(result).toBeNull();
  });
});
