import { describe, expect, test } from "vitest";
import { transformChat } from "../utils/transformChat";
import { chats, chatUsers, fullChats } from "@/testing/test-data";

describe("transform a chat to FullChatType", () => {
  test("to transform all data", () => {
    expect(transformChat(chats[0], "chat-id-1", [chatUsers[0], chatUsers[1]])).toEqual(
      fullChats[0]
    );
    expect(transformChat(chats[1], "chat-id-2", [chatUsers[1], chatUsers[2]])).toEqual(
      fullChats[1]
    );
    expect(transformChat(chats[2], "chat-id-3", [chatUsers[0], chatUsers[2]])).toEqual(
      fullChats[2]
    );
    expect(
      transformChat(chats[3], "chat-id-4", [chatUsers[0], chatUsers[1], chatUsers[2]])
    ).toEqual(fullChats[3]);
  });
});
