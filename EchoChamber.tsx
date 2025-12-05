import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { analyzeEchoChamber } from './services/geminiService';
import { TweetNode, TweetLink, UserPath } from './types';

interface EchoChamberProps {
  path: UserPath;
}

const EchoChamber: React.FC<EchoChamberProps> = ({ path }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [year, setYear] = useState(2015);
  const [insight, setInsight] = useState<string>("正在加载学术背景...");

  // Generate mock data based on year
  const generateData = (year: number) => {
    const nodeCount = 60;
    const polarizationFactor = (year - 2014) / 6; // 0.1 to 1.0

    const nodes: TweetNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: `node-${i}`,
      group: i < nodeCount / 2 ? 'remain' : 'leave',
      radius: 5 + Math.random() * 5
    }));

    const links: TweetLink[] = [];
    
    // Create links
    nodes.forEach((source, i) => {
      nodes.forEach((target, j) => {
        if (i >= j) return;
        const sameGroup = source.group === target.group;
        const probability = sameGroup 
          ? 0.1 + (polarizationFactor * 0.4) // Increasing internal connections
          : 0.2 - (polarizationFactor * 0.18); // Decreasing cross-group connections
        
        if (Math.random() < probability) {
          links.push({ source: source.id, target: target.id, value: 1 });
        }
      });
    });

    return { nodes, links };
  };

  useEffect(() => {
    if (path === UserPath.ACADEMIC) {
      analyzeEchoChamber(year).then(setInsight);
    } else {
      setInsight(year === 2016 ? "公投：家庭破裂，时间线燃烧。" : "鸿沟加深...");
    }
  }, [year, path]);

  useEffect(() => {
    if (!svgRef.current) return;

    const { nodes, links } = generateData(year);
    const width = svgRef.current.clientWidth;
    const height = 400;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("max-width", "100%")
      .style("height", "auto");

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).strength(0.05))
      .force("charge", d3.forceManyBody().strength(-30))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(year > 2016 ? 0.01 : 0.05)) // Allow splitting
      .force("y", d3.forceY(height / 2).strength(0.05));
    
    // Add split force for later years
    if (year > 2016) {
      simulation.force("x", d3.forceX((d: any) => d.group === 'remain' ? width * 0.25 : width * 0.75).strength((year - 2016) * 0.2));
    }

    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.3)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1);

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => d.group === 'remain' ? '#012169' : '#C8102E')
      .call(drag(simulation) as any);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return () => {
      simulation.stop();
    };
  }, [year]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-2xl font-serif text-brexit-blue font-bold">回声室网络</h3>
          <p className="text-sm text-gray-600 mt-1">模拟社会拓扑结构：{year}</p>
        </div>
        <div className="text-right">
             <span className="text-xs font-bold px-2 py-1 bg-brexit-blue text-white rounded mr-2">留欧</span>
             <span className="text-xs font-bold px-2 py-1 bg-brexit-red text-white rounded">脱欧</span>
        </div>
      </div>
      
      <div className="relative w-full h-[400px] bg-slate-50 border border-slate-200 mb-6 rounded">
        <svg ref={svgRef} className="w-full h-full block" />
        <div className="absolute top-4 left-4 max-w-xs bg-white/90 p-3 text-sm shadow backdrop-blur-sm border-l-4 border-brexit-blue">
            <p className="italic font-serif">{insight}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="font-bold text-gray-500">2015</span>
        <input 
          type="range" 
          min="2015" 
          max="2020" 
          value={year} 
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brexit-blue"
        />
        <span className="font-bold text-brexit-blue">2020</span>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        拖动节点进行交互。注意随着时间的推移，分离强度在增加。
      </div>
    </div>
  );
};

export default EchoChamber;
