import type { ChangeEvent } from "react";
import { createUploadPath, getFileData, generatePreview, validateImageFile } from "../upload";
import { MAX_FILE_SIZE_BYTES } from "@/shared/config";

const fileOfSize = (bytes: number, type = "image/png") => {
  const file = new File(["x"], "a.png", { type });
  Object.defineProperty(file, "size", { value: bytes });
  return file;
};

describe("createUploadPath", () => {
  it("prefixes the path with the user id and preserves the extension", () => {
    const file = new File(["x"], "avatar.png", { type: "image/png" });
    const path = createUploadPath("user-123", file);
    expect(path.startsWith("user-123/")).toBe(true);
    expect(path.endsWith(".png")).toBe(true);
  });

  it("produces a unique path per call", () => {
    const file = new File(["x"], "a.jpg", { type: "image/jpeg" });
    expect(createUploadPath("u", file)).not.toBe(createUploadPath("u", file));
  });
});

describe("getFileData", () => {
  it("returns the first selected file", () => {
    const file = new File(["x"], "a.png", { type: "image/png" });
    const e = {
      target: { files: [file] },
    } as unknown as ChangeEvent<HTMLInputElement>;
    expect(getFileData(e)).toBe(file);
  });

  it("returns null when no file is selected", () => {
    const e = {
      target: { files: null },
    } as unknown as ChangeEvent<HTMLInputElement>;
    expect(getFileData(e)).toBeNull();
  });
});

describe("validateImageFile", () => {
  it("accepts a supported image within the size limit", () => {
    expect(validateImageFile(fileOfSize(1024, "image/jpeg"))).toBeNull();
  });

  it("rejects an unsupported type", () => {
    const error = validateImageFile(fileOfSize(1024, "application/pdf"));
    expect(error).toMatch(/not a supported image/i);
  });

  it("rejects a file over the size limit", () => {
    const error = validateImageFile(fileOfSize(MAX_FILE_SIZE_BYTES + 1, "image/png"));
    expect(error).toMatch(/larger than/i);
  });

  it("accepts a file exactly at the size limit", () => {
    expect(validateImageFile(fileOfSize(MAX_FILE_SIZE_BYTES, "image/webp"))).toBeNull();
  });
});

describe("generatePreview", () => {
  it("delegates to URL.createObjectURL", () => {
    const spy = vi.fn(() => "blob:preview");
    vi.stubGlobal("URL", { createObjectURL: spy });

    const file = new File(["x"], "a.png", { type: "image/png" });
    expect(generatePreview(file)).toBe("blob:preview");
    expect(spy).toHaveBeenCalledWith(file);

    vi.unstubAllGlobals();
  });
});
