import { formatDateToNow, formatStoryTime } from "../date";

describe("formatDateToNow", () => {
  it("returns an empty string for empty input", () => {
    expect(formatDateToNow("")).toBe("");
  });

  it("formats a past date with an 'ago' suffix", () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    expect(formatDateToNow(oneHourAgo)).toMatch(/ago$/);
  });
});

describe("formatStoryTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-11T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns an empty string for empty input", () => {
    expect(formatStoryTime("")).toBe("");
  });

  it("abbreviates minutes to 'Nm'", () => {
    expect(formatStoryTime(new Date("2026-07-11T11:55:00Z"))).toBe("5m");
  });

  it("abbreviates hours to 'Nh'", () => {
    expect(formatStoryTime(new Date("2026-07-11T10:00:00Z"))).toBe("2h");
  });
});
