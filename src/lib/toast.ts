export function showToast(message: string, durationOrType: number | string = 4000) {
  try {
    const id = `toast-${Date.now()}`;
    const el = document.createElement("div");
    el.id = id;
    el.style.position = "fixed";
    el.style.top = "20px";
    el.style.right = "20px";
    el.style.background = "rgba(30,41,59,0.95)";
    el.style.color = "white";
    el.style.padding = "10px 14px";
    el.style.borderRadius = "8px";
    el.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
    el.style.zIndex = "9999";
    el.style.fontSize = "14px";
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.transition = "opacity 300ms";
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 350);
    }, typeof durationOrType === "number" ? durationOrType : 4000);
  } catch (e) {
    try { alert(message); } catch { /* ignore */ }
  }
}

export default showToast;
