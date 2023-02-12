const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }
  const partitionKey =
    typeof event.partitionKey === "string"
      ? event.partitionKey
      : JSON.stringify(event.partitionKey);

  const partitionKeyIsUsable = partitionKey?.length <= MAX_PARTITION_KEY_LENGTH;

  if (!partitionKeyIsUsable) {
    return crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
  }

  return partitionKey;
};
