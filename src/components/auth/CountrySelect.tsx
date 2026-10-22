import React, { useState, useEffect, useMemo } from "react";
import { GetAllCountries } from "@/services/clients/country";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectOption {
  name: string;
  code?: string;
  flag?: string;
}

export interface CountrySelectProps {
  label?: string;
  name?: string;
  placeholder?: string;
  options?: SelectOption[];
  defaultValue?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onValueChange?: (value: string) => void;
}

export const getFlagEmoji = (code?: string): string | undefined => {
  if (!code || code.length !== 2) return undefined;
  return String.fromCodePoint(...code.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0)));
};

const DEFAULT_COUNTRIES: SelectOption[] = [
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Ghana", code: "GH", flag: "🇬🇭" },
  { name: "Kenya", code: "KE", flag: "🇰🇪" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "United States", code: "US", flag: "🇺🇸" },
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

const BUDGETS: SelectOption[] = [
  { name: "Less than N10,000" },
  { name: "N10,000 - N50,000" },
  { name: "N50,000 - N100,000" },
  { name: "N100,000 - N500,000" },
  { name: "More than N500,000" },
];

const GENRES: SelectOption[] = [
  { name: "Pop" },
  { name: "Hip-Hop" },
  { name: "R&B" },
  { name: "Rock" },
  { name: "Electronic" },
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
  value,
  defaultValue,
  options: customOptions,

  disabled,
  required,
}) => {
  const [countries, setCountries] = useState<SelectOption[]>(DEFAULT_COUNTRIES);
  const [internalValue, setInternalValue] = useState<string | undefined>(value ?? defaultValue);

  const isCountrySelect = label.toLowerCase().includes("country") && !customOptions;

  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

useEffect(() => {
  if (!isCountrySelect) return;

  GetAllCountries()
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) return;

      const list = data.map((country: any) => ({
        name: country.name?.common || country.name || "",
        code: country.cca2 || country.alpha2Code || country.code,
        flag: country.flag || getFlagEmoji(
          country.cca2 || country.alpha2Code || country.code
        ),
      }));

      setCountries(list);
    })
    .catch(() => {
      setCountries(DEFAULT_COUNTRIES);
    });
}, [isCountrySelect]);

  const activeOptions = useMemo(() => {
    if (customOptions) return customOptions;
    const l = label.toLowerCase();
    if (l.includes("platform")) return PLATFORM_LIST;
    if (l.includes("engagement")) return ENGAGEMENT_RATES;
    if (l.includes("budget")) return BUDGETS;
    if (l.includes("genre")) return GENRES;
    return countries;
  }, [customOptions, label, countries]);

  const handleValueChange = (val: string) => {
    setInternalValue(val);

  };

  return (
    <div className="block text-left">
      {label && <label className="block text-sm font-medium text-white/70 mb-2">{label}</label>}

      <Select
        name={name}
        value={internalValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        required={required}
      >
        <SelectTrigger
          className={cn(
            "w-full h-10 border-0 border-b border-white/15 bg-transparent rounded-none px-0 pb-2 text-base font-semibold text-white shadow-none transition hover:border-white/30 focus-visible:border-[#f5b640] focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent",
            className
          )}
        >
          <SelectValue placeholder={placeholder || `Select ${label}`} />
        </SelectTrigger>

        <SelectContent className="border-white/10 bg-[#0e101c]/95 text-white backdrop-blur-2xl">
          {activeOptions.map((item, idx) => (
            <SelectItem
              key={`${item.name}-${item.code || idx}`}
              value={item.name}
              className="text-white/80 focus:bg-[#f5b640]/15 focus:text-[#f5b640] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {item.flag && <span className="text-base">{item.flag}</span>}
                {item.code && !item.flag && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                    {item.code}
                  </span>
                )}
                <span>{item.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
