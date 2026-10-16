// src/hooks/usePackages.js
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function usePackages() {
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [travelType, setTravelType] = useState("All");
  const [durationFilter, setDurationFilter] = useState("Any Duration");
  const [budgetFilter, setBudgetFilter] = useState("Any Budget");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");

  useEffect(() => {
    const fetchPackagesFromAPI = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");

        const packagePresets = [
          {
            name: "Japan Explorer",
            destination: "Japan",
            type: "International",
            price: 100000,
            duration: "8 Days / 7 Nights",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
            description: "Immerse yourself in Japan's vibrant blend of futuristic modern cities and ancient traditions. Experience high-speed bullet trains, tranquil bamboo groves, and world-class culinary hotspots.",
            itinerary: [
              "Day 1-2: Arrival in Tokyo, Shibuya Crossing & Senso-ji Temple Tour",
              "Day 3-4: Mt. Fuji Day Trip & Onsen Hot Springs Relaxation",
              "Day 5-6: Bullet Train to Kyoto, Fushimi Inari Shrine & Arashiyama Bamboo Grove",
              "Day 7-8: Osaka Food Tour & Departure"
            ],
            inclusions: ["4-Star Hotel Accommodation", "Daily Buffet Breakfast", "Bullet Train (Shinkansen) Pass", "English-Speaking Tour Guide"]
          },
          {
            name: "Dubai Luxury Escape",
            destination: "Dubai",
            type: "International",
            price: 65000,
            duration: "6 Days / 5 Nights",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
            description: "Experience ultimate luxury in the heart of the Middle East. From iconic skyscrapers to thrilling desert adventures and luxury yacht cruises.",
            itinerary: [
              "Day 1: Arrival & Marina Sunset Dinner Cruise",
              "Day 2: Dubai City Tour & Burj Khalifa At The Top (124th Floor)",
              "Day 3: VIP Desert Safari with BBQ Dinner & Dune Bashing",
              "Day 4-5: Abu Dhabi Day Trip (Grand Mosque & Louvre) & Shopping Mall Excursion",
              "Day 6: Leisure Morning & Airport Transfer"
            ],
            inclusions: ["5-Star Luxury Resort Stay", "Desert Safari Entry", "Airport Private Transfers", "Burj Khalifa Entry Tickets"]
          },
          {
            name: "Kashmir Paradise",
            destination: "Kashmir",
            type: "India",
            price: 45000,
            duration: "6 Days / 5 Nights",
            image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=900&q=80",
            description: "Discover 'Paradise on Earth' with breathtaking snow-capped peaks, serene Shikara boat rides on Dal Lake, and lush meadows of Gulmarg.",
            itinerary: [
              "Day 1: Arrival in Srinagar & Houseboat Check-in with Shikara Ride",
              "Day 2: Srinagar to Sonamarg Day Excursion",
              "Day 3: Srinagar to Gulmarg & Gondola Cable Car Ride",
              "Day 4-5: Pahalgam Valley Excursion & Betaab Valley Sightseeing",
              "Day 6: Shopping at Lal Chowk & Departure"
            ],
            inclusions: ["Luxury Houseboat Stay", "Gondola Cable Car Tickets", "Daily Breakfast & Dinner", "Private Cab for Transfers"]
          },
          {
            name: "Singapore Discovery",
            destination: "Singapore",
            type: "International",
            price: 55000,
            duration: "4 Days / 3 Nights",
            image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
            description: "Explore the Garden City! A perfect getaway featuring futuristic architecture, botanical gardens, and world-renowned theme parks.",
            itinerary: [
              "Day 1: Arrival, Hotel Check-in & Night Safari Excursion",
              "Day 2: Full Day Sentosa Island Tour & Universal Studios",
              "Day 3: Gardens by the Bay, Flower Dome & Marina Bay Sands SkyPark",
              "Day 4: Jewel Changi Airport Tour & Departure"
            ],
            inclusions: ["Universal Studios Express Pass", "Sentosa Cable Car Ride", "4-Star Hotel Stay", "Daily Breakfast"]
          },
          {
            name: "Jaipur Heritage Escape",
            destination: "Jaipur",
            type: "India",
            price: 30000,
            duration: "3 Days / 2 Nights",
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
            description: "Step into royal history with grand palaces, historic hill forts, vibrant bazaars, and authentic Rajasthani cuisine.",
            itinerary: [
              "Day 1: Arrival in Pink City, Hawa Mahal & City Palace Sightseeing",
              "Day 2: Amer Fort Elephant Ride, Jal Mahal & Chokhi Dhani Cultural Dinner",
              "Day 3: Nahargarh Fort Sunset View & Departure"
            ],
            inclusions: ["Heritage Haveli Hotel Stay", "Chokhi Dhani Cultural Night Dinner", "Private AC Car", "Local Sightseeing Guide"]
          },
          {
            name: "Sikkim Mountain Retreat",
            destination: "Sikkim",
            type: "India",
            price: 35000,
            duration: "5 Days / 4 Nights",
            image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
            description: "Escape to the tranquil Eastern Himalayas with pristine high-altitude lakes, ancient Buddhist monasteries, and mountain views.",
            itinerary: [
              "Day 1: Arrival at Bagdogra/NJP & Scenic Drive to Gangtok",
              "Day 2: Tsomgo Lake & Baba Mandir Excursion",
              "Day 3: Gangtok Monasteries & Cable Car Ride to Pelling",
              "Day 4: Pelling Skywalk & Pemayangtse Monastery",
              "Day 5: Drive back to Bagdogra for Departure"
            ],
            inclusions: ["Mountain View Hotel Stay", "Protected Area Travel Permits", "All Meals Included", "Dedicated SUV Vehicle"]
          },
          {
            name: "Paris City Explorer",
            destination: "Paris",
            type: "International",
            price: 95000,
            duration: "6 Days / 5 Nights",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
            description: "Discover the City of Light with iconic art museums, Seine River cruises, world-class pastries, and historic landmarks.",
            itinerary: [
              "Day 1: Arrival in Paris & Hotel Check-in",
              "Day 2: Eiffel Tower Priority Access & Louvre Museum Guided Tour",
              "Day 3: Palace of Versailles Day Trip",
              "Day 4: Montmartre Walking Tour & Seine River Dinner Cruise",
              "Day 5-6: Champs-Élysées Shopping & Departure"
            ],
            inclusions: ["Boutique Hotel Stay", "Eiffel Tower & Louvre Entry Tickets", "Seine River Cruise Pass", "Daily Breakfast"]
          },
          {
            name: "Bali Tropical Dream",
            destination: "Bali",
            type: "International",
            price: 48000,
            duration: "5 Days / 4 Nights",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
            description: "Unwind on tropical beaches, lush rice terraces, waterfall hikes, and serene oceanfront spa retreats.",
            itinerary: [
              "Day 1: Arrival in Bali & Transfer to Ubud Resort",
              "Day 2: Tegallalang Rice Terrace, Bali Swing & Monkey Forest",
              "Day 3: Lempuyang Temple (Gates of Heaven) & Tirta Gangga Water Palace",
              "Day 4: Nusa Penida Island Speedboat Day Tour",
              "Day 5: Tanah Lot Temple Sunset & Departure"
            ],
            inclusions: ["Private Pool Villa Stay", "Nusa Penida Speedboat Tickets", "Balinese Massage Session", "Daily Breakfast"]
          },
          {
            name: "Swiss Alps Adventure",
            destination: "Swiss Alps",
            type: "International",
            price: 110000,
            duration: "7 Days / 6 Nights",
            image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
            description: "Journey through majestic alpine mountain passes, scenic train rides, crystal-clear glacier lakes, and Swiss chalets.",
            itinerary: [
              "Day 1: Arrival in Zurich & Transfer to Interlaken",
              "Day 2: Jungfraujoch - Top of Europe Cogwheel Train Ride",
              "Day 3: Grindelwald First Cliff Walk & Cable Car Ride",
              "Day 4-5: GoldenPass Express Train to Zermatt & Matterhorn View",
              "Day 6-7: Lucerne Lake Cruise & Departure"
            ],
            inclusions: ["Swiss Travel Pass (Unlimited Trains & Buses)", "Jungfraujoch Mountain Excursion Ticket", "Alpine Hotel Stay", "Daily Breakfast"]
          }
        ];

        const formattedData = response.data.slice(0, packagePresets.length).map((item, index) => {
          const preset = packagePresets[index % packagePresets.length];
          const slugId = preset.destination.toLowerCase().replace(/[^a-z0-9]/g, "-");

          return {
            id: slugId,
            name: preset.name,
            destination: preset.destination,
            type: preset.type,
            duration: preset.duration,
            price: preset.price,
            rating: (4.5 + (index % 4) * 0.1).toFixed(1),
            highlights: ["Guided Excursion", "Sightseeing Tours", "Resort Stay"],
            image: preset.image,
            description: preset.description,
            itinerary: preset.itinerary,
            inclusions: preset.inclusions
          };
        });

        setAllPackages(formattedData);
      } catch (err) {
        setError("Failed to fetch travel packages.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackagesFromAPI();
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
      const typeMatch = travelType === "All" || pkg.type === travelType;
      const durationMatch =
        durationFilter === "Any Duration" ||
        (durationFilter === "1 - 3 Days" && days <= 3) ||
        (durationFilter === "4 - 7 Days" && days >= 4 && days <= 7) ||
        (durationFilter === "8+ Days" && days >= 8);
      const budgetMatch =
        budgetFilter === "Any Budget" ||
        (budgetFilter === "Below ₹50,000" && pkg.price < 50000) ||
        (budgetFilter === "₹50,000 - ₹1,00,000" && pkg.price >= 50000 && pkg.price <= 100000) ||
        (budgetFilter === "Above ₹1,00,000" && pkg.price > 100000);
      const ratingMatch =
        ratingFilter === "All Ratings" ||
        parseFloat(pkg.rating) >= parseFloat(ratingFilter);

      return searchMatch && typeMatch && durationMatch && budgetMatch && ratingMatch;
    });
  }, [allPackages, search, travelType, durationFilter, budgetFilter, ratingFilter]);

  return {
    allPackages,
    filteredPackages,
    loading,
    error,
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