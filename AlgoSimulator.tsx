import React, { useState } from 'react';
import { generateHeadlines } from '../services/geminiService';
import { Loader2, ThumbsUp, ThumbsDown, User, RefreshCw } from 'lucide-react';

const PROFILES = [
  "英格兰北部的退休工业工人",
  "伦敦的大学生",
  "威尔士的农民"
];

const AlgoSimulator: React.FC = () => {
  const [profile, setProfile] = useState<string>(PROFILES[0]);
  const [history, setHistory] = useState<string[]>([]);
  const [feed, setFeed] = useState<string[]>([
    "为什么欧盟在花你的钱",
    "当地工业被法规摧毁",
    "关于移民数量的真相"
  ]);
  const [loading, setLoading] = useState(false);

  const handleInteraction = async (headline: string, liked: boolean) => {
    if (!liked) {
      // Remove from view locally
      setFeed(prev => prev.filter(h => h !== headline));
      return;
    }

    setLoading(true);
    const newHistory = [...history, headline];
    setHistory(newHistory);

    try {
      const newHeadlines = await generateHeadlines(profile, newHistory);
      if (newHeadlines.length > 0) {
        setFeed(newHeadlines);
      }
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setHistory([]);
    setFeed(["处于十字路口的经济", "布鲁塞尔对你意味着什么？", "议会辩论主权问题"]);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-brexit-blue p-6 rounded-lg shadow-2xl text-white">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <span className="text-brexit-red">●</span> 算法决策模拟器
        </h3>
        <button onClick={reset} className="text-xs flex items-center gap-1 hover:text-brexit-red transition-colors">
          <RefreshCw size={14} /> 重置模拟
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Control */}
        <div className="bg-white/10 p-4 rounded backdrop-blur-sm h-fit">
          <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
            <User size={16} /> 目标画像
          </h4>
          <div className="space-y-2">
            {PROFILES.map(p => (
              <button
                key={p}
                onClick={() => { setProfile(p); reset(); }}
                className={`w-full text-left p-2 text-sm rounded transition-all ${
                  profile === p 
                    ? 'bg-brexit-red text-white shadow-lg font-bold' 
                    : 'bg-transparent hover:bg-white/5 text-gray-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="mt-6 text-xs text-gray-400 italic">
            "我们构建你想看到的英格兰。" <br/>— 剑桥分析（意译）
          </div>
        </div>

        {/* Feed Simulator */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm text-gray-300">你的个性化信息流</h4>
            {loading && <span className="flex items-center text-xs text-brexit-red animate-pulse"><Loader2 className="animate-spin mr-1" size={12}/> 正在优化参与度...</span>}
          </div>

          <div className="space-y-3 min-h-[300px]">
            {feed.map((headline, idx) => (
              <div key={idx} className="bg-white text-gray-900 p-4 rounded shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl border-l-4 border-brexit-blue">
                <p className="font-serif font-bold text-lg mb-3">"{headline}"</p>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide">赞助 • 为你推荐</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleInteraction(headline, false)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs text-gray-600 transition-colors"
                    >
                      <ThumbsDown size={14} /> 忽略
                    </button>
                    <button 
                      onClick={() => handleInteraction(headline, true)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-brexit-blue text-white hover:bg-blue-800 text-xs transition-colors shadow"
                    >
                      <ThumbsUp size={14} /> 点赞
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {feed.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    你已经过滤掉了所有现实。重置以重新开始。
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgoSimulator;