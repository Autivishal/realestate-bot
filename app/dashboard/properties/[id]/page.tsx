"use client";

import { ArrowLeft, MapPin, Bed, Bath, IndianRupee, ChevronRight, Phone, MessageSquare, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPropertyById, Property } from "@/lib/properties";

const formatPrice = (p: number, t: string) => {
    let base = "";
    if (p >= 10000000) base = `₹${(p / 10000000).toFixed(2)} Crore`;
    else if (p >= 100000) base = `₹${(p / 100000).toFixed(2)} Lakh`;
    else base = `₹${p.toLocaleString()}`;
    return t === "Rent" ? `${base} / mo` : base;
};

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
    const [property, setProperty] = useState<Property | null | undefined>(undefined);

    useEffect(() => {
        setProperty(getPropertyById(params.id) || null);
    }, [params.id]);

    if (property === undefined) {
        return <div className="p-8 text-center text-foreground/50">Loading property...</div>;
    }

    if (property === null) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-2">Property Not Found</h1>
                <Link href="/dashboard/properties" className="text-primary hover:underline">
                    Back to Properties
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Back */}
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Link href="/dashboard/properties" className="hover:text-foreground transition-colors flex items-center gap-1">
                        <ArrowLeft className="h-4 w-4" /> Properties
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground font-medium">{property.title}</span>
                </div>

                {/* Hero image */}
                <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&auto=format&fit=crop&q=80";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">{property.title}</h1>
                            <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
                                <MapPin className="h-3.5 w-3.5" /> {property.location}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-black/60 text-white backdrop-blur-md">
                                {property.transactionType}
                            </span>
                            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${property.status === "Available" ? "bg-accent text-accent-foreground" : "bg-red-500 text-white"}`}>
                                {property.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Details */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            {property.beds > 0 && (
                                <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                                    <Bed className="h-5 w-5 mx-auto text-primary mb-1.5" />
                                    <p className="font-bold">{property.beds}</p>
                                    <p className="text-xs text-foreground/50">Bedrooms</p>
                                </div>
                            )}
                            {property.baths > 0 && (
                                <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                                    <Bath className="h-5 w-5 mx-auto text-primary mb-1.5" />
                                    <p className="font-bold">{property.baths}</p>
                                    <p className="text-xs text-foreground/50">Bathrooms</p>
                                </div>
                            )}
                            <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                                <IndianRupee className="h-5 w-5 mx-auto text-primary mb-1.5" />
                                <p className="font-bold text-sm truncate px-1">{formatPrice(property.price, property.transactionType)}</p>
                                <p className="text-xs text-foreground/50">Price</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                            <h2 className="font-semibold mb-3">About this property</h2>
                            <p className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">{property.description}</p>
                        </div>

                        {/* Specs */}
                        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                            <h2 className="font-semibold mb-4">Property Details</h2>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                                {[
                                    { label: "Type", value: property.type },
                                    { label: "Transaction", value: property.transactionType },
                                    { label: "Area", value: `${property.area} sqft` },
                                    { label: "Furnishing", value: property.furnishing },
                                    { label: "Status", value: property.status },
                                ].map((d) => (
                                    <div key={d.label} className="flex justify-between border-b border-border pb-2">
                                        <span className="text-foreground/50">{d.label}</span>
                                        <span className="font-medium">{d.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        {property.amenities.length > 0 && (
                            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                                <h2 className="font-semibold mb-3">Amenities</h2>
                                <div className="flex flex-wrap gap-2">
                                    {property.amenities.map((a) => (
                                        <span key={a} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                                            {a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Sidebar */}
                    <div className="space-y-4">
                        <div className="bg-card border border-border rounded-2xl p-5 space-y-4 sticky top-6 shadow-sm">
                            <div>
                                <p className="text-xs text-foreground/50">Listed price</p>
                                <p className="text-2xl font-extrabold text-primary mt-0.5 whitespace-nowrap">
                                    {formatPrice(property.price, property.transactionType)}
                                </p>
                            </div>

                            <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-[1.02]">
                                <Phone className="h-4 w-4" />
                                Schedule Viewing
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 bg-accent/10 text-accent border border-accent/20 py-3 rounded-xl font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                                <MessageSquare className="h-4 w-4" />
                                Chat on WhatsApp
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 bg-background border border-border py-2.5 rounded-xl text-sm text-foreground/70 hover:bg-card transition-colors">
                                <Share2 className="h-4 w-4" />
                                Share Listing
                            </button>

                            <div className="pt-3 border-t border-border">
                                <p className="text-xs text-foreground/50 mb-2">Listed by</p>
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-sm font-bold text-primary">
                                        VA
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Vishal Auti</p>
                                        <p className="text-xs text-foreground/50">Sunrise Realty</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
