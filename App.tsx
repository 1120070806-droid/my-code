import React, { useState } from 'react';
import EchoChamber from './components/EchoChamber';
import LieTracker from './components/LieTracker';
import RegionalMap from './components/RegionalMap';
import AlgoSimulator from './components/AlgoSimulator';
import { UserPath, ModuleType } from './types';
import { Flag, Info, ChevronRight, Share2, LineChart, Map, Cpu, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [path, setPath] = useState<UserPath>(UserPath.ACADEMIC);
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.HOME);

  const enterModule = (module: ModuleType) => {
    setActiveModule(module);
  };

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.ECHO_CHAMBER:
        return <EchoChamber path={path} />;
      case ModuleType.LIE_TRACKER:
        return <LieTracker path={path} />;
      case ModuleType.REGIONAL_MAP:
        return <RegionalMap />;
      case ModuleType.ALGO_SIMULATOR:
        return <AlgoSimulator />;
      default:
        return null;
    }
  };

  if (activeModule === ModuleType.HOME) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#F5F5F0]">
         {/* Background Decoration */}
         <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#012169_1px,transparent_1px)] [background-size:20px_20px]"></div>
         </div>
         <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent transform -translate-x-1/2 opacity-50"></div>
         
         <div className="max-w-6xl w-full z-10">
            {/* Hero Section */}
            <div className="text-center mb-12 relative">
               <div className="inline-block border-b-8 border-double border-brexit-blue/20 pb-4 mb-4">
                  <h1 className="text-6xl md:text-8xl font-serif font-bold text-brexit-blue tracking-tight drop-shadow-sm leading-tight">
                    伟大的<br/><span className="text-brexit-red">数字鸿沟</span>
                  </h1>
               </div>
               <h2 className="text-2xl md:text-3xl font-light text-gray-700 mt-2 font-serif italic">
                 社交媒体在脱欧中的角色 <span className="text-gray-400 not-italic text-lg mx-2">|</span> 2015-2020
               </h2>
               <p className="mt-6 max-w-2xl mx-auto text-gray-600 font-medium">
                 选择一个模块开始探索：算法如何重塑现实，极化如何成为不可跨越的鸿沟。
               </p>
            </div>

            {/* Selection Cards - 2x2 Grid for Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-5xl mx-auto">
               {/* Echo Chamber */}
               <button 
                  onClick={() => enterModule(ModuleType.ECHO_CHAMBER)} 
                  className="group relative bg-white p-6 rounded-xl shadow-xl border-l-8 border-brexit-blue hover:translate-y-[-5px] transition-all duration-300 overflow-hidden text-left"
               >
                  <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Share2 size={120} className="text-brexit-blue" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 bg-brexit-blue/10 rounded-lg flex items-center justify-center text-brexit-blue group-hover:bg-brexit-blue group-hover:text-white transition-colors">
                      <Share2 size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 font-serif group-hover:text-brexit-blue transition-colors">回声室网络</h3>
                      <p className="text-gray-600 leading-snug mb-4 text-sm">
                        查看“Ecolusion Chart”，展示从混合意见到完全分裂的极化全过程。
                      </p>
                      <span className="inline-flex items-center text-sm font-bold text-brexit-blue uppercase tracking-wider">
                        进入模拟 <ChevronRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </div>
               </button>

               {/* Lie Tracker */}
               <button 
                  onClick={() => enterModule(ModuleType.LIE_TRACKER)} 
                  className="group relative bg-white p-6 rounded-xl shadow-xl border-l-8 border-brexit-red hover:translate-y-[-5px] transition-all duration-300 overflow-hidden text-left"
               >
                  <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <LineChart size={120} className="text-brexit-red" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 bg-brexit-red/10 rounded-lg flex items-center justify-center text-brexit-red group-hover:bg-brexit-red group-hover:text-white transition-colors">
                      <LineChart size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 font-serif group-hover:text-brexit-red transition-colors">谎言追踪器</h3>
                      <p className="text-gray-600 leading-snug mb-4 text-sm">
                        追踪关键虚假信息（如“3.5亿英镑NHS承诺”）如何击败复杂事实。
                      </p>
                      <span className="inline-flex items-center text-sm font-bold text-brexit-red uppercase tracking-wider">
                        查看数据 <ChevronRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </div>
               </button>

               {/* Regional Map */}
               <button 
                  onClick={() => enterModule(ModuleType.REGIONAL_MAP)} 
                  className="group relative bg-white p-6 rounded-xl shadow-xl border-l-8 border-gray-800 hover:translate-y-[-5px] transition-all duration-300 overflow-hidden text-left"
               >
                  <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Map size={120} className="text-gray-800" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 bg-gray-200 rounded-lg flex items-center justify-center text-gray-800 group-hover:bg-gray-800 group-hover:text-white transition-colors">
                      <Map size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 font-serif group-hover:text-gray-800 transition-colors">区域分裂地图</h3>
                      <p className="text-gray-600 leading-snug mb-4 text-sm">
                        对比英国各地的在线话语情绪与现实投票结果的差异。
                      </p>
                      <span className="inline-flex items-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                        探索地图 <ChevronRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </div>
               </button>

               {/* Algo Simulator */}
               <button 
                  onClick={() => enterModule(ModuleType.ALGO_SIMULATOR)} 
                  className="group relative bg-white p-6 rounded-xl shadow-xl border-l-8 border-indigo-900 hover:translate-y-[-5px] transition-all duration-300 overflow-hidden text-left"
               >
                  <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Cpu size={120} className="text-indigo-900" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-900 group-hover:bg-indigo-900 group-hover:text-white transition-colors">
                      <Cpu size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 font-serif group-hover:text-indigo-900 transition-colors">算法模拟器</h3>
                      <p className="text-gray-600 leading-snug mb-4 text-sm">
                        体验针对性广告和内容推荐机制如何为每个人定制不同的“现实”。
                      </p>
                      <span className="inline-flex items-center text-sm font-bold text-indigo-900 uppercase tracking-wider">
                        启动算法 <ChevronRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </div>
               </button>
            </div>
         </div>
         
         <footer className="absolute bottom-6 text-center text-xs text-gray-400 font-serif tracking-widest uppercase">
            EST. 2016 • LONDON • BRUSSELS
         </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-brexit-blue sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
           <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveModule(ModuleType.HOME)}>
              <div className="relative">
                <Flag className="text-brexit-blue fill-brexit-red transform -rotate-12" size={28} />
              </div>
              <h1 className="font-serif font-bold text-xl md:text-2xl text-gray-900 hidden md:block tracking-tight">
                伟大的<span className="text-brexit-blue">数字</span><span className="text-brexit-red">鸿沟</span>
              </h1>
              <span className="md:hidden font-serif font-bold text-lg">脱欧数字鸿沟</span>
           </div>
           
           <div className="flex items-center space-x-4 text-sm">
              <div className="hidden md:flex space-x-2">
                 {[UserPath.ACADEMIC, UserPath.EMOTIONAL, UserPath.ACTION].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPath(p)}
                      className={`px-3 py-1 rounded text-xs font-bold uppercase transition-colors ${
                         path === p 
                         ? 'bg-gray-800 text-white' 
                         : 'text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                       {p === UserPath.ACADEMIC ? '学术' : p === UserPath.EMOTIONAL ? '情感' : '行动'}
                    </button>
                 ))}
              </div>
              
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border-2 transition-colors ${
                  path === UserPath.ACADEMIC ? 'border-brexit-blue text-brexit-blue bg-blue-50' :
                  path === UserPath.EMOTIONAL ? 'border-brexit-red text-brexit-red bg-red-50' : 'border-gray-800 text-gray-800 bg-gray-50'
              }`}>
                {path === UserPath.ACADEMIC ? '学术分析' : path === UserPath.EMOTIONAL ? '情感体验' : '行动思考'}
              </span>
              <button 
                onClick={() => setActiveModule(ModuleType.HOME)} 
                className="text-gray-500 hover:text-brexit-red font-medium transition-colors border-l pl-4 border-gray-300"
                title="返回主页"
              >
                <ArrowLeft size={20} />
              </button>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Nav */}
        <nav className="lg:col-span-1 space-y-3">
           <button 
             onClick={() => setActiveModule(ModuleType.ECHO_CHAMBER)}
             className={`w-full text-left px-5 py-4 rounded-lg font-serif font-bold text-lg transition-all flex items-center justify-between border-2 ${
               activeModule === ModuleType.ECHO_CHAMBER 
               ? 'bg-brexit-blue border-brexit-blue text-white shadow-lg translate-x-2' 
               : 'bg-white border-transparent hover:border-gray-200 text-gray-600 hover:bg-gray-50'
             }`}
           >
             <span>回声室网络</span>
             {activeModule === ModuleType.ECHO_CHAMBER && <ChevronRight size={20} />}
           </button>

           <button 
             onClick={() => setActiveModule(ModuleType.LIE_TRACKER)}
             className={`w-full text-left px-5 py-4 rounded-lg font-serif font-bold text-lg transition-all flex items-center justify-between border-2 ${
               activeModule === ModuleType.LIE_TRACKER 
               ? 'bg-brexit-red border-brexit-red text-white shadow-lg translate-x-2' 
               : 'bg-white border-transparent hover:border-gray-200 text-gray-600 hover:bg-gray-50'
             }`}
           >
             <span>谎言追踪器</span>
             {activeModule === ModuleType.LIE_TRACKER && <ChevronRight size={20} />}
           </button>

           <button 
             onClick={() => setActiveModule(ModuleType.REGIONAL_MAP)}
             className={`w-full text-left px-5 py-4 rounded-lg font-serif font-bold text-lg transition-all flex items-center justify-between border-2 ${
               activeModule === ModuleType.REGIONAL_MAP 
               ? 'bg-gray-800 border-gray-800 text-white shadow-lg translate-x-2' 
               : 'bg-white border-transparent hover:border-gray-200 text-gray-600 hover:bg-gray-50'
             }`}
           >
             <span>区域分裂地图</span>
             {activeModule === ModuleType.REGIONAL_MAP && <ChevronRight size={20} />}
           </button>

           <button 
             onClick={() => setActiveModule(ModuleType.ALGO_SIMULATOR)}
             className={`w-full text-left px-5 py-4 rounded-lg font-serif font-bold text-lg transition-all flex items-center justify-between border-2 ${
               activeModule === ModuleType.ALGO_SIMULATOR 
               ? 'bg-gradient-to-r from-purple-900 to-indigo-900 border-indigo-900 text-white shadow-lg translate-x-2' 
               : 'bg-white border-transparent hover:border-gray-200 text-gray-600 hover:bg-gray-50'
             }`}
           >
             <span>算法模拟器</span>
             {activeModule === ModuleType.ALGO_SIMULATOR && <ChevronRight size={20} />}
           </button>

           <div className="mt-8 bg-[#F0F0E8] p-5 rounded-lg border border-gray-200 shadow-inner">
              <h4 className="font-bold text-xs uppercase text-gray-500 mb-3 flex items-center tracking-widest">
                <Info size={14} className="mr-2"/> 历史档案
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed italic font-serif">
                "在这场公投中，真理不仅是第一个受害者，它甚至从未被邀请参加辩论。" 
                <br/><span className="text-xs text-gray-500 not-italic mt-2 block">— 政治评论员, 2016</span>
              </p>
           </div>
        </nav>

        {/* Visualization Canvas */}
        <div className="lg:col-span-3">
           {renderModule()}
        </div>

      </main>
    </div>
  );
};

export default App;