"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function NazaraArch() {
  const [activeTab, setActiveTab] = useState<"ARPU" | "LTV" | "CAC">("ARPU");

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(10, 10, 15, 0.9)",
        titleColor: "rgba(255, 255, 255, 0.8)",
        bodyColor: "#00f2fe",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.4)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.4)",
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  const dataARPU = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        fill: true,
        label: "ARPU ($)",
        data: [1.2, 1.4, 1.3, 1.7, 2.1, 2.3, 2.8],
        borderColor: "#00f2fe",
        backgroundColor: "rgba(0, 242, 254, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#0a0a0f",
        pointBorderWidth: 2,
      },
    ],
  };

  const dataLTV = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "LTV ($)",
        data: [12, 15, 14, 18, 22, 25, 30],
        backgroundColor: "#6b21a8",
        borderRadius: 4,
      },
    ],
  };

  const dataCAC = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        fill: true,
        label: "CAC ($)",
        data: [5.2, 4.8, 4.5, 4.2, 3.8, 3.5, 3.1],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#0a0a0f",
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full flex flex-col gap-4 py-2">
      {/* Tabs */}
      <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 w-fit">
        {(["ARPU", "LTV", "CAC"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-1.5 text-xs font-mono font-bold rounded-md transition-colors z-10 ${
              activeTab === tab ? "text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white/10 rounded-md -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="w-full h-48 rounded-xl bg-black/20 border border-white/5 p-4 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full absolute inset-0 p-4"
          >
            {activeTab === "ARPU" && <Line data={dataARPU} options={commonOptions} />}
            {activeTab === "LTV" && <Bar data={dataLTV} options={commonOptions} />}
            {activeTab === "CAC" && <Line data={dataCAC} options={commonOptions} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
