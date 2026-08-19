/** Browser ping when a scan finds a new SPOP-named protocol. */
export function pingSpopAlert(names: string[]) {
  if (typeof window === "undefined" || names.length === 0) return;
  const title = names.length === 1 ? "SPOP ALERT — OncoVigil" : `SPOP ALERT — ${names.length} programs`;
  const body = names.slice(0, 3).join(" · ");
  const fire = () => {
    try {
      new Notification(title, { body, tag: "oncovigil-spop" });
    } catch {
      /* notifications blocked or unsupported */
    }
  };
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") fire();
  else if (Notification.permission !== "denied") {
    void Notification.requestPermission().then((p) => {
      if (p === "granted") fire();
    });
  }
}
