import { LOGO_URL, HERO_IMAGE } from "../products-data.js";
import { initAuth, login, register, validateEmail, validatePassword, onAuthChange } from "../auth.js";
import { parseQueryParams } from "../format.js";

initAuth();

document.getElementById("auth-hero").style.backgroundImage = `url('${HERO_IMAGE}')`;
document.getElementById("auth-logo").src = LOGO_URL;
document.getElementById("auth-logo-mobile").src = LOGO_URL;

const { redirect } = parseQueryParams();
const redirectUrl = redirect || "index.html";

onAuthChange((user) => {
  if (user) window.location.href = redirectUrl;
});

const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const formLogin = document.getElementById("form-login");
const formRegister = document.getElementById("form-register");

function switchTab(target) {
  const isLogin = target === "login";
  tabLogin.classList.toggle("tab-active", isLogin);
  tabLogin.classList.toggle("text-on-surface-variant", !isLogin);
  tabRegister.classList.toggle("tab-active", !isLogin);
  tabRegister.classList.toggle("text-on-surface-variant", isLogin);
  formLogin.classList.toggle("hidden-form", !isLogin);
  formRegister.classList.toggle("hidden-form", isLogin);
}

tabLogin.addEventListener("click", () => switchTab("login"));
tabRegister.addEventListener("click", () => switchTab("register"));
document.getElementById("go-register").addEventListener("click", () => switchTab("register"));

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const errEl = document.getElementById("login-error");
  errEl.classList.add("hidden");

  if (!validateEmail(email)) {
    document.getElementById("login-email-error").textContent = "Correo electrónico no válido";
    document.getElementById("login-email-error").classList.remove("hidden");
    return;
  }
  document.getElementById("login-email-error").classList.add("hidden");

  try {
    await login(email, password);
  } catch (err) {
    errEl.textContent = err.message || "Error al iniciar sesión";
    errEl.classList.remove("hidden");
  }
});

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;
  const errEl = document.getElementById("register-error");
  errEl.classList.add("hidden");

  if (!validateEmail(email)) {
    document.getElementById("reg-email-error").textContent = "Correo electrónico no válido";
    document.getElementById("reg-email-error").classList.remove("hidden");
    return;
  }
  document.getElementById("reg-email-error").classList.add("hidden");

  if (!validatePassword(password)) {
    errEl.textContent = "La contraseña debe tener al menos 6 caracteres";
    errEl.classList.remove("hidden");
    return;
  }
  if (password !== confirm) {
    errEl.textContent = "Las contraseñas no coinciden";
    errEl.classList.remove("hidden");
    return;
  }
  if (!document.getElementById("reg-terms").checked) {
    errEl.textContent = "Debes aceptar los términos y condiciones";
    errEl.classList.remove("hidden");
    return;
  }

  try {
    await register(email, password, name);
  } catch (err) {
    errEl.textContent = err.message || "Error al crear la cuenta";
    errEl.classList.remove("hidden");
  }
});
