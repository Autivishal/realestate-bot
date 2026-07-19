export interface Property {
    id: string;
    title: string;
    description: string;

    // Transaction
    transactionType: "Sell" | "Rent";
    expectedPrice?: number;
    negotiable?: boolean;
    monthlyRent?: number;
    securityDeposit?: number;
    availableFrom?: string;

    category: "Residential" | "Commercial" | "Land";
    type: string; // Apartment, Villa, Office, etc.

    // Address
    city: string;
    locality: string;
    fullAddress: string;

    // Images
    image: string; // Cover
    images?: string[];

    // General Attributes
    builtUpArea?: number;
    plotArea?: number;
    furnishing?: string;
    parking?: boolean | string;
    status: string;

    // Residential Specific
    beds?: number;
    baths?: number;
    propertyAge?: string;
    readyToMove?: boolean;
    floorNumber?: string;
    totalFloors?: string;
    garden?: boolean;

    // Commercial Specific
    washrooms?: number;

    // Plot Specific
    plotWidth?: number;
    plotLength?: number;
    cornerPlot?: boolean;

    // Amenities
    amenities: string[];
    otherAmenities?: string[];
}

const DEFAULT_PROPERTIES: Property[] = [
    {
        id: "1",
        title: "Luxury 3 BHK Apartment",
        description: "A well-designed 3 BHK apartment in the prime Baner locality with excellent ventilation.",
        transactionType: "Sell",
        expectedPrice: 8500000,
        negotiable: true,
        category: "Residential",
        type: "Apartment / Flat",
        city: "Pune",
        locality: "Baner",
        fullAddress: "101, Balewadi High Street, Baner, Pune",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&auto=format&fit=crop&q=80",
        images: [],
        builtUpArea: 1450,
        furnishing: "Semi-Furnished",
        parking: true,
        status: "Published",
        beds: 3,
        baths: 2,
        propertyAge: "New",
        readyToMove: true,
        floorNumber: "5",
        totalFloors: "12",
        amenities: ["Swimming Pool", "Gym", "Security", "Parking"],
    },
    {
        id: "2",
        title: "Modern 2 BHK Flat",
        description: "Affordable and modern 2 BHK flat in Hinjewadi, perfect for IT professionals.",
        transactionType: "Rent",
        monthlyRent: 35000,
        securityDeposit: 100000,
        availableFrom: "2026-08-01",
        category: "Residential",
        type: "Apartment / Flat",
        city: "Pune",
        locality: "Hinjewadi",
        fullAddress: "Phase 1, Hinjewadi IT Park, Pune",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop&q=80",
        images: [],
        builtUpArea: 960,
        furnishing: "Unfurnished",
        parking: true,
        status: "Published",
        beds: 2,
        baths: 2,
        readyToMove: true,
        floorNumber: "3",
        totalFloors: "8",
        amenities: ["Gym", "Security", "Parking"],
    }
];

export const getProperties = (): Property[] => {
    if (typeof window === "undefined") return DEFAULT_PROPERTIES;
    const stored = localStorage.getItem("propbot_properties");
    if (!stored) {
        localStorage.setItem("propbot_properties", JSON.stringify(DEFAULT_PROPERTIES));
        return DEFAULT_PROPERTIES;
    }
    try {
        return JSON.parse(stored);
    } catch (e) {
        return DEFAULT_PROPERTIES;
    }
};

export const addProperty = (prop: Omit<Property, "id">): void => {
    if (typeof window === "undefined") return;
    const current = getProperties();
    const newProp: Property = {
        ...prop,
        id: Date.now().toString(),
    };
    localStorage.setItem("propbot_properties", JSON.stringify([newProp, ...current]));
};

export const getPropertyById = (id: string): Property | undefined => {
    const all = getProperties();
    return all.find(p => p.id === id);
};
