import React, { useState } from 'react';
import { REGIONS } from './constants';
import { RegionData } from './types';

const RegionalMap: React.FC = () => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);

  // A simplified schematic map of UK regions using circles/squares for abstraction
  // This avoids complex GeoJSON for this demo while maintaining the data visualization aspect
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-2xl font-serif text-brexit-blue font-bold mb-4">区域-数字分裂地图</h3>
      <div className="flex flex-col md:flex-row gap-6">
        
        <div className="relative w-full md:w-2/3 h-[450px] bg-slate-100 rounded-lg overflow-hidden border border-slate-300">
           <svg width="100%" height="100%" viewBox="0 0 500 600">
             {/* Base Map Grid */}
             <defs>
               <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                 <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />

             {/* Connection lines to show unity/disunity */}
             <path d="M 300 350 L 230 300 L 220 220 L 200 100" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" fill="none" />
             <path d="M 150 320 L 230 300" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" fill="none" />
             
             {REGIONS.map((region) => {
               // Color calc: Vote Leave > 50 is Red, else Blue
               const isLeave = region.voteLeave > 50;
               const radius = 20 + (region.voteLeave / 4); 
               // Sentiment calc: -1 is pure Blue, 1 is pure Red. 
               // If Sentiment matches Vote, solid border. If mismatch, dashed warning border.
               const sentimentIsLeave = region.twitterSentiment > 0;
               const mismatch = isLeave !== sentimentIsLeave;

               return (
                 <g 
                    key={region.name} 
                    transform={`translate(${region.coordinates.x}, ${region.coordinates.y})`}
                    onMouseEnter={() => setHoveredRegion(region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className="cursor-pointer transition-all duration-300 hover:scale-110"
                 >
                   <circle 
                      r={radius} 
                      fill={isLeave ? '#C8102E' : '#012169'} 
                      fillOpacity={0.8}
                      stroke={mismatch ? '#FBBF24' : 'white'}
                      strokeWidth={mismatch ? 4 : 2}
                      strokeDasharray={mismatch ? "4 2" : "0"}
                   />
                   <text 
                      y={-radius - 5} 
                      textAnchor="middle" 
                      className="text-[10px] font-bold fill-gray-700 uppercase tracking-widest"
                      style={{ textShadow: '1px 1px 0 #fff'}}
                   >
                     {region.name}
                   </text>
                 </g>
               );
             })}
           </svg>
           
           <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 p-2 rounded">
              <p className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-brexit-red"></span> 脱欧派多数</p>
              <p className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-brexit-blue"></span> 留欧派多数</p>
              <p className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-yellow-400 border-dashed"></span> 数字情绪错配</p>
           </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col justify-center">
            {hoveredRegion ? (
              <div className="bg-brexit-cream p-4 border-t-4 border-brexit-blue shadow-md transition-all">
                <h4 className="text-xl font-bold font-serif mb-2">{hoveredRegion.name}</h4>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>实际投票（脱欧）</span>
                    <span className="font-bold">{hoveredRegion.voteLeave}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brexit-red" 
                      style={{ width: `${hoveredRegion.voteLeave}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Twitter 情绪</span>
                    <span className="font-bold text-gray-600">
                      {hoveredRegion.twitterSentiment > 0 ? '支持脱欧' : '支持留欧'}
                    </span>
                  </div>
                  <div className="flex w-full h-2 rounded-full overflow-hidden bg-gray-200">
                     {/* Map -1 to 1 range to 0 to 100% width relative to center */}
                     <div className="w-1/2 flex justify-end bg-brexit-blue/20">
                        {hoveredRegion.twitterSentiment < 0 && (
                          <div className="h-full bg-brexit-blue" style={{ width: `${Math.abs(hoveredRegion.twitterSentiment) * 100}%`}}></div>
                        )}
                     </div>
                     <div className="w-1/2 flex justify-start bg-brexit-red/20">
                        {hoveredRegion.twitterSentiment > 0 && (
                          <div className="h-full bg-brexit-red" style={{ width: `${hoveredRegion.twitterSentiment * 100}%`}}></div>
                        )}
                     </div>
                  </div>
                </div>

                <p className="text-sm italic text-gray-600">
                  {Math.abs(hoveredRegion.voteLeave - (50 + hoveredRegion.twitterSentiment * 50)) > 15 
                    ? "这里的数字对话与投票箱的现实严重脱节。"
                    : "社交媒体很大程度上反映了这里的实际投票意向。"
                  }
                </p>
              </div>
            ) : (
              <div className="text-center text-gray-400 p-8 border-2 border-dashed border-gray-200 rounded">
                <p>将鼠标悬停在区域上以分析分歧。</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default RegionalMap;
