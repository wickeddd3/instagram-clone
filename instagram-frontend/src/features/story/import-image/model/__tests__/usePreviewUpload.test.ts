import { act } from "react";
import { renderHook } from "@testing-library/react";
import { toast } from "sonner";
import { usePreviewUpload } from "../usePreviewUpload";
import { MAX_FILE_SIZE_BYTES } from "@/shared/config";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

let urlCounter = 0;
const createObjectURL = vi.fn(() => `blob:${String(++urlCounter)}`);
const revokeObjectURL = vi.fn();

// Stub in beforeEach only so the stub is still present when RTL's afterEach
// cleanup() unmounts the tree and runs the hook's revoke-on-unmount effect.
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

describe("usePreviewUpload (story)", () => {
  it("selects a valid image and exposes file + previewUrl", () => {
    const { result } = renderHook(() => usePreviewUpload());

    act(() => result.current.selectFile(imageFile("a.png")));

    expect(result.current.file?.name).toBe("a.png");
    expect(result.current.previewUrl).toBe("blob:1");
    expect(createObjectURL).toHaveBeenCalledTimes(1);
  });

  it("rejects an unsupported type without creating a preview", () => {
    const { result } = renderHook(() => usePreviewUpload());

    act(() => result.current.selectFile(imageFile("bad.pdf", "application/pdf")));

    expect(result.current.file).toBeNull();
    expect(result.current.previewUrl).toBeNull();
    expect(createObjectURL).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalled();
  });

  it("rejects a file over the size limit", () => {
    const { result } = renderHook(() => usePreviewUpload());

    act(() => result.current.selectFile(imageFile("huge.png", "image/png", MAX_FILE_SIZE_BYTES + 1)));

    expect(result.current.file).toBeNull();
    expect(toast.error).toHaveBeenCalled();
  });

  it("replaces the current image and revokes the previous preview URL", () => {
    const { result } = renderHook(() => usePreviewUpload());
    act(() => result.current.selectFile(imageFile("a.png")));
    const firstUrl = result.current.previewUrl;

    act(() => result.current.selectFile(imageFile("b.jpg", "image/jpeg")));

    expect(result.current.file?.name).toBe("b.jpg");
    expect(result.current.previewUrl).toBe("blob:2");
    expect(revokeObjectURL).toHaveBeenCalledWith(firstUrl);
  });

  it("reset clears the media and revokes its preview URL", () => {
    const { result } = renderHook(() => usePreviewUpload());
    act(() => result.current.selectFile(imageFile("a.png")));
    const url = result.current.previewUrl;

    act(() => result.current.reset());

    expect(result.current.file).toBeNull();
    expect(revokeObjectURL).toHaveBeenCalledWith(url);
  });

  it("revokes the preview URL on unmount", () => {
    const { result, unmount } = renderHook(() => usePreviewUpload());
    act(() => result.current.selectFile(imageFile("a.png")));
    const url = result.current.previewUrl;

    unmount();

    expect(revokeObjectURL).toHaveBeenCalledWith(url);
  });
});
