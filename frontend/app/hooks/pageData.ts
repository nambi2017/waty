"use client";
import { useState, useEffect } from 'react';
import { getWatyLearningHomepage } from "@/sanity/sanity.query";
import type { WatyLearningHomepageType } from '../types';

export const FetchWatyLearningHomepageData = () => {
  const [watyLearningData, setWatyLearningData] = useState<WatyLearningHomepageType | null>(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const data = await getWatyLearningHomepage();
        console.log('Fetched Wat\'y Learning Homepage Data =>>>> ', data);
        setWatyLearningData(data);
      } catch (err) {
        console.error('Error fetching Wat\'y Learning homepage data:', err);
      } 
    };

    fetchHomepageData();
  }, []);

  return { watyLearningData };
};