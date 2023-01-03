# Tinybird Flattening Worker

For flattening JSON objects before writing to Tinybird's events API.

This prevents them from dropping data as they don't parse complex nesting.

## How to use

Just replace the events api url with this, and put the events api url in the `tb_url` query param. Body and headers stay the same.

Example: `https://blah.workers.dev?tb_url=https%3A%2F%2Fapi.us-east.tinybird.co%2Fv0%2Fevents%3Fname%3Dworker_test`
