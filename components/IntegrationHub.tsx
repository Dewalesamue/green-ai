import React, { useState, useEffect } from 'react';
import { 
  Cpu, Thermometer, Activity, Power, Radio, Globe, 
  RefreshCw, Sliders, Layers, Wifi, Check, 
  Smartphone, Zap, Sparkles, Fan, AlertTriangle
} from 'lucide-react';
import { COLORS } from '../constants';
import { UserData, UserRole } from '../types';

interface IntegrationHubProps {
  userData?: UserData | null;
}

const IntegrationHub: React.FC<IntegrationHubProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState<'devices' | 'satellite'>('devices');
  const role = userData?.role || UserRole.BUSINESS;

  // Tab 1: Devices Simulator State
  const [acState, setAcState] = useState<'Off' | 'Cool' | 'Eco'>('Eco');
  const [acTemp, setAcTemp] = useState(72);
  const [fanState, setFanState] = useState<'Off' | 'Low' | 'High'>('High');
  const [genState, setGenState] = useState<boolean>(false);
  const [ecobeeConnected, setEcobeeConnected] = useState<boolean>(true);
  const [websocketConnected, setWebsocketConnected] = useState<boolean>(true);
  
  // Simulated changing streams (live noise)
  const [voltage, setVoltage] = useState(120.4);
  const [currentPower, setCurrentPower] = useState(1.45);
  const [currentEmissions, setCurrentEmissions] = useState(0.58);
  const [telemetryPackets, setTelemetryPackets] = useState<any[]>([]);

  // Tab 2: Satellite Simulator State
  const [selectedRegion, setSelectedRegion] = useState<'NorthAmerica' | 'WestAfrica' | 'Europe'>('WestAfrica');
  const [activeLayer, setActiveLayer] = useState<'ndvi' | 'heat' | 'co2'>('co2');
  const [scanProgress, setScanProgress] = useState<number>(100);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [inspectedNode, setInspectedNode] = useState<{ x: number, y: number, value: string, co2: number } | null>(null);

  // Trigger telemetry noise
  useEffect(() => {
    const interval = setInterval(() => {
      if (websocketConnected) {
        // Calculate power consumption dynamically
        let acPower = acState === 'Off' ? 0 : acState === 'Cool' ? 2.8 : 1.2;
        if (acState !== 'Off' && acTemp < 70) acPower += 0.5; // cooling harder
        const fanPower = fanState === 'Off' ? 0 : fanState === 'Low' ? 0.15 : 0.45;
        const genPower = genState ? 5.5 : 0; // generator generates or consumes, let's say it adds 5.5kW fossil draw if on
        
        const basePower = (acPower + fanPower + genPower + 0.3); // + 300W idle baseline
        const noise = (Math.random() - 0.5) * 0.1;
        const targetPower = Math.max(0.1, basePower + noise);
        
        // Calculate emission based on power and energy source
        const carbonFactor = userData?.energySource?.includes('Grid') ? 0.45 : 0.12; 
        const emissionsValue = targetPower * carbonFactor;

        setCurrentPower(Math.round(targetPower * 100) / 100);
        setCurrentEmissions(Math.round(emissionsValue * 100) / 100);
        setVoltage(Math.round((120 + (Math.random() - 0.5) * 1.5) * 10) / 10);

        // Append to telemetry packet log (max 5)
        setTelemetryPackets(prev => {
          const next = [
            { 
              time: new Date().toLocaleTimeString(), 
              power: Math.round(targetPower * 100) / 100, 
              emissions: Math.round(emissionsValue * 100) / 100,
              status: acState !== 'Off' ? 'AC-ACTIVE' : 'STANDBY'
            },
            ...prev
          ];
          return next.slice(0, 5);
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [acState, acTemp, fanState, genState, websocketConnected, userData]);

  // Handle Satellite Scan Simulation
  const handleSatelliteScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setInspectedNode(null);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setScanProgress(progress);
      if (progress >= 100) {
        setIsScanning(false);
        clearInterval(interval);
      }
    }, 300);
  };

  // Satellite grid mockup data
  const gridNodes = [
    { x: 1, y: 1, value: "Optimal vegetation canopy", co2: 320 },
    { x: 1, y: 2, value: "Urban concrete high emission", co2: 440 },
    { x: 2, y: 1, value: "Forested rural carbon sink", co2: 280 },
    { x: 2, y: 2, value: "Industrial zone thermal peak", co2: 510 },
    { x: 3, y: 1, value: "Suburban light residential", co2: 360 },
    { x: 3, y: 2, value: "Wetland organic carbon lock", co2: 290 },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F4E79]/5 border border-[#1F4E79]/10 text-xs font-semibold mb-2">
            <Cpu size={12} className="text-[#1F4E79] animate-pulse" />
            Active Integration Center
          </div>
          <h2 className="text-3xl font-bold mb-1" style={{ color: COLORS.primary }}>
            Integration Hub & Live Telemetry
          </h2>
          <p className="opacity-70 text-sm">
            Simulate smart devices and inspect satellite environmental datasets to track immediate localized footprint shifts.
          </p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('devices')}
          className={`px-5 py-3 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'devices' 
              ? 'border-[#1F4E79] text-[#1F4E79]' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Wifi size={16} />
          🔌 Live Smart Devices
        </button>
        <button 
          onClick={() => setActiveTab('satellite')}
          className={`px-5 py-3 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'satellite' 
              ? 'border-[#1F4E79] text-[#1F4E79]' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Globe size={16} />
          📡 Satellite & Earth Layers
        </button>
      </div>

      {/* TAB 1 CONTENT: DEVICES SIMULATOR */}
      {activeTab === 'devices' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Controls Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white/50 border border-white/60 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Sliders className="text-[#1F4E79]" size={20} />
                  <h3 className="font-bold text-lg text-[#1F4E79]">Hardware Controller Simulator</h3>
                </div>
                {/* Connection Status indicator */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${ecobeeConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                    <span className="font-semibold text-gray-600">Ecobee Dev API: {ecobeeConnected ? 'Connected (Free)' : 'Offline'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${websocketConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                    <span className="font-semibold text-gray-600">WebSocket SSE: {websocketConnected ? 'Streaming' : 'Paused'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* AC Control Card */}
                <div className="p-5 rounded-xl border border-gray-200/50 bg-white/70 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Thermometer className="text-[#1F4E79]" size={18} />
                      <span className="font-bold text-sm">Smart AC</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      acState === 'Cool' ? 'bg-blue-100 text-blue-700' : acState === 'Eco' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>{acState}</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium">Operation Mode</label>
                    <div className="flex rounded-lg bg-gray-100 p-1 text-xs font-semibold gap-1">
                      {(['Off', 'Cool', 'Eco'] as const).map(mode => (
                        <button 
                          key={mode}
                          onClick={() => setAcState(mode)}
                          className={`flex-1 py-1 rounded text-center transition-all ${
                            acState === mode ? 'bg-white shadow-sm text-[#1F4E79]' : 'text-gray-500 hover:text-gray-800'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-medium text-gray-500">
                      <span>Set Temperature</span>
                      <span className="font-bold text-gray-800">{acTemp}°F</span>
                    </div>
                    <input 
                      type="range" 
                      min="64" 
                      max="82" 
                      value={acTemp}
                      disabled={acState === 'Off'}
                      onChange={e => setAcTemp(parseInt(e.target.value))}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1F4E79]"
                    />
                  </div>
                </div>

                {/* Fan Control Card */}
                <div className="p-5 rounded-xl border border-gray-200/50 bg-white/70 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Fan className="text-orange-500" size={18} />
                      <span className="font-bold text-sm">Circulation Fan</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-700 uppercase">{fanState}</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium">Fan Speed Mode</label>
                    <div className="flex rounded-lg bg-gray-100 p-1 text-xs font-semibold gap-1">
                      {(['Off', 'Low', 'High'] as const).map(speed => (
                        <button 
                          key={speed}
                          onClick={() => setFanState(speed)}
                          className={`flex-1 py-1 rounded text-center transition-all ${
                            fanState === speed ? 'bg-white shadow-sm text-[#1F4E79]' : 'text-gray-500 hover:text-gray-800'
                          }`}
                        >
                          {speed}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] opacity-60 leading-relaxed pt-3">
                     Pairing ceiling ventilation fans with high-setpoint HVAC (e.g. 74°F) saves up to <span className="text-green-600 font-bold">18% power usage</span>.
                  </p>
                </div>

                {/* Generator Control Card */}
                <div className="p-5 rounded-xl border border-gray-200/50 bg-white/70 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Zap className="text-amber-500 animate-pulse" size={18} />
                      <span className="font-bold text-sm">Backup Generator</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      genState ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-gray-100 text-gray-700'
                    }`}>{genState ? 'Running' : 'Standby'}</span>
                  </div>

                  <div className="space-y-3 pt-1">
                    <label className="text-xs text-gray-500 font-medium block">Generator Power Override</label>
                    <button 
                      onClick={() => setGenState(!genState)}
                      className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        genState 
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-md' 
                          : 'bg-[#1F4E79]/10 text-[#1F4E79] hover:bg-[#1F4E79]/20'
                      }`}
                    >
                      <Power size={14} />
                      {genState ? 'Deactivate Fossil Generator' : 'Simulate Power Outage (Gen On)'}
                    </button>
                  </div>
                  <p className="text-[10px] opacity-60 leading-relaxed pt-1.5">
                     *Uses standard diesel emissions factors. Activating this immediately raises your local Scope 1 footprint values.
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated Live Stream Graph/Logs */}
            <div className="p-6 rounded-2xl bg-white/50 border border-white/60 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="text-green-600" size={18} />
                  <h4 className="font-bold text-sm text-[#1F4E79]">Real-time Telemetry Push Log (WebSocket / SSE)</h4>
                </div>
                <button 
                  onClick={() => setTelemetryPackets([])}
                  className="text-xs text-blue-700 font-bold hover:underline"
                >
                  Clear stream
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto font-mono text-xs">
                {telemetryPackets.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    Waiting for streaming telemetry package broadcasts... (updated every 2s)
                  </div>
                ) : (
                  telemetryPackets.map((pkt, idx) => (
                    <div key={idx} className="flex justify-between p-2 rounded bg-white/40 border border-white/50 items-center animate-fade-in">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] opacity-50">{pkt.time}</span>
                        <span className="font-bold text-green-700">[SSE BROADCAST]</span>
                        <span className="text-gray-600 text-[11px]">JSON packet updated</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-[#1F4E79] font-bold">{pkt.power} kW</span>
                        <span className="text-red-700 font-bold">{pkt.emissions} kgCO2/h</span>
                        <span className="bg-[#1F4E79]/10 text-[#1F4E79] px-1.5 py-0.5 rounded text-[9px] font-semibold">{pkt.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Telemetry Stat Sidecard */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1F4E79] to-[#153554] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">Live Smart Telemetry</span>
                  <h3 className="text-2xl font-bold mt-1">Real-time Energy Impact</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="opacity-70 text-xs">Live Active Load</span>
                    <span className="font-bold text-lg">{currentPower} kW</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="opacity-70 text-xs">Live Hourly Emissions</span>
                    <span className="font-bold text-lg text-amber-300">{currentEmissions} kg CO2e / hr</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="opacity-70 text-xs">Simulated Voltage</span>
                    <span className="font-bold text-lg">{voltage} V</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="opacity-70 text-xs">Active HVAC Override</span>
                    <span className="font-bold text-lg">{acState !== 'Off' ? 'ENGAGED' : 'STANDBY'}</span>
                  </div>
                </div>

                <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs flex items-start gap-2.5">
                   <Sparkles className="text-yellow-300 shrink-0 mt-0.5 animate-pulse" size={14} />
                   <div className="space-y-1">
                      <span className="font-bold block text-white">How this works in Production</span>
                      <span className="text-blue-100 opacity-80 leading-normal block">
                         Your physical Ecobee communicates over standard OAuth and pushes updates via persistent server-sent events (SSE). GreenAI processes this live stream to calculate immediate tCO2e.
                      </span>
                   </div>
                </div>
              </div>
              <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[50%] rounded-full bg-[#F39C2D]/10 blur-[60px] pointer-events-none z-0"></div>
            </div>

            <div className="p-5 rounded-2xl bg-yellow-50 border border-yellow-200 text-yellow-900 text-xs space-y-2.5 shadow-sm">
               <h4 className="font-bold flex items-center gap-1.5">
                  <AlertTriangle size={15} />
                  Simulated Hardware Logic
               </h4>
               <p className="opacity-80 leading-relaxed">
                  Toggle modes above to see the load shift. For example, changing your Smart AC from <strong>Eco</strong> to <strong>Cool</strong> increases the draw from <strong>1.2 kW to 2.8 kW</strong>, generating live telemetry broadcasts.
               </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 CONTENT: SATELLITE SIMULATION */}
      {activeTab === 'satellite' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Main Map View */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white/50 border border-white/60 shadow-sm flex flex-col h-full justify-between">
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-[#1F4E79] flex items-center gap-2">
                      <Globe size={20} />
                      Satellite Spectral Imagery Viewer
                    </h3>
                    <p className="text-xs opacity-60">Querying Sentinel-2 & Google Earth Engine multi-spectral grids.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    {(['NorthAmerica', 'WestAfrica', 'Europe'] as const).map(reg => (
                      <button 
                        key={reg}
                        onClick={() => setSelectedRegion(reg)}
                        className={`px-3 py-1.5 rounded-lg border transition-all ${
                          selectedRegion === reg 
                            ? 'bg-[#1F4E79] text-white border-transparent shadow-sm' 
                            : 'bg-white/60 text-gray-600 border-gray-200 hover:bg-white'
                        }`}
                      >
                        {reg === 'WestAfrica' ? 'West Africa' : reg === 'NorthAmerica' ? 'North America' : 'Europe'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layer Picker */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-6 text-xs font-semibold gap-1">
                  <button 
                    onClick={() => setActiveLayer('ndvi')}
                    className={`flex-1 py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 ${
                      activeLayer === 'ndvi' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Layers size={14} />
                    Vegetation Index (NDVI)
                  </button>
                  <button 
                    onClick={() => setActiveLayer('heat')}
                    className={`flex-1 py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 ${
                      activeLayer === 'heat' ? 'bg-white text-orange-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Layers size={14} />
                    Urban Heat Density
                  </button>
                  <button 
                    onClick={() => setActiveLayer('co2')}
                    className={`flex-1 py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 ${
                      activeLayer === 'co2' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Layers size={14} />
                    CO2 Plume Concentration (ppm)
                  </button>
                </div>

                {/* Simulated Map Visualizer Grid */}
                <div className="relative border border-gray-200/50 rounded-2xl bg-slate-950 h-80 overflow-hidden flex items-center justify-center">
                  {/* Radar Scanning Line */}
                  {isScanning && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-400 opacity-60 shadow-[0_0_15px_#22c55e] animate-bounce z-10"></div>
                  )}

                  {/* Satellite Grid Overlay */}
                  <div className="grid grid-cols-3 grid-rows-2 w-full h-full p-4 gap-2 opacity-80 relative z-0">
                    {gridNodes.map((node, idx) => {
                      // Color schemes depending on active layer
                      let colorClass = "";
                      if (activeLayer === 'co2') {
                        colorClass = node.co2 > 400 ? 'bg-purple-900/40 border-purple-500 text-purple-200' : 'bg-[#1F4E79]/20 border-[#1F4E79]/40 text-blue-200';
                      } else if (activeLayer === 'heat') {
                        colorClass = node.co2 > 400 ? 'bg-red-900/40 border-red-500 text-red-200' : 'bg-green-950/20 border-green-500/40 text-green-200';
                      } else {
                        colorClass = node.co2 < 350 ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200' : 'bg-amber-950/20 border-amber-500/40 text-amber-200';
                      }

                      return (
                        <div 
                          key={idx}
                          onClick={() => setInspectedNode(node)}
                          className={`border rounded-xl p-3 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform ${colorClass}`}
                        >
                          <span className="text-[10px] opacity-50 font-mono">LAT {9.05 + node.x * 2}° N / LON {7.48 + node.y * 3}° E</span>
                          <div className="space-y-1">
                             <span className="text-[11px] font-bold block truncate">{node.value}</span>
                             <span className="text-xs font-mono font-bold block">
                                {activeLayer === 'co2' ? `${node.co2} ppm CO2` : activeLayer === 'heat' ? `${node.co2 > 400 ? '38.5°C Heat Cap' : '22.1°C Cool Sink'}` : `${node.co2 < 350 ? '0.74 (Dense Canopy)' : '0.12 (Low Canopy)'}`}
                             </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic Scanner Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-20"></div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center text-xs">
                <span className="opacity-60 font-mono">Query Source: ESA Sentinel-2 Earth Observation Satellite</span>
                <button 
                  onClick={handleSatelliteScan}
                  disabled={isScanning}
                  className="px-4 py-2 bg-[#1F4E79] text-white font-bold rounded-lg hover:bg-[#153554] disabled:opacity-50 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw size={12} className={isScanning ? 'animate-spin' : ''} />
                  {isScanning ? `Syncing Spectrals (${scanProgress}%)` : 'Trigger Earth Engine Sync'}
                </button>
              </div>
            </div>
          </div>

          {/* Inspected Node sidecard */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/50 border border-white/60 shadow-sm">
              <h4 className="font-bold text-sm text-[#1F4E79] mb-4 flex items-center gap-1.5">
                 <Radio className="text-purple-600 animate-pulse" size={16} />
                 Earth Observation Inspector
              </h4>

              {inspectedNode ? (
                <div className="space-y-4 animate-fade-in text-xs">
                  <div className="p-3 bg-slate-900 text-white rounded-xl font-mono">
                    <span className="text-[10px] block opacity-40">COORDINATE MAPPING</span>
                    <span className="font-bold block text-sm">GRID SECTOR {inspectedNode.x}-{inspectedNode.y}</span>
                  </div>

                  <div className="space-y-2">
                     <div className="flex justify-between border-b pb-1">
                        <span className="opacity-60">Regional Feature</span>
                        <span className="font-bold">{inspectedNode.value}</span>
                     </div>
                     <div className="flex justify-between border-b pb-1">
                        <span className="opacity-60">Environmental Biomass</span>
                        <span className="font-bold text-green-700">{inspectedNode.co2 < 350 ? 'High Carbon Sink Capacity' : 'Impaired Carbon Sink'}</span>
                     </div>
                     <div className="flex justify-between border-b pb-1">
                        <span className="opacity-60">Spectral CO2 Plume</span>
                        <span className="font-bold text-purple-700">{inspectedNode.co2} ppm</span>
                     </div>
                  </div>

                  <p className="text-[11px] text-gray-500 leading-normal bg-gray-50 p-3 rounded-lg border border-gray-100">
                     <strong>GreenAI Insight:</strong> Based on satellite telemetry, this sector has high heat island absorption. Introducing roof garden retrofits can lower cooling loads by <strong>12.4%</strong>.
                  </p>
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400 text-xs">
                   Select any sector node on the map to trigger high-resolution environmental spectral inspection.
                </div>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 text-xs space-y-2">
               <h4 className="font-bold flex items-center gap-1">
                  <Sparkles size={14} />
                  Zero API Cost Setup
               </h4>
               <p className="opacity-80 leading-normal">
                  Our initial development leverages <strong>Google Earth Engine's Free Developer Tier</strong> and raw ESA Sentinel public repositories. We map coordinate grids onto your dashboard with zero overhead cost!
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationHub;
