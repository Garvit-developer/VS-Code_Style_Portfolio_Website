import { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { VscMail, VscSend, VscCheck } from "react-icons/vsc";
import emailjs from "@emailjs/browser";

const Email = () => {
    useEffect(() => {
        document.title = "Contact me";
    }, []);

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const finalSendEmail = async () => {
        setLoading(true);
        setError("");

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || "template_8jpeh2t";
        const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || "template_ku2g8bf";

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: "Garvit Dani",
        };

        try {
            const adminResponse = await emailjs.send(
                serviceId,
                adminTemplateId,
                {
                    ...templateParams,
                    to_email: "garvitdani@gmail.com",
                },
                publicKey
            );

            const autoReplyResponse = await emailjs.send(
                serviceId,
                autoReplyTemplateId,
                templateParams,
                publicKey
            );

            setEmail("");
            setMessage("");
            setName("");
            setLoading(false);
            setDone(true);
        } catch (err) {
            console.error("EmailJS Error:", err);
            setError(
                err?.text ||
                "Failed to send email. Please try again or contact me directly at garvitdani@gmail.com"
            );
            setLoading(false);
        }
    };

    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
        >
            <div className="relative min-h-screen bg-[#1e1e1e] text-[#d4d4d4] flex flex-col pb-10 md:pb-12">
                {/* Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none fixed"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />



                <div className="relative z-10 flex-1 px-6 pb-5 md:px-6 md:py-0 max-w-5xl">
                    {/* Header Consistency */}
                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-thin text-white tracking-tight">
                            Get in <span className="font-semibold text-blue-500">Touch</span>
                        </h1>
                        <p className=" text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
                            Have a question, a project idea, or just want to say hi?
                            My inbox is always open for new opportunities and collaborations.
                        </p>
                    </div>

                    {!done ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Form Section */}
                            <div className="lg:col-span-2 space-y-8">
                                {error && (
                                    <div className="p-4 bg-red-900/10 border border-red-500/20 rounded text-sm text-red-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase tracking-wider text-[#858585] flex items-center gap-2">
                                            <span className="text-blue-400">01</span> Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-[#252526] border border-[#3c3c3c] rounded text-[#d4d4d4] placeholder-gray-600 focus:outline-none focus:border-[#007acc] focus:ring-1 focus:ring-[#007acc]/30 transition-all font-mono"
                                        />
                                    </div>

                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase tracking-wider text-[#858585] flex items-center gap-2">
                                            <span className="text-blue-400">02</span> Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 bg-[#252526] border border-[#3c3c3c] rounded text-[#d4d4d4] placeholder-gray-600 focus:outline-none focus:border-[#007acc] focus:ring-1 focus:ring-[#007acc]/30 transition-all font-mono"
                                        />
                                    </div>

                                    {/* Message Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase tracking-wider text-[#858585] flex items-center gap-2">
                                            <span className="text-blue-400">03</span> Message
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="What's on your mind?"
                                            rows={6}
                                            className="w-full px-4 py-3 bg-[#252526] border border-[#3c3c3c] rounded text-[#d4d4d4] placeholder-gray-600 focus:outline-none focus:border-[#007acc] focus:ring-1 focus:ring-[#007acc]/30 transition-all font-mono resize-none leading-relaxed"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        {!loading ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (name === "") setError("Please enter your name.");
                                                    else if (email === "") setError("Please enter your email.");
                                                    else if (message === "") setError("Please enter your message.");
                                                    else finalSendEmail();
                                                }}
                                                className="group flex items-center gap-2 px-8 py-3 bg-[#007acc] hover:bg-[#0090f1] text-white rounded font-medium transition-all shadow-lg shadow-[#007acc]/10"
                                            >
                                                <VscSend size={18} className="transform transition-transform duration-300 group-hover:-rotate-45 group-hover:mb-1" />
                                                Send Message
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#007acc] border-t-transparent"></div>
                                                <span className="text-sm italic text-[#858585]">Processing request...</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar / Info Card */}
                            <div className="space-y-8 md:mt-5">
                                <div className="p-5 bg-[#252526]/50 border border-[#333] rounded-lg backdrop-blur-sm">
                                    <div className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Direct Contact</div>
                                    <div className="space-y-4">
                                        <a
                                            href="mailto:garvitdani@gmail.com"
                                            className="flex flex-col group"
                                        >
                                            <span className="text-[10px] text-[#858585] uppercase tracking-tighter group-hover:text-blue-400 transition-colors">Primary Email</span>
                                            <span className="text-sm text-[#ce9178] font-mono group-hover:underline">garvitdani@gmail.com</span>
                                        </a>
                                    </div>

                                </div>

                                <div className="p-6 border border-[#333]/50 rounded-lg bg-[#252526]/50">
                                    <div className="text-sm font-semibold text-white uppercase tracking-widest mb-2">Availability</div>
                                    <p className="text-xs text-gray-400 leading-relaxed italic">
                                        "Currently open for freelance projects and full-time software development roles."
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl bg-[#252526]/80 border border-[#333] rounded-xl p-12 text-center backdrop-blur shadow-2xl animate-in fade-in zoom-in duration-300">
                            <div className="flex flex-col items-center justify-center space-y-6">
                                <div className="p-5 bg-green-500/10 rounded-full border border-green-500/20">
                                    <VscCheck size={48} className="text-green-500" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">
                                        Message <span className="text-green-500">Sent!</span>
                                    </h3>
                                    <p className="text-gray-400 font-light leading-relaxed">
                                        Thank you for reaching out. I've received your data and will process it shortly.
                                        You should receive an auto-reply confirmation in your inbox.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setDone(false)}
                                    className="px-8 py-2.5 bg-transparent border border-[#3c3c3c] text-[#d4d4d4] hover:bg-[#333] hover:border-[#858585] transition-all rounded text-sm font-medium"
                                >
                                    Send Another
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Scrollbars>
    );
};

export default Email;
