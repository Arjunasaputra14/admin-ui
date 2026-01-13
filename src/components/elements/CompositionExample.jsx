import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
import * as React from "react";
import { ThemeContext } from "../../context/themeContext";

function GaugePointer({ color }) {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle == null) return null;

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={color} />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke={color}
        strokeWidth={3}
      />
    </g>
  );
}

export default function CompositionExample({ data }) {
  const { theme } = React.useContext(ThemeContext);

  // ✅ HARD GUARANTEE NUMBER + RANGE
  const value = Math.min(Math.max(Number(data) || 0, 0), 100);

  return (
    <GaugeContainer
      width={150}
      height={80}
      startAngle={-90}
      endAngle={90}
      value={value}
      valueMin={0}      // 🔥 INI YANG SEBELUMNYA HILANG
      valueMax={100}    // 🔥 WAJIB
      sx={{
        "& .value-arc": {
          fill: theme.color,
        },
      }}
    >
      {/* 🔥 Reference arc HARUS tahu range */}
      <GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer color={theme.color} />
    </GaugeContainer>
  );
}
