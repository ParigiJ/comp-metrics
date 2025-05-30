import React from "react";

export default function RequestCounter({ count, max = 25 }) {
  const radius = 24;
  const stroke = 4;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = Math.min(count / max, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="fixed bottom-4 right-4">
      <svg height={radius * 2} width={radius * 2}>
        {/* Grey background ring */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Green progress ring */}
        <circle
          stroke="#10b981"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 0.3s ease-in-out",
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        {/* Centered count */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#111827"
          fontSize="0.75rem"
          fontWeight="600"
        >
          {count}
        </text>
      </svg>
    </div>
  );
}
