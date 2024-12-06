// hooks/settingsData.ts
"use client";
import { useState, useEffect } from 'react';
import { getSettings } from "@/sanity/sanity.query";
import type { SettingsType } from '../types';

export const FetchSettingsData = () => {
  const [settingsData, setSettings] = useState<SettingsType | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        console.log('Fetched Settings Data =>>>> ',data)
        setSettings(data);
      } catch (err) {
        console.log('Fetched Settings Data =>>>> ',err)
      } 
    };

    fetchSettings();
  }, []);

  return { settingsData};
};