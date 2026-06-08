import React, { useState } from "react";
import { Terminal, ArrowRight, ShieldCheck, HelpCircle, Lock, UserCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../lib/api";

interface PortalGatewayProps {
  onShowNotification: (msg: string) => void;
}

export default function PortalGateway({ onShowNotification }: PortalGatewayProps) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<"client" | "student">("client");
  const [identifier, setIdentifier] = useState<string>("");
  const [passkey, setPasskey] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState<boolean>(false);
  const [remainSession, setRemainSession] = useState<boolean>(true);

  // Matches the backend phone rule: digits with optional +, spaces, -, ().
  const isValidPhone = (value: string) => /^\+?[0-9][0-9\s\-()]{6,19}$/.test(value.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      onShowNotification("Please enter your email or ID.");
      return;
    }
    if (!passkey) {
      onShowNotification("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      // Identifier may be the access ref (CLI-…) or the account email.
      await login(identifier.trim(), passkey);
      onShowNotification("Welcome back! You're now signed in.");
      // On success the auth state flips and App renders the dashboard.
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Sign-in failed. Please check your details.";
      onShowNotification(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = identifier.trim();
    if (!fullName.trim()) {
      onShowNotification("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      onShowNotification("Please enter a valid email address.");
      return;
    }
    if (!isValidPhone(phone)) {
      onShowNotification("Please enter a valid phone number.");
      return;
    }
    if (passkey.length < 8) {
      onShowNotification("Please choose a password with at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      await register({ email, password: passkey, name: fullName.trim(), phone: phone.trim(), role: tab });
      onShowNotification(`Welcome, ${fullName.trim()}! Your account is ready.`);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "We couldn't create your account. Please try again.";
      onShowNotification(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-6">
      
      {/* Background scanline atmospheric simulation */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="grid-overlay absolute inset-0 opacity-15"></div>
        <div className="scanline"></div>
        
        {/* Wireframe blueprints */}
        <div className="absolute top-16 left-0 right-0 h-[1px] bg-outline-variant opacity-15"></div>
        <div className="absolute bottom-16 left-0 right-0 h-[1px] bg-outline-variant opacity-15"></div>
        <div className="absolute left-16 top-0 bottom-0 w-[1px] bg-outline-variant opacity-15"></div>
        <div className="absolute right-16 top-0 bottom-0 w-[1px] bg-outline-variant opacity-15"></div>

        {/* Technical numbers positioning metadata in corners */}
        <div className="absolute top-24 left-12 font-mono text-xs text-on-surface-variant opacity-15 select-none space-y-1 hidden lg:block">
          <div>Kigali, Rwanda</div>
          <div>Secure sign-in</div>
          <div>Your data is protected</div>
        </div>
        <div className="absolute bottom-24 right-12 font-mono text-xs text-on-surface-variant opacity-15 select-none text-right space-y-1 hidden lg:block">
          <div>Encrypted connection</div>
          <div>Trusted &amp; private</div>
          <div>Always online</div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-12 gap-8 items-center">
        
        {/* Left column description branding */}
        <div className="col-span-12 md:col-span-5 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-secondary-fixed-dim flex items-center justify-center relative">
              <div className="absolute inset-1 border border-secondary-fixed-dim/20"></div>
              <Terminal className="text-secondary-fixed-dim" size={20} />
            </div>
            <h1 className="font-sans text-xl md:text-2xl font-extrabold text-white uppercase tracking-tighter">
              Lanari Tech Ltd
            </h1>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-secondary-fixed-dim rounded-full animate-pulse"></span>
              <p className="font-mono text-xs text-secondary-fixed-dim uppercase font-bold tracking-wider">
                We're online
              </p>
            </div>

            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white uppercase">
              Welcome to <br />
              <span className="text-secondary-fixed">Your Portal</span>
            </h2>

            <p className="font-sans text-on-surface-variant text-sm md:text-base leading-relaxed max-w-md">
              Sign in to manage your projects, find your files, and track your training progress — all in one place.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 select-none">
              <div className="px-4 py-2 border border-outline-variant bg-surface-container-low font-mono text-xs text-on-surface-variant">
                For clients
              </div>
              <div className="px-4 py-2 border border-outline-variant bg-surface-container-low font-mono text-xs text-on-surface-variant">
                For students
              </div>
            </div>
          </div>
        </div>

        {/* Right column auth card layout */}
        <div className="col-span-12 md:col-span-7 flex justify-center">
          <div className="w-full max-w-[485px] bg-[#1d2022] border border-outline-variant p-4 md:p-8 relative transition-all duration-300 hover:border-secondary-fixed">
            
            <div className="absolute -top-[13px] -right-[5px] font-mono text-[9px] bg-background px-2 py-1 text-secondary-fixed border border-outline-variant font-bold select-none z-20">
              {mode === "signin" ? "Secure sign-in" : "New account"}
            </div>

            {/* Account type tabs (client vs student) */}
            <div className="grid grid-cols-2 gap-px bg-outline-variant mb-6 select-none">
              <button
                type="button"
                onClick={() => { setTab("client"); }}
                className={`py-4 font-mono text-xs transition-all cursor-pointer ${
                  tab === "client"
                    ? "bg-[#0a0e1a] text-secondary-fixed border-b border-secondary-fixed font-bold shadow-[0_0_15px_rgba(86,255,168,0.05)]"
                    : "bg-[#191c1e] text-on-surface-variant hover:text-white"
                }`}
              >
                <span>CLIENT</span>
                <span className="block text-[9px] opacity-40 mt-1 font-normal uppercase">Your projects</span>
              </button>

              <button
                type="button"
                onClick={() => { setTab("student"); }}
                className={`py-4 font-mono text-xs transition-all cursor-pointer ${
                  tab === "student"
                    ? "bg-[#0a0e1a] text-secondary-fixed border-b border-secondary-fixed font-bold shadow-[0_0_15px_rgba(86,255,168,0.05)]"
                    : "bg-[#191c1e] text-on-surface-variant hover:text-white"
                }`}
              >
                <span>STUDENT</span>
                <span className="block text-[9px] opacity-40 mt-1 font-normal uppercase">Your training</span>
              </button>
            </div>

            {/* Sign-in / Sign-up form */}
            <form onSubmit={mode === "signin" ? handleSubmit : handleCreateAccount} className="space-y-6">

              {mode === "signup" && (
                <div className="space-y-2">
                  <label className="font-mono text-xs text-on-surface-variant uppercase flex justify-between font-bold">
                    <span>Full name</span>
                    <span className="text-[10px] opacity-45">REQUIRED</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Mugisha"
                    className="w-full bg-[#191c1e] border border-outline-variant py-4 px-4 font-mono text-xs text-white outline-none focus:border-secondary-fixed transition-all"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="font-mono text-xs text-on-surface-variant uppercase flex justify-between font-bold">
                  <span>{mode === "signin" ? "Email or ID" : "Email"}</span>
                  <span className="text-[10px] opacity-45">REQUIRED</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={mode === "signin" ? "you@example.com or your ID" : "you@example.com"}
                    className="w-full bg-[#191c1e] border border-outline-variant py-4 px-4 font-mono text-xs text-white outline-none focus:border-secondary-fixed transition-all"
                  />
                </div>
                {mode === "signin" && (
                  <p className="font-mono text-[9px] text-outline opacity-60">
                    Sign in with your email or the ID we gave you.
                  </p>
                )}
              </div>

              {mode === "signup" && (
                <div className="space-y-2">
                  <label className="font-mono text-xs text-on-surface-variant uppercase flex justify-between font-bold">
                    <span>Phone number</span>
                    <span className="text-[10px] opacity-45">REQUIRED</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +250 788 123 456"
                    className="w-full bg-[#191c1e] border border-outline-variant py-4 px-4 font-mono text-xs text-white outline-none focus:border-secondary-fixed transition-all"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="font-mono text-xs text-on-surface-variant uppercase flex justify-between font-bold">
                  <span>Password</span>
                  <span className="text-[10px] opacity-45 font-bold">{mode === "signin" ? "PRIVATE" : "MIN 8 CHARS"}</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#191c1e] border border-outline-variant py-4 px-4 font-mono text-xs text-white outline-none focus:border-secondary-fixed transition-all"
                  />
                </div>
              </div>

              {mode === "signin" && (
                <div className="flex items-center justify-between py-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={remainSession}
                      onChange={(e) => setRemainSession(e.target.checked)}
                      className="bg-[#191c1e] border-outline-variant text-secondary-fixed focus:ring-0 w-3.5 h-3.5"
                    />
                    <span className="font-mono text-on-surface-variant font-bold">Keep me signed in</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => onShowNotification("No problem — we'll help you reset your password. Check your email.")}
                    className="font-mono text-xs font-bold text-outline hover:text-secondary-fixed bg-transparent cursor-pointer border-none"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary-fixed text-on-secondary font-mono py-5 flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all group cursor-pointer text-[#002110] font-bold disabled:opacity-60"
              >
                <span>{mode === "signin" ? "SIGN IN" : `CREATE ${tab.toUpperCase()} ACCOUNT`}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <div className="pt-6 border-t border-outline-variant text-center">
                {mode === "signin" ? (
                  <p className="font-mono text-[11px] text-outline-variant">
                    New here?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="font-bold text-secondary-fixed hover:underline bg-transparent cursor-pointer border-none"
                    >
                      Create an account
                    </button>
                  </p>
                ) : (
                  <p className="font-mono text-[11px] text-outline-variant">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signin")}
                      className="font-bold text-secondary-fixed hover:underline bg-transparent cursor-pointer border-none"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>

            </form>

            {/* Cryptographic handshake delay overlay loading state */}
            {loading && (
              <div className="absolute inset-0 bg-[#101415]/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-8">
                <div className="w-32 h-[3px] bg-outline-variant overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 bg-secondary-fixed animate-[loading_1.5s_infinite]" style={{ width: "60%" }}></div>
                </div>
                <p className="mt-4 font-mono text-xs text-secondary-fixed-dim animate-pulse font-bold uppercase tracking-widest">
                  Signing you in...
                </p>
              </div>
            )}

          </div>
        </div>

      </div>

      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}
