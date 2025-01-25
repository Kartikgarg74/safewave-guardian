import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useToast } from "@/components/ui/use-toast";

// Replace this with your actual Mapbox token
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRxbXd3Z2gwMG5pMmltbGFpdDRqZzluIn0.a9qmZcRRxe5qmzOQwcnUqw";

export const SafeZoneMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const { toast } = useToast();

  // Get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Using default location.",
            variant: "destructive",
          });
        }
      );
    }
  }, [toast]);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!MAPBOX_TOKEN) {
      setMapError("Mapbox token is required");
      toast({
        title: "Map Error",
        description: "Please configure your Mapbox token to view the map",
        variant: "destructive",
      });
      return;
    }

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      if (!map.current) {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: userLocation || [-74.5, 40], // Use user location if available, otherwise default
          zoom: 13,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
        
        // Add geolocate control
        map.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
          }),
          "top-right"
        );

        // Add user marker if location is available
        if (userLocation) {
          new mapboxgl.Marker()
            .setLngLat(userLocation)
            .addTo(map.current);
        }
      }

      // Update map center when user location changes
      if (map.current && userLocation) {
        map.current.flyTo({
          center: userLocation,
          zoom: 13,
          essential: true
        });
      }
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Failed to load map");
      toast({
        title: "Map Error",
        description: "There was an error loading the map",
        variant: "destructive",
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [toast, userLocation]);

  if (mapError) {
    return (
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">{mapError}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};