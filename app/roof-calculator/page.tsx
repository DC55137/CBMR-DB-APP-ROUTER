"use client";

import { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

const pitchOptions = [1, 2, 3, 4, 5, 7.5, 10, 15, 20, 25, 30, 35];

export default function RoofCalculator() {
  const [baseArea, setBaseArea] = useState<string>("");
  const [pitch, setPitch] = useState<number>(1);
  const [roofArea, setRoofArea] = useState<number | null>(null);

  useEffect(() => {
    const calculateRoofArea = () => {
      if (!baseArea) {
        setRoofArea(null);
        return;
      }

      const pitchRadians = (pitch * Math.PI) / 180;
      const calculatedArea = parseFloat(baseArea) / Math.cos(pitchRadians);
      setRoofArea(calculatedArea);
    };

    calculateRoofArea();
  }, [baseArea, pitch]);

  const copyToClipboard = () => {
    if (roofArea !== null) {
      navigator.clipboard
        .writeText(roofArea.toFixed(2))
        .then(() => {
          toast("Copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-main-2 rounded-lg shadow-lg mt-20">
      <h1 className="text-3xl font-bold mb-6 text-main-12">
        Roof Area Calculator
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="baseArea" className="block text-main-11 mb-2">
              Base Area (m²):
            </label>
            <input
              type="number"
              id="baseArea"
              value={baseArea}
              onChange={(e) => setBaseArea(e.target.value)}
              className="w-full p-2 border border-main-7 rounded bg-main-3 text-main-12"
              placeholder="Enter base area"
            />
          </div>
          <div>
            <label htmlFor="pitch" className="block text-main-11 mb-2">
              Roof Pitch (degrees):
            </label>
            <select
              id="pitch"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full p-2 border border-main-7 rounded bg-main-3 text-main-12"
            >
              {pitchOptions.map((option) => (
                <option key={option} value={option}>
                  {option}°
                </option>
              ))}
            </select>
          </div>
          {roofArea !== null && (
            <div className="mt-6 p-4 bg-main-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-main-11">Result:</h2>
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-main-7 hover:bg-main-8 text-white rounded transition duration-200 flex items-center"
                  title="Copy to clipboard"
                >
                  <Copy size={16} className="mr-2" />
                  <span>Copy</span>
                </button>
              </div>
              <p className="text-main-12 text-lg">
                The estimated roof area is:{" "}
                <span className="font-bold">{roofArea.toFixed(2)}</span> m²
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-full h-64 md:h-full">
            <Image
              src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1722253577/cbroofing/roofing.png"
              alt="Roof pitch and area diagram"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
