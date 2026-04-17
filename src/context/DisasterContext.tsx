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
    // 1. Initial State Fetch
    const fetchInitialState = async () => {
      const { data, error } = await supabase
        .from("disaster_control")
        .select("is_disaster")
        .limit(1);

      if (data && data.length > 0) {
        setIsDisasterMode(data[0].is_disaster);
      } else {
        console.warn("Disaster mode fetch returned 0 rows. (Check Supabase RLS policies if row exists!)");
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
          if (payload.new && payload.new.id === 1) {
            setIsDisasterMode(payload.new.is_disaster);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <DisasterContext.Provider value={{ isDisasterMode }}>
      {children}
    </DisasterContext.Provider>
  );
};
