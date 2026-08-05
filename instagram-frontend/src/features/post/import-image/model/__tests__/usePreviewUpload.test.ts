import { act } from "react";
import { renderHook } from "@testing-library/react";
import { toast } from "sonner";
import { usePreviewUpload } from "../usePreviewUpload";
import { MAX_FILE_SIZE_BYTES, MAX_UPLOAD_FILES } from "@/shared/config";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

let urlCounter = 0;
const createObjectURL = vi.fn(() => `blob:${String(++urlCounter)}`);
const revokeObjectURL = vi.fn();

// Stub in beforeEach only. RTL's afterEach cleanup() unmounts each tree — which
// runs the hook's revoke-on-unmount effect — so the URL stub must still be in
// place when cleanup runs. Re-stubbing each test keeps it available; Vitest
// isolates test files, so the stub never leaks beyond this spec.
beforeEach(() => {
  urlCounter = 0;
  vi.clearAllMocks();
  vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });
});

const imageFile = (name: string, type = "image/png", size = 1024) => {
  const file = new File(["x"], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
};

describe("usePreviewUpload", () => {
  it("adds valid files and exposes parallel files/previewUrls", () => {
    const { result } = renderHook(() => usePreviewUpload());

    act(() => result.current.addFiles([imageFile("a.png"), imageFile("b.jpg", "image/jpeg")]));

    expect(result.current.items).toHaveLength(2);
    expect(result.current.files.map((f) => f.name)).toEqual(["a.png", "b.jpg"]);
    expect(result.current.previewUrls).toHaveLength(2);
    expect(createObjectURL).toHaveBeenCalledTimes(2);
  });

  it("rejects unsupported types and oversized files without creating a preview", () => {
    const { result } = renderHook(() => usePreviewUpload());

    act(() => {
      result.current.addFiles([
        imageFile("bad.pdf", "application/pdf"),
        imageFile("huge.png", "image/png", MAX_FILE_SIZE_BYTES + 1),
      ]);
    });

    expect(result.current.items).toHaveLength(0);
    expect(createObjectURL).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalled();
  });

  it("caps the selection at MAX_UPLOAD_FILES and warns", () => {
    const { result } = renderHook(() => usePreviewUpload());
    const many = Array.from({ length: MAX_UPLOAD_FILES + 3 }, (_, i) => imageFile(`f${String(i)}.png`));

    act(() => result.current.addFiles(many));

    expect(result.current.items).toHaveLength(MAX_UPLOAD_FILES);
    expect(toast.error).toHaveBeenCalled();
  });

  it("appends across multiple calls up to the cap", () => {
    const { result } = renderHook(() => usePreviewUpload());

    act(() => result.current.addFiles([imageFile("a.png")]));
    act(() => result.current.addFiles([imageFile("b.png")]));

    expect(result.current.items).toHaveLength(2);
  });

  it("removes a file by id and revokes its preview URL", () => {
    const { result } = renderHook(() => usePreviewUpload());
    act(() => result.current.addFiles([imageFile("a.png"), imageFile("b.png")]));

    const removedUrl = result.current.items[0].previewUrl;
    const removedId = result.current.items[0].id;
    act(() => result.current.removeFile(removedId));

    expect(result.current.items.map((i) => i.file.name)).toEqual(["b.png"]);
    expect(revokeObjectURL).toHaveBeenCalledWith(removedUrl);
  });

  it("reset clears everything and revokes all preview URLs", () => {
    const { result } = renderHook(() => usePreviewUpload());
    act(() => result.current.addFiles([imageFile("a.png"), imageFile("b.png")]));
    const urls = result.current.previewUrls;

    act(() => result.current.reset());

    expect(result.current.items).toHaveLength(0);
    urls.forEach((url) => expect(revokeObjectURL).toHaveBeenCalledWith(url));
  });

  it("revokes remaining preview URLs on unmount", () => {
    const { result, unmount } = renderHook(() => usePreviewUpload());
    act(() => result.current.addFiles([imageFile("a.png")]));
    const url = result.current.previewUrls[0];

    unmount();

    expect(revokeObjectURL).toHaveBeenCalledWith(url);
  });
});
