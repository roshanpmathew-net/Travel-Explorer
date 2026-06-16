import { useRef, useState, useEffect } from "react";
import Globe from "react-globe.gl";
import { MapPin, X, Navigation2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Destination = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  region: string;
  description: string;
  didYouKnow: string;
  color?: string;
};

const destinations: Destination[] = [
  {
    id: "paris",
    name: "Paris",
    lat: 48.8566,
    lng: 2.3522,
    region: "Europe",
    description:
      "The City of Light, known for its cafe culture and the Eiffel Tower.",
    didYouKnow:
      "There is only one single STOP sign in the entire city of Paris.",
    color: "#3b82f6",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    lat: 35.6762,
    lng: 139.6503,
    region: "Asia",
    description:
      "A bustling metropolis mixing the ultramodern and the traditional.",
    didYouKnow:
      "Shinjuku Station is the busiest railway station in the world, handling over 3.5 million passengers daily.",
    color: "#ef4444",
  },
  {
    id: "dubai",
    name: "Dubai",
    lat: 25.2048,
    lng: 55.2708,
    region: "Middle East",
    description:
      "Luxury shopping, modern architecture and a lively nightlife scene.",
    didYouKnow:
      "The Burj Khalifa is so tall that you can watch the sunset from the base, take the elevator to the top, and watch it set all over again.",
    color: "#f59e0b",
  },
  {
    id: "bali",
    name: "Bali",
    lat: -8.4095,
    lng: 115.1889,
    region: "Southeast Asia",
    description:
      "An Indonesian island known for its forested volcanic mountains and beaches.",
    didYouKnow:
      "Bali observes 'Nyepi', a Day of Silence where the entire island shuts down—including the airport and internet.",
    color: "#10b981",
  },
  {
    id: "nyc",
    name: "New York",
    lat: 40.7128,
    lng: -74.006,
    region: "North America",
    description:
      "The Big Apple, featuring the Statue of Liberty and Times Square.",
    didYouKnow:
      "Linguists estimate that as many as 800 languages are spoken in New York, making it the most linguistically diverse city in the world.",
    color: "#8b5cf6",
  },
  {
    id: "cpt",
    name: "Cape Town",
    lat: -33.9249,
    lng: 18.4241,
    region: "Africa",
    description: "A port city beneath the imposing Table Mountain.",
    didYouKnow:
      "Table Mountain is one of the oldest mountains in the world, estimated to be over 200 million years older than the Himalayas.",
    color: "#ec4899",
  },
  {
    id: "syd",
    name: "Sydney",
    lat: -33.8688,
    lng: 151.2093,
    region: "Australia",
    description: "Famed for its harbourfront Opera House.",
    didYouKnow:
      "The Sydney Opera House's roof is covered with exactly 1,056,006 glossy white and matte cream tiles.",
    color: "#06b6d4",
  },
  {
    id: "rio",
    name: "Rio de Janeiro",
    lat: -22.9068,
    lng: -43.1729,
    region: "South America",
    description: "Famous for its Copacabana and Ipanema beaches.",
    didYouKnow:
      "The famous Christ the Redeemer statue gets struck by lightning an average of three to six times a year.",
    color: "#14b8a6",
  },
];

export default function GlobePage() {
  const nav = useNavigate();
  const globeRef = useRef<any>(null);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [isDark, setIsDark] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();

    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;
  }, []);

  const handleClick = (point: object) => {
    const destination = point as Destination;
    setSelected(destination);

    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView(
        { lat: destination.lat, lng: destination.lng, altitude: 1.2 },
        1500,
      );
    }
  };

  const handlePointHover = (point: object | null) => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();

    if (point) {
      controls.autoRotate = false;
    } else {
      if (!selected) {
        controls.autoRotate = true;
      }
    }
  };

  const clearSelection = () => {
    setSelected(null);
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.pointOfView({ altitude: 2.5 }, 1500);
    }
  };

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * destinations.length);
    const randomDest = destinations[randomIndex];
    handleClick(randomDest);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="cursor-grab active:cursor-grabbing">
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={
            isDark
              ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
              : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          }
          showAtmosphere={true}
          atmosphereColor={isDark ? "#3b82f6" : "#60a5fa"}
          atmosphereAltitude={0.15}
          ringsData={destinations}
          ringLat="lat"
          ringLng="lng"
          ringColor={(d: any) => d.color || (isDark ? "#ffffff" : "#1e293b")}
          ringMaxRadius={3}
          ringPropagationSpeed={1.5}
          ringRepeatPeriod={800}
          htmlElementsData={destinations}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude={0.05}
          htmlElement={(d: any) => {
            const el = document.createElement("div");

            const defaultDotColor = isDark ? "#ffffff" : "#1e293b";
            const dotColor = d.color || defaultDotColor;
            const textColor = isDark ? "#ffffff" : "#000000";
            const dotShadow = isDark
              ? `0 0 10px ${dotColor}`
              : `0 2px 4px rgba(0, 0, 0, 0.4)`;
            const textOutline = isDark
              ? "0px 1px 3px rgba(0,0,0,0.8)"
              : "0px 1px 3px rgba(255,255,255,0.8)";

            el.style.color = textColor;
            el.style.width = "100px";
            el.style.textAlign = "center";
            el.style.cursor = "pointer";
            el.style.fontSize = "12px";
            el.style.fontWeight = "bold";
            el.style.pointerEvents = "auto";
            el.style.userSelect = "none";
            el.style.transform = "translate(-50%, -50%)";
            el.style.textShadow = textOutline;

            el.innerHTML = `
      <div style="
        width: 10px; 
        height: 10px; 
        background-color: ${dotColor}; 
        border-radius: 50%; 
        margin: 0 auto 4px auto;
        box-shadow: ${dotShadow};
      "></div>
      <div>${d.name}</div>
    `;

            el.onclick = (e) => {
              e.stopPropagation();
              handleClick(d);
            };

            el.onmouseenter = () => {
              if (handlePointHover) handlePointHover(d);
            };

            el.onmouseleave = () => {
              if (handlePointHover) handlePointHover(null);
            };

            return el;
          }}
        />
      </div>

      <div
        className={`absolute bottom-8 left-1/2 md:left-8 z-10 w-[90%] md:w-80 -translate-x-1/2 md:translate-x-0 transition-all duration-500 ease-out transform ${
          selected
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0 pointer-events-none"
        }`}
      >
        {selected && (
          <div className="relative rounded-2xl p-6 backdrop-blur-xl shadow-2xl bg-slate-950/80 dark:bg-blue-50/90 border border-slate-800 dark:border-blue-200/60 pointer-events-auto">
            <button
              onClick={clearSelection}
              className="absolute top-4 right-4 transition-colors cursor-pointer text-slate-400 hover:text-white dark:text-blue-400 dark:hover:text-blue-800"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800/60 dark:bg-blue-200/50 text-blue-400 dark:text-blue-600">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-tight text-white dark:text-slate-900">
                  {selected.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200 dark:text-blue-800">
                  {selected.region}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 dark:text-blue-900/80">
              {selected.description}
            </p>

            <button
              onClick={() => nav(`/destination/${selected.name}`)}
              className="mt-6 flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] bg-blue-600 dark:bg-blue-600 text-white"
            >
              <Navigation2 size={16} />
              Explore Destination
            </button>
          </div>
        )}
      </div>

      <div
        className={`absolute bottom-8 right-4 md:right-8 z-10 w-[90%] md:w-80 max-w-sm transition-all duration-500 ease-out transform pointer-events-none hidden md:block ${
          selected ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {selected && (
          <div className="relative rounded-2xl p-5 backdrop-blur-xl shadow-2xl bg-slate-950/80 dark:bg-blue-50/90 border border-slate-800 dark:border-blue-200/60">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 dark:bg-blue-200 dark:text-blue-700 text-sm">
                💡
              </span>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white dark:text-slate-900">
                Did you know?
              </h4>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-300 dark:text-blue-900/80 italic">
              {`"${selected.didYouKnow}"`}
            </p>
          </div>
        )}
      </div>

      <div className="absolute top-8 left-4 md:left-8 z-10 w-[90%] md:w-auto max-w-88 pointer-events-none">
        <div className="rounded-3xl bg-slate-950/80 dark:bg-blue-50/90 p-6 backdrop-blur-xl shadow-2xl border border-slate-800 dark:border-blue-200/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400"></div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200 dark:text-blue-800">
              Navigate & Explore
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tight text-white dark:text-slate-900">
            Popular <br />
            <span className="bg-gradient-to-br from-blue-400 to-indigo-300 dark:from-blue-600 dark:to-blue-400 bg-clip-text text-transparent">
              Destinations
            </span>
          </h1>

          <p className="mt-3 text-sm md:text-base font-medium text-slate-300 dark:text-blue-900/80">
            Through regions around the world.
          </p>
        </div>
      </div>

      <div className="absolute top-8 right-4 md:right-8 z-10 flex flex-col items-end gap-3 pointer-events-none">
        <div className="flex items-center gap-2.5 rounded-2xl bg-slate-950/80 dark:bg-blue-50/90 px-4 py-2.5 backdrop-blur-xl border border-slate-800 dark:border-blue-200/60 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium text-white dark:text-slate-900">
            1,420 exploring
          </span>
        </div>

        <button
          onClick={handleRandomize}
          className="pointer-events-auto flex cursor-pointer items-center gap-2 rounded-2xl bg-slate-950/80 dark:bg-blue-50/90 px-4 py-2.5 text-sm font-medium text-white dark:text-slate-900 backdrop-blur-xl border border-slate-800 dark:border-blue-200/60 shadow-sm transition-all hover:bg-slate-900 dark:hover:bg-white active:scale-[0.98]"
        >
          Teleport Me
        </button>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 rounded-full bg-white/70 dark:bg-slate-900/70 px-6 py-2 backdrop-blur-md shadow-sm pointer-events-none hidden md:block">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Rotate to explore • Click points to zoom
        </p>
      </div>
    </div>
  );
}
