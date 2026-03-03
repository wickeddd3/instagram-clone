import { useLazyQuery } from "@apollo/client/react";
import { CHECK_AVAILABILITY } from "../api/query";
import { type CheckAvailability } from "./types";

export const useProfileAvailabilityCheck = () => {
  const [checkAvailability] =
    useLazyQuery<CheckAvailability>(CHECK_AVAILABILITY);

  return { checkAvailability };
};
