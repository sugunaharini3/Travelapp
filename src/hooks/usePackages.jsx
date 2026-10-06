import { useEffect, useMemo, useState } from "react";
function usePackages() {
  const allPackages = [
    {
      id: 1,
      name: "Japan Explorer",
      destination: "Japan",
      type: "International",
      duration: "8 Days / 7 Nights",
      price: 100000,
      internationalPrice: 1043,
      rating: 4.8,
      highlights: ["Tokyo", "Mount Fuji", "Kyoto"],
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 2,
      name: "Dubai Luxury Escape",
      destination: "Dubai",
      type: "International",
      duration: "6 Days / 5 Nights",
      price: 65000,
      internationalPrice: 765,
      rating: 4.6,
      highlights: ["Burj Khalifa", "Desert Safari", "Marina"],
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 3,
      name: "Kashmir Paradise",
      destination: "Kashmir",
      type: "India",
      duration: "6 Days / 5 Nights",
      price: 45000,
      internationalPrice: 530,
      rating: 4.7,
      highlights: ["Gulmarg", "Dal Lake", "Pahalgam"],
      image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 4,
      name: "Singapore Discovery",
      destination: "Singapore",
      type: "International",
      duration: "4 Days / 3 Nights",
      price: 55000,
      internationalPrice: 645,
      rating: 4.5,
      highlights: ["Marina Bay", "Sentosa", "Gardens"],
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 5,
      name: "Jaipur Heritage Escape",
      destination: "Jaipur",
      type: "India",
      duration: "3 Days / 2 Nights",
      price: 30000,
      internationalPrice: 350,
      rating: 4.6,
      highlights: ["Amber Fort", "Hawa Mahal", "City Palace"],
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 6,
      name: "Sikkim Mountain Retreat",
      destination: "Sikkim",
      type: "India",
      duration: "5 Days / 4 Nights",
      price: 35000,
      internationalPrice: 410,
      rating: 4.5,
      highlights: ["Gangtok", "Tsomgo Lake", "Nathula Pass"],
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80"
    }
  ];
  const [search, setSearch] = useState("");
  const [travelType, setTravelType] = useState("All");
  const [durationFilter, setDurationFilter] = useState("Any Duration");
  const [budgetFilter, setBudgetFilter] = useState("Any Budget");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");
  useEffect(() => {
    console.log("Travel packages loaded");
  }, []);

  const filteredPackages = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return allPackages.filter((pkg) => {
      const days = parseInt(pkg.duration);

      const searchMatch =
        searchText === "" ||
        pkg.name.toLowerCase().includes(searchText) ||
        pkg.destination.toLowerCase().includes(searchText) ||
        pkg.type.toLowerCase().includes(searchText);

      const typeMatch =
        travelType === "All" ||
        pkg.type === travelType;

      const durationMatch =
        durationFilter === "Any Duration" ||
        (durationFilter === "1 - 3 Days" && days <= 3) ||
        (durationFilter === "4 - 7 Days" && days >= 4 && days <= 7) ||
        (durationFilter === "8+ Days" && days >= 8);

      const budgetMatch =
        budgetFilter === "Any Budget" ||
        (budgetFilter === "Below ₹50,000" && pkg.price < 50000) ||
        (budgetFilter === "₹50,000 - ₹1,00,000" &&
          pkg.price >= 50000 &&
          pkg.price <= 100000) ||
        (budgetFilter === "Above ₹1,00,000" && pkg.price > 100000);

      const ratingMatch =
        ratingFilter === "All Ratings" ||
        pkg.rating >= Number(ratingFilter);

      return (
        searchMatch &&
        typeMatch &&
        durationMatch &&
        budgetMatch &&
        ratingMatch
      );
    });
  }, [
    search,
    travelType,
    durationFilter,
    budgetFilter,
    ratingFilter
  ]);

  return {
    allPackages,
    filteredPackages,
    search,
    setSearch,
    travelType,
    setTravelType,
    durationFilter,
    setDurationFilter,
    budgetFilter,
    setBudgetFilter,
    ratingFilter,
    setRatingFilter
  };
}
export default usePackages;