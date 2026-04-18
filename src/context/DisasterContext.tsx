import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

interface DisasterContextType {
  isDisasterMode: boolean;
}

const DisasterContext = createContext<DisasterContextType>({ isDisasterMode: false });

export const useDisaster = () => useContext(DisasterContext);

export const DisasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDisasterMode, setIsDisasterMode] = useState(false);

  useEffect(() => {
    let mounted = true;

    // 1. Initial State Fetch
    const fetchInitialState = async () => {
      const { data, error } = await supabase
        .from("disaster_control")
        .select("is_disaster")
        .eq("id", 1)
        .limit(1);

      if (mounted && data && data.length > 0) {
        setIsDisasterMode(data[0].is_disaster);
        console.log("Disaster Initial State Loaded:", data[0].is_disaster);
      } else if (mounted) {
        console.warn("Disaster mode fetch returned 0 rows for ID=1. (Check Supabase RLS policies if row exists!)");
      }
      if (error) console.error("Error fetching disaster mode:", error);
    };

    fetchInitialState();

    // 2. Realtime Subscription
    const channel = supabase
      .channel("disaster_mode_tracker")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "disaster_control" },
        (payload: any) => {
          console.log("Supabase Realtime Payload Received:", payload);
          if (payload.new && payload.new.id == 1) {
            setIsDisasterMode(payload.new.is_disaster);
          }
        }
      )
      .subscribe((status) => {
        console.log("Supabase Subscription Status Update:", status);
      });

    return () => {
      mounted = false;
      console.log("Cleaning up Supabase Websocket Channel...");
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <DisasterContext.Provider value={{ isDisasterMode }}>
      {children}
    </DisasterContext.Provider>
  );
};
