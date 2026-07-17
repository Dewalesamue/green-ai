import React from 'react';
import { FileText, Download, Share2, Printer } from 'lucide-react';
import { COLORS, REPORTS_LIST } from '../constants';

const Reports: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 pb-24">
            <div>
                <h2 className="text-3xl font-bold mb-1" style={{ color: COLORS.primary }}>Reports & Compliance</h2>
                <p className="opacity-70">ESG-ready documentation and automated audits.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Report List */}
                <div className="lg:col-span-2 space-y-4">
                    {REPORTS_LIST.map((report) => (
                        <div key={report.id} className="p-6 rounded-2xl bg-white/50 border border-white/60 hover:bg-white/80 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-blue-50 text-blue-700 rounded-xl">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[#1F4E79]">{report.name}</h3>
                                    <p className="text-sm opacity-60">Generated on {report.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full mr-2 ${
                                    report.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {report.status.toUpperCase()}
                                </span>
                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"><Download size={20} /></button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"><Share2 size={20} /></button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Generate New */}
                <div className="rounded-3xl bg-white/40 border border-white/60 p-6 flex flex-col gap-6 h-fit">
                    <h3 className="font-bold text-lg" style={{ color: COLORS.primary }}>Generate Report</h3>
                    
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold opacity-70">Report Type</label>
                            <select className="w-full p-3 rounded-xl bg-white/70 border-none outline-none">
                                <option>ESG Compliance (Standard)</option>
                                <option>Carbon Audit</option>
                                <option>Executive Summary</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold opacity-70">Date Range</label>
                            <select className="w-full p-3 rounded-xl bg-white/70 border-none outline-none">
                                <option>Last 30 Days</option>
                                <option>Last Quarter</option>
                                <option>Year to Date</option>
                            </select>
                        </div>
                        <button className="w-full py-3 rounded-xl bg-[#1F4E79] text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                            Create Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;