// Shared page loading indicator. Does not block navigation or trap focus.
(() => {
    const panel = document.createElement("div");
    panel.className = "page-loading";
    panel.setAttribute("role", "status");
    panel.setAttribute("aria-live", "polite");
    panel.innerHTML = '<span class="loading-orbit" aria-hidden="true">↗</span><span><strong>Level Up</strong><small>Уншиж байна…</small></span><span class="loading-dots" aria-hidden="true"><i></i><i></i><i></i></span>';
    document.body.append(panel);
    let closed = false;
    let fallback;
    const finish = () => {
        if (closed) return;
        closed = true;
        clearTimeout(fallback);
        panel.classList.add("is-finished");
        setTimeout(() => panel.remove(), 220);
    };
    window.finishLoading = finish;
    // Recover when a dependency is unavailable instead of leaving a permanent spinner.
    fallback = setTimeout(finish, 12000);
    window.addEventListener("pageshow", event => { if (event.persisted) finish(); });
    window.addEventListener("error", finish, { once: true });
    window.addEventListener("unhandledrejection", finish, { once: true });
    const file = location.pathname.split("/").pop().toLowerCase();
    if (!file || file === "index.html" || file === "sing.html") {
        if (document.readyState === "complete") finish();
        else window.addEventListener("load", finish, { once: true });
    }
})();
