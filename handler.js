"use strict";

module.exports.healthy = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Healthy!",
        input: event,
      },
      null,
      2
    ),
  };
};
