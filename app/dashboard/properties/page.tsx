"use client";

import Link from "next/link";
import { Building2, Plus, Search, SlidersHorizontal, MapPin, Bed, Bath, IndianRupee } from "lucide-react";
import { useState } from "react";

const PROPERTIES = [
    {
        id: "1",
        title: "Luxury 3 BHK Apartment",
        location: "Baner, Pune",
        price: 8500000,
        beds: 3,
        baths: 2,
        area: 1450,
        type: "Apartment",
        status: "Available",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: "2",
        title: "Modern 2 BHK Flat",
        location: "Hinjewadi, Pune",
        price: 5500000,
        beds: 2,
        baths: 2,
        area: 960,
        type: "Apartment",
        status: "Available",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: "3",
        title: "Spacious Villa with Garden",
        location: "Koregaon Park, Pune",
        price: 25000000,
        beds: 5,
        baths: 4,
        area: 3800,
        type: "Villa",
        status: "Available",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: "4",
        title: "Budget Studio Apartment",
        location: "Wakad, Pune",
        price: 2800000,
        beds: 1,
        baths: 1,
        area: 480,
        type: "Studio",
        status: "Sold",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: "5",
        title: "Office Space 1500 sqft",
        location: "Viman Nagar, Pune",
        price: 12000000,
        beds: 0,
        baths: 2,
        area: 1500,
        type: "Commercial",
        status: "Available",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: "6",
        title: "Premium 4 BHK Penthouse",
        location: "Kalyani Nagar, Pune",
        price: 35000000,
        beds: 4,
        baths: 4,
        area: 4200,
        type: "Penthouse",
        status: "Available",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80",
    },
];

const formatPrice = (p: number) => {
    if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)} Cr`;
    if (p >= 100000) return `₹${(p / 100000).toFixed(2)} L`;
    return `₹${p.toLocaleString()}`;
};

export default function PropertiesPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const types = ["All", "Apartment", "Villa", "Studio", "Commercial", "Penthouse"];

    const filtered = PROPERTIES.filter((p) => {
        const matchSearch =
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.location.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "All" || p.type === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
                    <p className="text-foreground/60 text-sm mt-1">
                        Manage your property listings
                    </p>
                </div>
                <Link
                    href="/dashboard/properties/add"
                    id="add-property-btn"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105 w-fit"
                >
                    <Plus className="h-4 w-4" />
                    Add Property
                </Link>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                    <input
                        id="property-search"
                        type="text"
                        placeholder="Search by name or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto">
                    <SlidersHorizontal className="h-4 w-4 text-foreground/40 flex-shrink-0" />
                    {types.map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filter === t
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card border border-border text-foreground/70 hover:border-primary/50"
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((property) => (
                    <Link
                        key={property.id}
                        href={`/dashboard/properties/${property.id}`}
                        className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all group block"
                    >
                        {/* Image */}
                        <div className="relative h-44 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${property.status === "Available"
                                            ? "bg-accent text-accent-foreground"
                                            : "bg-red-500 text-white"
                                        }`}
                                >
                                    {property.status}
                                </span>
                            </div>
                            <div className="absolute top-3 right-3">
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                                    {property.type}
                                </span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                                {property.title}
                            </h3>
                            <p className="text-xs text-foreground/60 flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" /> {property.location}
                            </p>

                            <div className="flex items-center gap-3 mt-3 text-xs text-foreground/60">
                                {property.beds > 0 && (
                                    <span className="flex items-center gap-1">
                                        <Bed className="h-3.5 w-3.5" /> {property.beds}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <Bath className="h-3.5 w-3.5" /> {property.baths}
                                </span>
                                <span>{property.area} sqft</span>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                                <span className="font-bold text-primary flex items-center gap-0.5">
                                    <IndianRupee className="h-3.5 w-3.5" />
                                    {formatPrice(property.price).replace("₹", "")}
                                </span>
                                <span className="text-xs text-foreground/50 bg-border/60 px-2 py-1 rounded-lg">
                                    View Details →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-3 flex flex-col items-center justify-center py-20 text-foreground/40">
                        <Building2 className="h-12 w-12 mb-3 opacity-30" />
                        <p className="font-medium">No properties found</p>
                        <p className="text-sm">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
