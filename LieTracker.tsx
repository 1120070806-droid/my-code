import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { UserPath } from './types';

const data = [
  { day: '第1天', truth: 10, lie: 50, label: '巴士揭幕' },
  { day: '第5天', truth: 15, lie: 450, label: '' },
  { day: '第10天', truth: 40, lie: 1200, label: '电视辩论' },
  { day: '第15天', truth: 80, lie: 3500, label: '' },
  { day: '第20天', truth: 150, lie: 8900, label: '传播高峰' },
  { day: '第25天', truth: 300, lie: 12000, label: '' },
  { day: '第30天', truth: 450, lie: 15000, label: '投票日' },
];

interface LieTrackerProps {
    path: UserPath;
}

const LieTracker: React.FC<LieTrackerProps> = ({ path }) => {
  return (
    <div className="bg-brexit-cream p-6 rounded-lg shadow-lg border-2 border-brexit-red/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none transform rotate-12">
         {/* Abstract Bus Icon */}
         <svg viewBox="0 0 100 100" fill="#C8102E">
             <rect x="10" y="30" width="80" height="40" rx="5" />
             <circle cx="25" cy="70" r="8" />
             <circle cx="75" cy="70" r="8" />
             <rect x="15" y="35" width="20" height="15" fill="white" />
             <rect x="40" y="35" width="20" height="15" fill="white" />
             <rect x="65" y="35" width="20" height="15" fill="white" />
         </svg>
      </div>

      <h3 className="text-2xl font-serif text-brexit-red font-bold mb-2">关键谎言追踪器：3.5亿英镑的迷思</h3>
      <p className="text-gray-700 mb-6 italic">
          "我们每周送给欧盟3.5亿英镑。让我们把这笔钱用于我们的NHS。"
      </p>

      {path === UserPath.ACADEMIC && (
          <div className="bg-white p-3 mb-4 text-sm border-l-4 border-black">
              <strong>布兰多利尼定律（Brandolini's Law）：</strong> 反驳胡扯所需的能量比制造胡扯所需的能量大一个数量级。
          </div>
      )}

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLie" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C8102E" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#C8102E" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTruth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#012169" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#012169" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
            <XAxis dataKey="day" tick={{fontSize: 12}} stroke="#666" />
            <YAxis tick={{fontSize: 12}} stroke="#666" />
            <Tooltip 
                contentStyle={{ backgroundColor: '#fff', fontFamily: 'serif', border: '1px solid #ccc' }} 
                itemStyle={{ color: '#000' }}
            />
            <Area type="monotone" dataKey="lie" stroke="#C8102E" fillOpacity={1} fill="url(#colorLie)" name="谎言覆盖（用户）" />
            <Area type="monotone" dataKey="truth" stroke="#012169" fillOpacity={1} fill="url(#colorTruth)" name="事实核查覆盖" />
            <ReferenceLine x="第20天" stroke="black" strokeDasharray="3 3" label={{ position: 'top',  value: '传播高峰', fill: 'black', fontSize: 10 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500 font-mono">
          <div className="flex items-center"><div className="w-3 h-3 bg-brexit-red mr-2"></div> 错误信息传播</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-brexit-blue mr-2"></div> 更正信息传播</div>
      </div>
    </div>
  );
};

export default LieTracker;
