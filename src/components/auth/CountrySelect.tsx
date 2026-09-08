import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GetAllCountries } from "@/services/clients/country";
import type { Country } from "@/types/client/country";

export interface SelectOption {
  name: string;
  code?: string;
}

interface CountrySelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name?: string;
  placeholder?: string;
  options?: SelectOption[];
}

const DEFAULT_COUNTRIES: SelectOption[] = [
  { name: "Canada", code: "CA" },
  { name: "Ghana", code: "GH" },
  { name: "Kenya", code: "KE" },
  { name: "Nigeria", code: "NG" },
  { name: "South Africa", code: "ZA" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
];

const PLATFORM_LIST: SelectOption[] = [
  { name: "Instagram" },
  { name: "TikTok" },
  { name: "X (Twitter)" },
  { name: "Facebook" },
  { name: "YouTube" },
  { name: "LinkedIn" },
  { name: "Snapchat" },
  { name: "WhatsApp" },
];

const ENGAGEMENT_RATES: SelectOption[] = [
  { name: "Less than 1%" },
  { name: "1% - 3%" },
  { name: "3% - 5%" },
  { name: "5% - 10%" },
  { name: "More than 10%" },
];

export const CountrySelect: React.FC<CountrySelectProps> = ({
  label = "Country",
  name,
  placeholder,
  className,
  defaultValue = "",
  options: customOptions,
  onChange,
  ...props
}) => {
  const [countries, setCountries] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const isCountrySelect = label.toLowerCase().includes("country") && !customOptions;

  // --- FETCH COUNTRIES FROM API VIA GetAllCountries SERVICE ---
  useEffect(() => {
    if (!isCountrySelect) {
      setLoading(false);
      return;
    }

    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await GetAllCountries();
        
        // Handle various response wrappers cleanly
        const rawArray: any[] = Array.isArray(data)
          ? data
          : Array.isArray((data as any)?.countries)
          ? (data as any).countries
          : Array.isArray((data as any)?.data)
          ? (data as any).data
          : [];

        const formattedData: SelectOption[] = rawArray
          .map((item: any) => {
            let nameStr = "";
            if (typeof item.name === "string") {
              nameStr = item.name;
            } else if (item.name?.common) {
              nameStr = item.name.common;
            } else if (item.name?.name) {
              nameStr = item.name.name;
            } else if (item.common) {
              nameStr = item.common;
            }
            return {
              name: nameStr.trim(),
              code: item.alpha2Code || item.cca2 || item.code || "",
            };
          })
          .filter((item) => item.name && item.name !== "Unknown");

        // Deduplicate countries by name
        const uniqueData = Array.from(
          new Map(formattedData.map((item) => [item.name, item])).values()
        );

        // Sort countries alphabetically
        uniqueData.sort((a, b) => a.name.localeCompare(b.name));

        setCountries(uniqueData.length > 0 ? uniqueData : DEFAULT_COUNTRIES);
      } catch (error) {
        console.error("Error fetching countries via API service:", error);
        setCountries(DEFAULT_COUNTRIES);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [isCountrySelect]);

  // Determine active options list
  const activeOptions: SelectOption[] = React.useMemo(() => {
    if (customOptions) return customOptions;
    if (label.toLowerCase().includes("platform")) return PLATFORM_LIST;
    if (label.toLowerCase().includes("engagement")) return ENGAGEMENT_RATES;
    return countries.length > 0 ? countries : DEFAULT_COUNTRIES;
  }, [customOptions, label, countries]);

  return (
    <label className="block">
      {label && <span className="text-sm font-medium text-white/70">{label}</span>}
      <div className="relative mt-2">
        <select
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          className={cn(
            "w-full h-10 appearance-none cursor-pointer border-b border-white/15 bg-transparent pb-2 text-base font-semibold text-white pr-8 transition focus:border-[#f5b640] focus:outline-none",
            className
          )}
          {...props}
        >
          <option value="" disabled className="bg-[#12131e] font-normal text-white/40">
            {placeholder || `Select ${label}`}
          </option>
          {loading && isCountrySelect ? (
            <option disabled className="bg-[#12131e] text-white/50">
              Loading countries...
            </option>
          ) : (
            activeOptions.map((item, idx) => (
              <option
                key={`${item.name}-${item.code || idx}`}
                value={item.name}
                className="bg-[#12131e] text-white py-1"
              >
                {item.name}
              </option>
            ))
          )}
        </select>
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/60">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </label>
  );
};



