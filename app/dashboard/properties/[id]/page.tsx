"use client";

import {
    ArrowLeft,
    MapPin,
    BedDouble,
    Bath,
    IndianRupee,
    Share2,
    Heart,
    Phone,
    MessageSquare,
    Building2,
    Calendar,
    CheckCircle2,
    Map,
    Car,
    Wind,
    Maximize,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPropertyById, Property } from "@/lib/properties";

const formatPrice = (p: number | undefined) => {
    if (!p) return "Price on Request";
    if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)} Cr`;
    if (p >= 100000) return `₹${(p / 100000).toFixed(2)} L`;
    return `₹${p.toLocaleString()}`;
};

export default function PropertyDetailPage() {
    const params = useParams();
    const id = params?.id as string;

    const [property, setProperty] = useState<Property | null | undefined>(undefined);
    const [activeImage, setActiveImage] = useState<string>("");

    useEffect(() => {
        if (!id) return;
        const prop = getPropertyById(id) || null;
        setProperty(prop);
        if (prop) setActiveImage(prop.image);
    }, [id]);

    if (property === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-foreground/50 font-medium animate-pulse">Loading property details...</p>
                </div>
            </div>
        );
    }

    if (property === null) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-2">
                    <Building2 className="h-8 w-8 text-foreground/30" />
                </div>
                <h1 className="text-2xl font-bold">Property Not Found</h1>
                <p className="text-foreground/50 max-w-sm">The property you are looking for has been removed or does not exist.</p>
                <Link href="/dashboard/properties" className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-transform active:scale-95">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    // Generate a mock gallery array since we only have 1 image reliably
    const gallery = [
        property.image,
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=800&q=80"
    ];

    const priceToDisplay = property.transactionType === "Sell" ? property.expectedPrice : property.monthlyRent;
    const isRent = property.transactionType === "Rent";

    return (
        <div className="pb-24 lg:pb-12 bg-background">
            {/* ── Top Navigation Bar ── */}
            <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/dashboard/properties" className="flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors group">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </div>
                        Back to Hub
                    </Link>

                    <div className="flex items-center gap-2">
                        <button className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-foreground/10 transition-colors">
                            <Share2 className="h-4 w-4 text-foreground/70" />
                        </button>
                        <button className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-colors group">
                            <Heart className="h-4 w-4 text-foreground/70 group-hover:text-red-500 transition-colors" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

                {/* ── Header Title Area ── */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md ${property.transactionType === 'Sell' ? 'bg-blue-500/15 text-blue-500' : 'bg-orange-500/15 text-orange-500'
                                }`}>
                                For {property.transactionType}
                            </span>
                            <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md bg-foreground/10 text-foreground/70">
                                {property.type}
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
                            {property.title}
                        </h1>
                        <p className="text-foreground/60 flex items-center gap-1.5 text-sm sm:text-base font-medium">
                            <MapPin className="h-4 w-4 text-primary" /> {property.fullAddress}
                        </p>
                    </div>

                    <div className="lg:text-right flex flex-col items-end">
                        <p className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-1">
                            Asking Price
                        </p>
                        <p className="text-4xl sm:text-5xl font-extrabold text-primary flex items-center tracking-tight">
                            {formatPrice(priceToDisplay)}
                            {isRent && <span className="text-lg text-foreground/40 font-medium ml-1">/mo</span>}
                        </p>
                    </div>
                </div>

                {/* ── Stunning Image Gallery ── */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-10 h-[300px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden group">
                    {/* Main Hero Image */}
                    <div className="lg:col-span-3 pb-2 lg:pb-0 h-full relative cursor-pointer overflow-hidden">
                        <img
                            src={activeImage}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <button className="absolute bottom-4 left-4 bg-background/50 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-background/80 transition-colors">
                            <Maximize className="h-4 w-4" /> View Fullscreen
                        </button>
                    </div>

                    {/* Side Thumbnail Strip */}
                    <div className="hidden lg:flex flex-col gap-2 h-full">
                        {gallery.slice(1).map((img, i) => (
                            <div
                                key={i}
                                className="flex-1 relative cursor-pointer overflow-hidden group/thumb"
                                onClick={() => setActiveImage(img)}
                            >
                                <img
                                    src={img}
                                    alt="Thumbnail"
                                    className={`w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110 ${activeImage === img ? 'brightness-100' : 'brightness-75'}`}
                                />
                                {i === 2 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm tracking-wide">
                                        +12 photos
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Main Content Grid ── */}
                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Left Column (Details) */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Quick Stats Banner */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-6 bg-card border border-border p-4 sm:p-6 rounded-3xl shadow-sm">
                            {property.beds > 0 && (
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <BedDouble className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold leading-none">{property.beds}</p>
                                        <p className="text-xs font-medium text-foreground/50 mt-1">Beds</p>
                                    </div>
                                </div>
                            )}
                            {property.baths > 0 && (
                                <div className="flex items-center gap-3 border-l border-border pl-2 sm:pl-6">
                                    <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                        <Bath className="h-6 w-6 text-cyan-500" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold leading-none">{property.baths}</p>
                                        <p className="text-xs font-medium text-foreground/50 mt-1">Baths</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3 border-l border-border pl-2 sm:pl-6">
                                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <Maximize className="h-6 w-6 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold leading-none">{property.builtUpArea || property.plotArea || 0}</p>
                                    <p className="text-xs font-medium text-foreground/50 mt-1">Sq Ft</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                            <h2 className="text-xl font-bold mb-4">About this property</h2>
                            <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                                {property.description}
                            </p>
                        </div>

                        <hr className="border-border" />

                        {/* Specs Grid */}
                        <div>
                            <h2 className="text-xl font-bold mb-6">Property Overview</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                                {[
                                    { label: "Status", value: property.status, icon: CheckCircle2 },
                                    { label: "Furnishing", value: property.furnishing, icon: Wind },
                                    { label: "Parking", value: property.parking ? "Available" : "No", icon: Car },
                                    { label: "Ready to Move", value: property.readyToMove ? "Yes" : "No", icon: Calendar },
                                    { label: "Plot Dimensions", value: property.plotLength ? `${property.plotLength} x ${property.plotWidth} ft` : null, icon: Map },
                                    { label: "Floor", value: property.floorNumber ? `${property.floorNumber} / ${property.totalFloors}` : null, icon: Building2 },
                                    { label: "Washrooms", value: property.washrooms, icon: Bath },
                                ].filter(x => x.value).map((stat, i) => (
                                    <div key={i} className="flex flex-col">
                                        <span className="flex items-center gap-1.5 text-sm text-foreground/50 mb-1">
                                            <stat.icon className="h-3.5 w-3.5" />
                                            {stat.label}
                                        </span>
                                        <span className="font-semibold">{stat.value}</span>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <hr className="border-border" />

                        {/* Amenities Section */}
                        {property.amenities.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold mb-6">Amenities & Features</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {property.amenities.map(am => (
                                        <div key={am} className="flex items-center gap-3 bg-card border border-border px-4 py-3 rounded-xl shadow-sm">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <span className="text-sm font-medium">{am}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column (Action Sidebar) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-card border border-border shadow-xl rounded-3xl p-6 overflow-hidden relative">
                            {/* Decorative top blur */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                            <h3 className="text-lg font-bold mb-1 relative z-10">Interested in this property?</h3>
                            <p className="text-sm text-foreground/60 mb-6 relative z-10">Our AI agent is online and ready to answer any questions or book a viewing.</p>

                            <div className="space-y-3 relative z-10">
                                <button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0">
                                    <MessageSquare className="h-5 w-5" />
                                    Chat on WhatsApp
                                </button>
                                <button className="w-full h-14 bg-background border-2 border-primary text-primary font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                                    <Calendar className="h-5 w-5" />
                                    Schedule Viewing
                                </button>
                                <button className="w-full h-12 text-foreground/70 font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                                    <Phone className="h-4 w-4" />
                                    Request Callback
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border relative z-10">
                                <p className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-4">Listed By Agent</p>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 flex-shrink-0">
                                        <div className="h-full w-full rounded-full bg-card border-2 border-background flex items-center justify-center text-foreground font-bold">
                                            VA
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">Vishal Auti</p>
                                        <p className="text-xs text-foreground/60">Sunrise Realty Group</p>
                                    </div>
                                </div>
                                <Link href="/dashboard/leads" className="mt-4 flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                                    View all listings by agent <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
