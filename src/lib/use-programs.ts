import { useEffect, useState } from "react";
import { allPrograms, loadScanMeta, subscribePrograms } from "@/lib/discovered";
import type { Development } from "@/data/pipeline";

export function usePrograms(): {
  programs: Development[];
  lastScan: string | null;
} {
  const [programs, setPrograms] = useState<Development[]>(() => allPrograms());
  const [lastScan, setLastScan] = useState<string | null>(() => loadScanMeta()?.at ?? null);

  useEffect(() => {
    return subscribePrograms(() => {
      setPrograms(allPrograms());
      setLastScan(loadScanMeta()?.at ?? null);
    });
  }, []);

  return { programs, lastScan };
}
