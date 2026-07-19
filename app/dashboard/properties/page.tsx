"use client";

import Link from "next/link";
import { Building2, Plus, Search, SlidersHorizontal, MapPin, Bed, Bath, IndianRupee } from "lucide-react";
import { useState, useEffect } from "react";
import { getProperties, Property } from "@/lib/properties";

const formatPrice = (p: number | undefined, t: string) => {
    if (!p) return "Price on Request";
    let base = "";
    if (p >= 10000000) base = `₹${(p / 10000000).toFixed(2)} Cr`;
    else if (p >= 100000) base = `₹${(p / 100000).toFixed(2)} L`;
    else base = `₹${p.toLocaleString()}`;

    return t === "Rent" ? `${base} / mo` : base;
};

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        setProperties(getProperties());
    }, []);

    const types = ["All", "Apartment", "Villa", "Bungalow", "Studio", "Commercial", "Penthouse", "Plot", "Land"];

    const filtered = properties.filter((p) => {
        const matchSearch =
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.locality.toLowerCase().includes(search.toLowerCase()) ||
            p.city.toLowerCase().includes(search.toLowerCase());
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
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
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
                            <div className="absolute top-3 right-3 flex gap-1">
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
                                    {property.transactionType}
                                </span>
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
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
                                <MapPin className="h-3 w-3" /> {property.locality}, {property.city}
                            </p>

                            <div className="flex items-center gap-3 mt-3 text-xs text-foreground/60">
                                {property.beds ? (
                                    <span className="flex items-center gap-1">
                                        <Bed className="h-3.5 w-3.5" /> {property.beds}
                                    </span>
                                ) : null}
                                {property.baths ? (
                                    <span className="flex items-center gap-1">
                                        <Bath className="h-3.5 w-3.5" /> {property.baths}
                                    </span>
                                ) : null}
                                {(property.builtUpArea || property.plotArea) ? (
                                    <span>{property.builtUpArea || property.plotArea} sqft</span>
                                ) : null}
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                                <span className="font-bold text-primary flex items-center gap-0.5">
                                    <IndianRupee className="h-3.5 w-3.5 -mr-1" />
                                    {formatPrice(property.transactionType === "Sell" ? property.expectedPrice : property.monthlyRent, property.transactionType).replace("₹", "")}
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
