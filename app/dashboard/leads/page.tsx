"use client";

import {
    Users,
    Search,
    Phone,
    MessageSquare,
    Filter,
    ChevronDown,
    Star,
} from "lucide-react";
import { useState } from "react";

const LEADS = [
    { id: 1, name: "Aarav Shah", phone: "+91 98234 56789", query: "3 BHK in Baner under ₹1Cr", status: "New", score: 92, time: "2m ago" },
    { id: 2, name: "Priya Desai", phone: "+91 91234 56780", query: "2 BHK flat near Viman Nagar", status: "Qualified", score: 87, time: "18m ago" },
    { id: 3, name: "Rohan Mehta", phone: "+91 98765 43210", query: "Luxury villa in Koregaon Park", status: "Viewing", score: 95, time: "1h ago" },
    { id: 4, name: "Sneha Patil", phone: "+91 88234 12345", query: "Office space 1000-1500 sqft", status: "New", score: 75, time: "3h ago" },
    { id: 5, name: "Karan Joshi", phone: "+91 77654 32100", query: "2 BHK near Hinjewadi IT park", status: "Qualified", score: 81, time: "5h ago" },
    { id: 6, name: "Meera Kulkarni", phone: "+91 99544 66778", query: "Plot in NIBM area", status: "Cold", score: 45, time: "1d ago" },
    { id: 7, name: "Suresh Iyer", phone: "+91 80123 45678", query: "1 BHK under ₹40L", status: "Closed", score: 70, time: "2d ago" },
    { id: 8, name: "Ananya Singh", phone: "+91 98001 23456", query: "Row house in Aundh", status: "New", score: 88, time: "3d ago" },
];

const statusColors: Record<string, string> = {
    New: "bg-primary/10 text-primary",
    Qualified: "bg-accent/10 text-accent",
    Viewing: "bg-orange-500/10 text-orange-500",
    Cold: "bg-foreground/10 text-foreground/60",
    Closed: "bg-red-500/10 text-red-500",
};

export default function LeadsPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const statuses = ["All", "New", "Qualified", "Viewing", "Cold", "Closed"];

    const filtered = LEADS.filter((l) => {
        const matchSearch =
            l.name.toLowerCase().includes(search.toLowerCase()) ||
            l.query.toLowerCase().includes(search.toLowerCase());
        const matchStatus = status === "All" || l.status === status;
        return matchSearch && matchStatus;
    });

    return (
        <div className="p-6 lg:p-8 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
                <p className="text-foreground/60 text-sm mt-1">Track and manage your property leads</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Leads", value: "142", color: "text-foreground" },
                    { label: "New Today", value: "18", color: "text-primary" },
                    { label: "Qualified", value: "57", color: "text-accent" },
                    { label: "Avg. Score", value: "78", color: "text-orange-500" },
                ].map((s) => (
                    <div key={s.label} className="bg-card border border-border rounded-xl p-4">
                        <p className="text-xs text-foreground/50">{s.label}</p>
                        <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                    <input
                        id="lead-search"
                        type="text"
                        placeholder="Search leads..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-foreground/40 flex-shrink-0" />
                    {statuses.map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${status === s
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card border border-border text-foreground/70 hover:border-primary/50"
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-border/30">
                            <th className="text-left px-5 py-3 font-medium text-foreground/60 flex items-center gap-1">
                                Name <ChevronDown className="h-3 w-3" />
                            </th>
                            <th className="text-left px-5 py-3 font-medium text-foreground/60 hidden md:table-cell">Phone</th>
                            <th className="text-left px-5 py-3 font-medium text-foreground/60 hidden lg:table-cell">Query</th>
                            <th className="text-left px-5 py-3 font-medium text-foreground/60">Status</th>
                            <th className="text-left px-5 py-3 font-medium text-foreground/60 hidden sm:table-cell">Score</th>
                            <th className="text-left px-5 py-3 font-medium text-foreground/60">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filtered.map((lead) => (
                            <tr key={lead.id} className="hover:bg-border/20 transition-colors">
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                            {lead.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium">{lead.name}</p>
                                            <p className="text-xs text-foreground/40">{lead.time}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-3.5 text-foreground/70 hidden md:table-cell">{lead.phone}</td>
                                <td className="px-5 py-3.5 text-foreground/70 hidden lg:table-cell max-w-xs truncate">{lead.query}</td>
                                <td className="px-5 py-3.5">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[lead.status]}`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5 hidden sm:table-cell">
                                    <div className="flex items-center gap-1.5">
                                        <Star className={`h-3.5 w-3.5 ${lead.score >= 80 ? "text-accent fill-accent" : "text-foreground/30"}`} />
                                        <span className={`font-semibold ${lead.score >= 80 ? "text-accent" : "text-foreground/60"}`}>
                                            {lead.score}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-2">
                                        <button className="h-7 w-7 rounded-lg bg-primary/10 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors">
                                            <Phone className="h-3.5 w-3.5" />
                                        </button>
                                        <button className="h-7 w-7 rounded-lg bg-secondary/10 hover:bg-secondary hover:text-white text-secondary flex items-center justify-center transition-colors">
                                            <MessageSquare className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="flex flex-col items-center py-16 text-foreground/40">
                        <Users className="h-10 w-10 mb-2 opacity-30" />
                        <p className="font-medium">No leads found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
