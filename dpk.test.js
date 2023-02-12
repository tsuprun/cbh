const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a 128-character hex when partition key is too long", () => {
    const key = deterministicPartitionKey({
      partitionKey: Array(512).join("x"),
    });
    expect(key).toHaveLength(128);
    const allHex = [...key].every((char) =>
      "0123456789abcdefABCDEF".includes(char)
    );
    expect(allHex).toEqual(true);
  });

  it("keeps the same key if it's a short string", () => {
    const key = deterministicPartitionKey({
      partitionKey: "Hello world!",
    });
    expect(key).toEqual("Hello world!");
  });

  // TODO: this one is still failing
  it("stringifies key if it's a JSON", () => {
    const key = deterministicPartitionKey({
      partitionKey: {
        hi: "world",
      },
    });
    expect(key).toEqual(JSON.stringify({ hi: "world" }));
  });
});
