export enum UserPath {
  ACADEMIC = 'ACADEMIC',
  EMOTIONAL = 'EMOTIONAL',
  ACTION = 'ACTION',
  NONE = 'NONE'
}

export enum ModuleType {
  ECHO_CHAMBER = 'ECHO_CHAMBER',
  LIE_TRACKER = 'LIE_TRACKER',
  REGIONAL_MAP = 'REGIONAL_MAP',
  ALGO_SIMULATOR = 'ALGO_SIMULATOR',
  HOME = 'HOME'
}

export interface NewsItem {
  id: string;
  headline: string;
  bias: 'remain' | 'leave';
  sensationalism: number; // 0-100
  isFake: boolean;
  source: string;
}

export interface RegionData {
  name: string;
  voteLeave: number; // Percentage
  twitterSentiment: number; // -1 (Strong Remain) to 1 (Strong Leave)
  coordinates: { x: number; y: number };
}

export interface TweetNode {
  id: string;
  group: 'remain' | 'leave' | 'neutral';
  radius: number;
}

export interface TweetLink {
  source: string;
  target: string;
  value: number;
}