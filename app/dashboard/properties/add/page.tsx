"use client";

import { ArrowLeft, Upload, IndianRupee } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PROPERTY_TYPES = ["Apartment", "Villa", "Studio", "Penthouse", "Commercial", "Plot"];
const FURNISHING = ["Unfurnished", "Semi-Furnished", "Fully Furnished"];

export default function AddPropertyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            router.push("/dashboard/properties");
        }, 1200);
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/dashboard/properties"
                        className="h-9 w-9 rounded-xl border border-border flex items-center justify-center hover:bg-card transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Add Property</h1>
                        <p className="text-foreground/60 text-sm mt-0.5">Fill in the details for your new listing</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                        <h2 className="font-semibold">Basic Information</h2>

                        <div className="grid gap-4">
                            <div>
                                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Property Title *</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Luxury 3 BHK Apartment in Baner"
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-foreground/80 block mb-1.5">Property Type *</label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                    >
                                        <option value="">Select type</option>
                                        {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground/80 block mb-1.5">Furnishing</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                    >
                                        {FURNISHING.map((f) => <option key={f}>{f}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Location *</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Baner, Pune, Maharashtra"
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Price & Size */}
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                        <h2 className="font-semibold">Price & Specifications</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Price (₹) *</label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                                    <input
                                        required
                                        type="number"
                                        placeholder="8500000"
                                        className="w-full pl-9 pr-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Area (sqft) *</label>
                                <input
                                    required
                                    type="number"
                                    placeholder="1450"
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Bedrooms</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={10}
                                    placeholder="3"
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Bathrooms</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={10}
                                    placeholder="2"
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                        <h2 className="font-semibold">Description</h2>
                        <textarea
                            rows={5}
                            placeholder="Describe the property in detail — highlight key features, nearby amenities, and USPs..."
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none leading-relaxed"
                        />
                    </div>

                    {/* Images */}
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                        <h2 className="font-semibold">Photos</h2>
                        <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/50 transition-colors cursor-pointer group">
                            <Upload className="h-8 w-8 mx-auto text-foreground/30 group-hover:text-primary transition-colors mb-3" />
                            <p className="text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors">
                                Drag & drop photos here, or <span className="text-primary underline">browse</span>
                            </p>
                            <p className="text-xs text-foreground/40 mt-1">PNG, JPG up to 10MB each</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 justify-end pb-4">
                        <Link
                            href="/dashboard/properties"
                            className="px-5 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-card transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            id="add-property-save"
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105 disabled:opacity-60"
                        >
                            {loading ? (
                                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : null}
                            {loading ? "Saving..." : "Save Property"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
