import { RegionData } from "./types";

export const REGIONS: RegionData[] = [
  { name: '伦敦', voteLeave: 40.1, twitterSentiment: -0.6, coordinates: { x: 300, y: 350 } },
  { name: '苏格兰', voteLeave: 38.0, twitterSentiment: -0.5, coordinates: { x: 200, y: 100 } },
  { name: '英格兰东北', voteLeave: 58.0, twitterSentiment: 0.3, coordinates: { x: 280, y: 180 } },
  { name: '英格兰西北', voteLeave: 53.7, twitterSentiment: 0.1, coordinates: { x: 220, y: 220 } },
  { name: '约克郡', voteLeave: 57.7, twitterSentiment: 0.4, coordinates: { x: 280, y: 220 } },
  { name: '西米德兰兹', voteLeave: 59.3, twitterSentiment: 0.6, coordinates: { x: 230, y: 300 } },
  { name: '东米德兰兹', voteLeave: 58.8, twitterSentiment: 0.5, coordinates: { x: 300, y: 280 } },
  { name: '威尔士', voteLeave: 52.5, twitterSentiment: 0.2, coordinates: { x: 150, y: 320 } },
  { name: '英格兰东南', voteLeave: 51.8, twitterSentiment: -0.1, coordinates: { x: 320, y: 380 } },
  { name: '英格兰西南', voteLeave: 52.6, twitterSentiment: 0.1, coordinates: { x: 180, y: 400 } },
  { name: '北爱尔兰', voteLeave: 44.2, twitterSentiment: -0.3, coordinates: { x: 80, y: 180 } },
];

export const MOCK_NEWS_HEADLINES = [
  { headline: "欧盟官僚禁止弯曲的香蕉！", bias: 'leave', sensationalism: 90, isFake: true, source: "每日咆哮报" },
  { headline: "如果我们离开，经济崩溃迫在眉睫", bias: 'remain', sensationalism: 70, isFake: false, source: "金融观察家" },
  { headline: "突发：土耳其明年加入欧盟", bias: 'leave', sensationalism: 95, isFake: true, source: "爱国者新闻" },
  { headline: "青年选票可能左右公投结果", bias: 'remain', sensationalism: 30, isFake: false, source: "城市时报" },
  { headline: "每周3.5亿英镑用于我们的NHS", bias: 'leave', sensationalism: 100, isFake: true, source: "脱欧公投巴士" },
  { headline: "必须恢复主权", bias: 'leave', sensationalism: 60, isFake: false, source: "观点邮报" },
];

export const COLORS = {
  blue: '#012169',
  red: '#C8102E',
  white: '#FFFFFF',
};