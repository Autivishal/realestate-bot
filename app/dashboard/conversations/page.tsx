"use client";

import { MessageSquare, Search, Bot, User } from "lucide-react";
import { useState } from "react";

const CONVERSATIONS = [
    {
        id: 1,
        lead: "Aarav Shah",
        lastMsg: "Can you tell me more about the 3 BHK in Baner?",
        time: "2m ago",
        unread: 3,
        messages: [
            { from: "lead", text: "Hi, I'm looking for a 3 BHK in Baner area.", time: "10:00 AM" },
            { from: "bot", text: "Hello Aarav! Great, we have some excellent 3 BHK options in Baner. What's your budget range?", time: "10:00 AM" },
            { from: "lead", text: "Around 90 lakhs to 1 Crore.", time: "10:01 AM" },
            { from: "bot", text: "Perfect! We have a stunning 3 BHK (1450 sqft) in Baner at ₹85L. It has 2 baths, modular kitchen, and covered parking. Would you like to schedule a site visit?", time: "10:01 AM" },
            { from: "lead", text: "Can you tell me more about the 3 BHK in Baner?", time: "10:03 AM" },
        ],
    },
    {
        id: 2,
        lead: "Priya Desai",
        lastMsg: "What floor is the flat on?",
        time: "18m ago",
        unread: 1,
        messages: [
            { from: "lead", text: "Hello, I need a 2 BHK near Viman Nagar", time: "9:45 AM" },
            { from: "bot", text: "Hi Priya! We have a 2 BHK at ₹55L in Viman Nagar, just 500m from the main road.", time: "9:45 AM" },
            { from: "lead", text: "What floor is the flat on?", time: "9:50 AM" },
        ],
    },
    {
        id: 3,
        lead: "Rohan Mehta",
        lastMsg: "Sounds great! When can we visit?",
        time: "1h ago",
        unread: 0,
        messages: [
            { from: "lead", text: "I want a villa in Koregaon Park", time: "9:00 AM" },
            { from: "bot", text: "Welcome Rohan! We have a beautiful 5 BHK villa in Koregaon Park at ₹2.5Cr with a private garden.", time: "9:00 AM" },
            { from: "lead", text: "Sounds great! When can we visit?", time: "9:05 AM" },
            { from: "bot", text: "We can arrange a visit this Saturday at 11 AM or Sunday at 3 PM. Which works for you?", time: "9:05 AM" },
        ],
    },
];

export default function ConversationsPage() {
    const [selected, setSelected] = useState(CONVERSATIONS[0]);
    const [search, setSearch] = useState("");
    const [reply, setReply] = useState("");

    const filtered = CONVERSATIONS.filter((c) =>
        c.lead.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-full flex">
            {/* List */}
            <div className="w-72 border-r border-border flex-shrink-0 flex flex-col bg-card">
                <div className="p-4 border-b border-border">
                    <h1 className="font-bold text-lg">Conversations</h1>
                    <div className="relative mt-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 rounded-lg bg-background border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                </div>
                <div className="overflow-y-auto flex-1">
                    {filtered.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setSelected(c)}
                            className={`w-full text-left p-4 border-b border-border hover:bg-border/30 transition-colors ${selected.id === c.id ? "bg-primary/5 border-l-2 border-l-primary" : ""
                                }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{c.lead}</span>
                                <span className="text-xs text-foreground/40">{c.time}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-foreground/60 truncate flex-1 pr-2">{c.lastMsg}</p>
                                {c.unread > 0 && (
                                    <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 font-bold">
                                        {c.unread}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-background">
                <div className="h-14 border-b border-border px-6 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-sm font-bold text-primary">
                        {selected.lead[0]}
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{selected.lead}</p>
                        <p className="text-xs text-foreground/40">via WhatsApp</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selected.messages.map((msg, i) => (
                        <div key={i} className={`flex items-end gap-2 ${msg.from === "lead" ? "justify-start" : "justify-end"}`}>
                            {msg.from === "bot" && (
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Bot className="h-3.5 w-3.5 text-primary" />
                                </div>
                            )}
                            <div>
                                <div
                                    className={`px-4 py-2.5 rounded-2xl text-sm max-w-xs lg:max-w-sm ${msg.from === "lead"
                                            ? "bg-card border border-border rounded-tl-none text-foreground"
                                            : "bg-primary text-primary-foreground rounded-tr-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                                <p className="text-xs text-foreground/40 mt-1 px-1">{msg.time}</p>
                            </div>
                            {msg.from === "lead" && (
                                <div className="h-6 w-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                                    <User className="h-3.5 w-3.5 text-foreground/60" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Reply */}
                <div className="border-t border-border p-4 flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Type a message or let the bot handle it..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                    <button
                        onClick={() => setReply("")}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                        <MessageSquare className="h-4 w-4" />
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
