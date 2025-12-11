import { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Mail, User, MessageSquare, Send, CheckCircle } from "lucide-react";

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

        const data = {
            email: email,
            message: message,
            name: name,
        };

        try {
            const res = await fetch("http://localhost:5000/api/sendEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok || !result.data) {
                setError(result.error || "Failed to send email. Please try again.");
                setLoading(false);
                return;
            }

            // Clear form only on success
            setEmail("");
            setMessage("");
            setName("");
            setLoading(false);
            setDone(true);
        } catch (err) {
            setError("An error occurred. Please try again.");
            setLoading(false);
            console.error("Error sending email:", err);
        }
    };

    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
        >
            <div className="w-full p-5 pb-40 text-left">
                {/* Header matching other pages */}
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-indigo-500">
                    Get in touch
                </h2>

                <p className="mt-3 text-base font-medium max-w-2xl text-gray-400">
                    Fill in the form to start a conversation
                </p>

                <p className="mt-2 text-base max-w-3xl text-gray-400 leading-relaxed">
                    You can contact me with any questions, suggestions or just to say hi.
                    I am always open to new ideas and collaborations. It can be anything like
                    collaborating on good projects or startups or anime or gaming or anything else.
                </p>

                {!done ? (
                    <div className="mt-8 max-w-3xl">
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-md">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <form className="space-y-6">
                            {/* Name Input */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    <User size={16} className="inline mr-2" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 bg-[#161b22] border border-[#30363d] rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    <Mail size={16} className="inline mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 bg-[#161b22] border border-[#30363d] rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                />
                            </div>

                            {/* Message Input */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    <MessageSquare size={16} className="inline mr-2" />
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Your message here..."
                                    rows={6}
                                    className="w-full px-4 py-3 bg-[#161b22] border border-[#30363d] rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            {!loading ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (name === "") {
                                            setError("Please enter your name.");
                                        } else if (email === "") {
                                            setError("Please enter your email.");
                                        } else if (message === "") {
                                            setError("Please enter your message.");
                                        } else {
                                            finalSendEmail();
                                        }
                                    }}
                                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition-colors duration-200 flex items-center gap-2"
                                >
                                    <Send size={18} />
                                    Send Message
                                </button>
                            ) : (
                                <div className="flex items-center gap-3 text-gray-300">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-500 border-t-transparent"></div>
                                    <span>Sending...</span>
                                </div>
                            )}
                        </form>
                    </div>
                ) : (
                    <div className="mt-8 max-w-3xl bg-[#161b22] border border-[#30363d] rounded-lg p-12 text-center">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <CheckCircle size={64} className="text-green-500" />
                            <h3 className="text-2xl font-bold text-white">
                                Message Sent Successfully!
                            </h3>
                            <p className="text-base text-gray-400 max-w-md">
                                Thank you for reaching out. I've received your message and will get back to you as soon as possible.
                            </p>
                            <p className="text-sm text-gray-500">
                                You should receive a confirmation email shortly.
                            </p>
                            <button
                                onClick={() => setDone(false)}
                                className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md transition-colors duration-200"
                            >
                                Send Another Message
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer Info */}
                <div className="mt-8 text-left max-w-3xl">
                    <p className="text-sm text-gray-500">
                        You can also reach me directly at{" "}
                        <a
                            href="mailto:garvitdani@gmail.com"
                            className="text-indigo-400 hover:text-indigo-300 hover:underline"
                        >
                            garvitdani@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </Scrollbars>
    );
};

export default Email;
