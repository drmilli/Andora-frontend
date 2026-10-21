export interface TrackStat {
  id: string;
  title: string | null;
  type: string | null;
  streams: number;
  likes: number;
  downloads: number;
}

export interface MonthlyPoint {
  month: string;
  year: number;
  uploads: number;
  plays: number;
}

export interface ArtistStatistics {
  totals: {
    tracks: number;
    plays: number;
    likes: number;
    downloads: number;
    promotionSpend: number;
  };
  tracks: TrackStat[];
  promotions: Record<string, number>;
  monthly: MonthlyPoint[];
}
