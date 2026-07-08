import { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "../Services/settingsService";
import { AuthContext } from "./AuthContext";

export const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data.settings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
