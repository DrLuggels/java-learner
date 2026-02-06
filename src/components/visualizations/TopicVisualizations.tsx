import React from 'react';

// ============================================================
// Color constants (dark theme)
// ============================================================
const C = {
  bgDark: '#161b22',
  bgMid: '#21262d',
  border: '#30363d',
  textBright: '#f0f6fc',
  textNormal: '#c9d1d9',
  textDim: '#8b949e',
  blue: '#58a6ff',
  green: '#3fb950',
  orange: '#d29922',
  purple: '#bc8cff',
  red: '#f85149',
  cyan: '#39d2c0',
} as const;

// ============================================================
// 1. Referenzen & Objekte  --  Memory Layout Diagram
// ============================================================
const ReferenzenObjekteViz: React.FC = () => (
  <svg
    viewBox="0 0 720 340"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: 720 }}
  >
    {/* Title */}
    <text x="360" y="28" textAnchor="middle" fill={C.textBright} fontSize="16" fontWeight="bold" fontFamily="monospace">
      Speicherlayout: Stack &amp; Heap
    </text>

    {/* ---- Stack ---- */}
    <rect x="20" y="50" width="260" height="260" rx="10" fill={C.bgDark} stroke={C.blue} strokeWidth="2" />
    <rect x="20" y="50" width="260" height="36" rx="10" fill={C.blue} fillOpacity="0.2" />
    <text x="150" y="74" textAnchor="middle" fill={C.blue} fontSize="15" fontWeight="bold" fontFamily="monospace">
      Stack
    </text>

    {/* Variable p1 */}
    <rect x="40" y="105" width="220" height="40" rx="6" fill={C.bgMid} stroke={C.border} strokeWidth="1.5" />
    <text x="55" y="130" fill={C.textNormal} fontSize="13" fontFamily="monospace">Person p1</text>
    <circle cx="230" cy="125" r="6" fill={C.blue} />

    {/* Variable p2 */}
    <rect x="40" y="165" width="220" height="40" rx="6" fill={C.bgMid} stroke={C.border} strokeWidth="1.5" />
    <text x="55" y="190" fill={C.textNormal} fontSize="13" fontFamily="monospace">Person p2</text>
    <circle cx="230" cy="185" r="6" fill={C.blue} />

    {/* Variable alter */}
    <rect x="40" y="225" width="220" height="40" rx="6" fill={C.bgMid} stroke={C.border} strokeWidth="1.5" />
    <text x="55" y="250" fill={C.textNormal} fontSize="13" fontFamily="monospace">int alter = 25</text>
    <text x="230" y="250" textAnchor="middle" fill={C.textDim} fontSize="11" fontFamily="monospace">(Wert)</text>

    {/* ---- Heap ---- */}
    <rect x="440" y="50" width="260" height="260" rx="10" fill={C.bgDark} stroke={C.green} strokeWidth="2" />
    <rect x="440" y="50" width="260" height="36" rx="10" fill={C.green} fillOpacity="0.2" />
    <text x="570" y="74" textAnchor="middle" fill={C.green} fontSize="15" fontWeight="bold" fontFamily="monospace">
      Heap
    </text>

    {/* Person object */}
    <rect x="460" y="110" width="220" height="80" rx="8" fill={C.bgMid} stroke={C.green} strokeWidth="1.5" />
    <text x="570" y="134" textAnchor="middle" fill={C.green} fontSize="13" fontWeight="bold" fontFamily="monospace">
      Person-Objekt
    </text>
    <line x1="470" y1="142" x2="670" y2="142" stroke={C.border} strokeWidth="1" />
    <text x="475" y="162" fill={C.textNormal} fontSize="12" fontFamily="monospace">name = &quot;Max&quot;</text>
    <text x="475" y="180" fill={C.textNormal} fontSize="12" fontFamily="monospace">alter = 25</text>

    {/* Arrows from p1 and p2 to the same object */}
    <defs>
      <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill={C.blue} />
      </marker>
    </defs>

    {/* Arrow p1 -> object */}
    <line x1="236" y1="125" x2="455" y2="135" stroke={C.blue} strokeWidth="2" markerEnd="url(#arrowBlue)" />

    {/* Arrow p2 -> object */}
    <line x1="236" y1="185" x2="455" y2="155" stroke={C.blue} strokeWidth="2" markerEnd="url(#arrowBlue)" strokeDasharray="6 3" />

    {/* Annotation */}
    <text x="340" y="230" textAnchor="middle" fill={C.textDim} fontSize="11" fontFamily="monospace">
      p2 = p1 (gleiche Referenz)
    </text>

    {/* Code snippet */}
    <text x="360" y="328" textAnchor="middle" fill={C.textDim} fontSize="11" fontFamily="monospace">
      Person p1 = new Person(&quot;Max&quot;);  Person p2 = p1;
    </text>
  </svg>
);

// ============================================================
// 2. Vererbung  --  Inheritance Hierarchy
// ============================================================
const VererbungViz: React.FC = () => (
  <svg
    viewBox="0 0 600 380"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: 600 }}
  >
    <defs>
      <marker id="arrowUp" markerWidth="10" markerHeight="7" refX="5" refY="0" orient="auto">
        <polygon points="0 7, 5 0, 10 7" fill={C.textDim} />
      </marker>
    </defs>

    {/* Title */}
    <text x="300" y="28" textAnchor="middle" fill={C.textBright} fontSize="16" fontWeight="bold" fontFamily="monospace">
      Vererbungshierarchie
    </text>

    {/* ---- Tier (base class) ---- */}
    <rect x="200" y="50" width="200" height="72" rx="8" fill={C.bgDark} stroke={C.blue} strokeWidth="2" />
    <rect x="200" y="50" width="200" height="28" rx="8" fill={C.blue} fillOpacity="0.25" />
    <text x="300" y="70" textAnchor="middle" fill={C.blue} fontSize="14" fontWeight="bold" fontFamily="monospace">Tier</text>
    <line x1="210" y1="78" x2="390" y2="78" stroke={C.border} strokeWidth="1" />
    <text x="215" y="96" fill={C.textNormal} fontSize="11" fontFamily="monospace">+ name: String</text>
    <text x="215" y="112" fill={C.textNormal} fontSize="11" fontFamily="monospace">+ fressen(): void</text>

    {/* ---- Haustier (intermediate) ---- */}
    <rect x="200" y="170" width="200" height="72" rx="8" fill={C.bgDark} stroke={C.orange} strokeWidth="2" />
    <rect x="200" y="170" width="200" height="28" rx="8" fill={C.orange} fillOpacity="0.2" />
    <text x="300" y="190" textAnchor="middle" fill={C.orange} fontSize="14" fontWeight="bold" fontFamily="monospace">Haustier</text>
    <line x1="210" y1="198" x2="390" y2="198" stroke={C.border} strokeWidth="1" />
    <text x="215" y="216" fill={C.textNormal} fontSize="11" fontFamily="monospace">+ besitzer: String</text>
    <text x="215" y="232" fill={C.textNormal} fontSize="11" fontFamily="monospace">+ streicheln(): void</text>

    {/* Arrow Haustier -> Tier */}
    <line x1="300" y1="170" x2="300" y2="128" stroke={C.textDim} strokeWidth="2" markerEnd="url(#arrowUp)" />
    <text x="316" y="155" fill={C.textDim} fontSize="10" fontFamily="monospace">extends</text>

    {/* ---- Hund ---- */}
    <rect x="70" y="290" width="180" height="72" rx="8" fill={C.bgDark} stroke={C.green} strokeWidth="2" />
    <rect x="70" y="290" width="180" height="28" rx="8" fill={C.green} fillOpacity="0.2" />
    <text x="160" y="310" textAnchor="middle" fill={C.green} fontSize="14" fontWeight="bold" fontFamily="monospace">Hund</text>
    <line x1="80" y1="318" x2="240" y2="318" stroke={C.border} strokeWidth="1" />
    <text x="85" y="336" fill={C.textNormal} fontSize="11" fontFamily="monospace">+ rasse: String</text>
    <text x="85" y="352" fill={C.textNormal} fontSize="11" fontFamily="monospace">+ bellen(): void</text>

    {/* Arrow Hund -> Haustier */}
    <line x1="160" y1="290" x2="260" y2="248" stroke={C.textDim} strokeWidth="2" markerEnd="url(#arrowUp)" />
    <text x="185" y="275" fill={C.textDim} fontSize="10" fontFamily="monospace">extends</text>

    {/* ---- Katze ---- */}
    <rect x="350" y="290" width="180" height="72" rx="8" fill={C.bgDark} stroke={C.green} strokeWidth="2" />
    <rect x="350" y="290" width="180" height="28" rx="8" fill={C.green} fillOpacity="0.2" />
    <text x="440" y="310" textAnchor="middle" fill={C.green} fontSize="14" fontWeight="bold" fontFamily="monospace">Katze</text>
    <line x1="360" y1="318" x2="520" y2="318" stroke={C.border} strokeWidth="1" />
    <text x="365" y="336" fill={C.textNormal} fontSize="11" fontFamily="monospace">+ indoor: boolean</text>
    <text x="365" y="352" fill={C.textNormal} fontSize="11" fontFamily="monospace">+ schnurren(): void</text>

    {/* Arrow Katze -> Haustier */}
    <line x1="440" y1="290" x2="340" y2="248" stroke={C.textDim} strokeWidth="2" markerEnd="url(#arrowUp)" />
    <text x="400" y="275" fill={C.textDim} fontSize="10" fontFamily="monospace">extends</text>
  </svg>
);

// ============================================================
// 3. OOP-Konzepte  --  Four Pillars of OOP
// ============================================================
const OopKonzepteViz: React.FC = () => {
  const pillars = [
    {
      label: 'Kapselung',
      color: C.blue,
      desc: 'Daten und Methoden\nzusammenfassen\nund schuetzen',
      icon: (cx: number, cy: number) => (
        <g key="icon-k">
          <rect x={cx - 14} y={cy - 14} width="28" height="22" rx="4" fill="none" stroke={C.blue} strokeWidth="2" />
          <circle cx={cx} cy={cy + 14} r="5" fill="none" stroke={C.blue} strokeWidth="2" />
          <line x1={cx} y1={cy + 8} x2={cx} y2={cy + 19} stroke={C.blue} strokeWidth="2" />
        </g>
      ),
    },
    {
      label: 'Abstraktion',
      color: C.green,
      desc: 'Komplexitaet\nverbergen, nur\nWesentliches zeigen',
      icon: (cx: number, cy: number) => (
        <g key="icon-a">
          <circle cx={cx} cy={cy} r="16" fill="none" stroke={C.green} strokeWidth="2" />
          <circle cx={cx} cy={cy} r="7" fill={C.green} fillOpacity="0.4" />
        </g>
      ),
    },
    {
      label: 'Vererbung',
      color: C.orange,
      desc: 'Eigenschaften\nvon Elternklasse\nuebernehmen',
      icon: (cx: number, cy: number) => (
        <g key="icon-v">
          <rect x={cx - 12} y={cy - 16} width="24" height="14" rx="3" fill="none" stroke={C.orange} strokeWidth="2" />
          <line x1={cx} y1={cy - 2} x2={cx} y2={cy + 4} stroke={C.orange} strokeWidth="2" />
          <line x1={cx - 14} y1={cy + 4} x2={cx + 14} y2={cy + 4} stroke={C.orange} strokeWidth="2" />
          <line x1={cx - 14} y1={cy + 4} x2={cx - 14} y2={cy + 10} stroke={C.orange} strokeWidth="2" />
          <line x1={cx + 14} y1={cy + 4} x2={cx + 14} y2={cy + 10} stroke={C.orange} strokeWidth="2" />
          <rect x={cx - 24} y={cy + 10} width="20" height="10" rx="2" fill="none" stroke={C.orange} strokeWidth="1.5" />
          <rect x={cx + 4} y={cy + 10} width="20" height="10" rx="2" fill="none" stroke={C.orange} strokeWidth="1.5" />
        </g>
      ),
    },
    {
      label: 'Polymorphie',
      color: C.purple,
      desc: 'Gleiche Methode,\nunterschiedliches\nVerhalten',
      icon: (cx: number, cy: number) => (
        <g key="icon-p">
          <polygon points={`${cx},${cy - 16} ${cx + 16},${cy} ${cx},${cy + 16} ${cx - 16},${cy}`} fill="none" stroke={C.purple} strokeWidth="2" />
          <circle cx={cx - 5} cy={cy} r="3" fill={C.purple} fillOpacity="0.6" />
          <rect x={cx + 1} y={cy - 3} width="6" height="6" rx="1" fill={C.purple} fillOpacity="0.6" />
        </g>
      ),
    },
  ];

  const boxW = 140;
  const gap = 16;
  const totalW = pillars.length * boxW + (pillars.length - 1) * gap;
  const startX = (640 - totalW) / 2;

  return (
    <svg
      viewBox="0 0 640 280"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: 640 }}
    >
      {/* Title */}
      <text x="320" y="28" textAnchor="middle" fill={C.textBright} fontSize="16" fontWeight="bold" fontFamily="monospace">
        Die vier Saeulen der OOP
      </text>

      {pillars.map((p, i) => {
        const x = startX + i * (boxW + gap);
        const y = 50;
        const h = 180;
        const cx = x + boxW / 2;
        return (
          <g key={p.label}>
            {/* Box */}
            <rect x={x} y={y} width={boxW} height={h} rx="10" fill={C.bgDark} stroke={p.color} strokeWidth="2" />
            {/* Header bg */}
            <rect x={x} y={y} width={boxW} height="32" rx="10" fill={p.color} fillOpacity="0.2" />
            {/* Clip bottom corners of header */}
            <rect x={x} y={y + 20} width={boxW} height="12" fill={p.color} fillOpacity="0.2" />
            {/* Label */}
            <text x={cx} y={y + 23} textAnchor="middle" fill={p.color} fontSize="12" fontWeight="bold" fontFamily="monospace">
              {p.label}
            </text>
            {/* Separator */}
            <line x1={x + 8} y1={y + 34} x2={x + boxW - 8} y2={y + 34} stroke={C.border} strokeWidth="1" />
            {/* Icon */}
            {p.icon(cx, y + 68)}
            {/* Description */}
            {p.desc.split('\n').map((line, li) => (
              <text
                key={li}
                x={cx}
                y={y + 110 + li * 18}
                textAnchor="middle"
                fill={C.textDim}
                fontSize="10.5"
                fontFamily="monospace"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Connecting line at bottom */}
      <line
        x1={startX + boxW / 2}
        y1={250}
        x2={startX + (pillars.length - 1) * (boxW + gap) + boxW / 2}
        y2={250}
        stroke={C.border}
        strokeWidth="2"
      />
      {pillars.map((p, i) => {
        const cx = startX + i * (boxW + gap) + boxW / 2;
        return <circle key={`dot-${i}`} cx={cx} cy={250} r="4" fill={p.color} />;
      })}
      <text x="320" y="272" textAnchor="middle" fill={C.textDim} fontSize="11" fontFamily="monospace">
        Objektorientierte Programmierung
      </text>
    </svg>
  );
};

// ============================================================
// 4. Collections-Framework  --  Collections Hierarchy
// ============================================================
const CollectionsFrameworkViz: React.FC = () => {
  // Helper: dashed border for interfaces, solid for classes
  const InterfaceBox: React.FC<{
    x: number;
    y: number;
    w: number;
    h: number;
    label: string;
    color: string;
  }> = ({ x, y, w, h, label, color }) => (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        fill={C.bgDark}
        stroke={color}
        strokeWidth="1.8"
        strokeDasharray="6 3"
      />
      <text x={x + w / 2} y={y + h / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="11" fontFamily="monospace" fontStyle="italic">
        &laquo;{label}&raquo;
      </text>
    </g>
  );

  const ClassBox: React.FC<{
    x: number;
    y: number;
    w: number;
    h: number;
    label: string;
    color: string;
  }> = ({ x, y, w, h, label, color }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={C.bgMid} stroke={color} strokeWidth="1.8" />
      <text x={x + w / 2} y={y + h / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="11" fontFamily="monospace" fontWeight="bold">
        {label}
      </text>
    </g>
  );

  const bw = 110; // box width
  const bh = 30;  // box height

  // Arrow helper
  const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number }> = ({ x1, y1, x2, y2 }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.textDim} strokeWidth="1.5" markerEnd="url(#arrowDown)" />
  );

  return (
    <svg
      viewBox="0 0 780 400"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: 780 }}
    >
      <defs>
        <marker id="arrowDown" markerWidth="8" markerHeight="6" refX="4" refY="6" orient="auto">
          <polygon points="0 0, 4 6, 8 0" fill={C.textDim} />
        </marker>
      </defs>

      {/* Title */}
      <text x="390" y="24" textAnchor="middle" fill={C.textBright} fontSize="16" fontWeight="bold" fontFamily="monospace">
        Collections-Framework Hierarchie
      </text>

      {/* Row 0: Iterable */}
      <InterfaceBox x={215} y={42} w={bw} h={bh} label="Iterable" color={C.blue} />

      {/* Arrow Iterable -> Collection */}
      <Arrow x1={270} y1={72} x2={270} y2={90} />

      {/* Row 1: Collection */}
      <InterfaceBox x={215} y={92} w={bw} h={bh} label="Collection" color={C.blue} />

      {/* Arrows Collection -> List, Set, Queue */}
      <Arrow x1={235} y1={122} x2={100} y2={152} />
      <Arrow x1={270} y1={122} x2={270} y2={152} />
      <Arrow x1={305} y1={122} x2={430} y2={152} />

      {/* Row 2: List, Set, Queue */}
      <InterfaceBox x={45} y={154} w={bw} h={bh} label="List" color={C.green} />
      <InterfaceBox x={215} y={154} w={bw} h={bh} label="Set" color={C.orange} />
      <InterfaceBox x={385} y={154} w={bw} h={bh} label="Queue" color={C.purple} />

      {/* Arrows List -> ArrayList, LinkedList */}
      <Arrow x1={80} y1={184} x2={50} y2={218} />
      <Arrow x1={120} y1={184} x2={160} y2={218} />

      {/* Row 3: List implementations */}
      <ClassBox x={0} y={220} w={bw} h={bh} label="ArrayList" color={C.green} />
      <ClassBox x={120} y={220} w={bw} h={bh} label="LinkedList" color={C.green} />

      {/* Arrows Set -> HashSet, TreeSet */}
      <Arrow x1={250} y1={184} x2={225} y2={218} />
      <Arrow x1={290} y1={184} x2={335} y2={218} />

      {/* Row 3: Set implementations */}
      <ClassBox x={175} y={220} w={bw} h={bh} label="HashSet" color={C.orange} />
      <ClassBox x={295} y={220} w={bw} h={bh} label="TreeSet" color={C.orange} />

      {/* Arrows Queue -> PriorityQueue, Deque */}
      <Arrow x1={420} y1={184} x2={420} y2={218} />
      <Arrow x1={460} y1={184} x2={540} y2={218} />

      {/* Row 3: Queue implementations */}
      <ClassBox x={370} y={220} w={120} h={bh} label="PriorityQueue" color={C.purple} />
      <InterfaceBox x={500} y={220} w={bw} h={bh} label="Deque" color={C.purple} />

      {/* Arrow Deque -> ArrayDeque */}
      <Arrow x1={555} y1={250} x2={555} y2={278} />
      <ClassBox x={500} y={280} w={bw} h={bh} label="ArrayDeque" color={C.purple} />

      {/* ---- Map (separate branch) ---- */}
      <InterfaceBox x={625} y={92} w={bw} h={bh} label="Map" color={C.cyan} />
      <Arrow x1={660} y1={122} x2={640} y2={152} />
      <Arrow x1={700} y1={122} x2={720} y2={152} />
      <ClassBox x={590} y={154} w={bw} h={bh} label="HashMap" color={C.cyan} />
      <ClassBox x={710} y={154} w={bw - 10} h={bh} label="TreeMap" color={C.cyan} />

      {/* Legend */}
      <rect x={20} y={340} width={80} height={22} rx="4" fill="none" stroke={C.textDim} strokeWidth="1.5" strokeDasharray="6 3" />
      <text x={115} y={356} fill={C.textDim} fontSize="10" fontFamily="monospace">= Interface</text>
      <rect x={200} y={340} width={80} height={22} rx="4" fill={C.bgMid} stroke={C.textDim} strokeWidth="1.5" />
      <text x={295} y={356} fill={C.textDim} fontSize="10" fontFamily="monospace">= Klasse</text>
    </svg>
  );
};

// ============================================================
// 5. Datentypen  --  Primitive Types Size Comparison
// ============================================================
const DatentypenViz: React.FC = () => {
  const types = [
    { name: 'byte', size: 1, color: C.blue },
    { name: 'short', size: 2, color: C.cyan },
    { name: 'int', size: 4, color: C.green },
    { name: 'long', size: 8, color: C.orange },
    { name: 'float', size: 4, color: C.purple },
    { name: 'double', size: 8, color: C.red },
    { name: 'char', size: 2, color: '#e0af68' },
    { name: 'boolean', size: 1, color: C.textDim },
  ];

  const maxSize = 8;
  const barMaxH = 160;
  const barW = 52;
  const gap = 18;
  const totalW = types.length * barW + (types.length - 1) * gap;
  const startX = (600 - totalW) / 2;
  const baseY = 240;

  return (
    <svg
      viewBox="0 0 600 300"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: 600 }}
    >
      {/* Title */}
      <text x="300" y="26" textAnchor="middle" fill={C.textBright} fontSize="16" fontWeight="bold" fontFamily="monospace">
        Primitive Datentypen - Groessenvergleich
      </text>

      {/* Y-axis label */}
      <text x="12" y={baseY - barMaxH / 2} textAnchor="middle" fill={C.textDim} fontSize="10" fontFamily="monospace" transform={`rotate(-90 12 ${baseY - barMaxH / 2})`}>
        Bytes
      </text>

      {/* Gridlines */}
      {[1, 2, 4, 8].map((v) => {
        const y = baseY - (v / maxSize) * barMaxH;
        return (
          <g key={`grid-${v}`}>
            <line x1={startX - 10} y1={y} x2={startX + totalW + 10} y2={y} stroke={C.border} strokeWidth="0.5" strokeDasharray="3 3" />
            <text x={startX - 16} y={y + 4} textAnchor="end" fill={C.textDim} fontSize="9" fontFamily="monospace">{v}</text>
          </g>
        );
      })}

      {/* Baseline */}
      <line x1={startX - 10} y1={baseY} x2={startX + totalW + 10} y2={baseY} stroke={C.border} strokeWidth="1" />

      {/* Bars */}
      {types.map((t, i) => {
        const x = startX + i * (barW + gap);
        const barH = (t.size / maxSize) * barMaxH;
        const y = baseY - barH;
        return (
          <g key={t.name}>
            <rect x={x} y={y} width={barW} height={barH} rx="4" fill={t.color} fillOpacity="0.3" stroke={t.color} strokeWidth="1.5" />
            {/* Type name on top */}
            <text x={x + barW / 2} y={y - 8} textAnchor="middle" fill={t.color} fontSize="11" fontWeight="bold" fontFamily="monospace">
              {t.name}
            </text>
            {/* Size label inside bar */}
            <text x={x + barW / 2} y={y + barH / 2 + 4} textAnchor="middle" fill={C.textBright} fontSize="12" fontWeight="bold" fontFamily="monospace">
              {t.size}
            </text>
            {/* Size below */}
            <text x={x + barW / 2} y={baseY + 16} textAnchor="middle" fill={C.textDim} fontSize="10" fontFamily="monospace">
              {t.size} Byte{t.size > 1 ? 's' : ''}
            </text>
          </g>
        );
      })}

      {/* Footer note */}
      <text x="300" y="286" textAnchor="middle" fill={C.textDim} fontSize="10" fontFamily="monospace">
        boolean: JVM-abhaengig (oft 1 Byte)
      </text>
    </svg>
  );
};

// ============================================================
// 6. Arrays  --  Array Memory Layout
// ============================================================
const ArraysViz: React.FC = () => {
  const values = [10, 20, 30, 40, 50];
  const cellW = 64;
  const cellH = 48;
  const gap = 4;
  const totalW = values.length * (cellW + gap) - gap;
  const startX = 260;
  const startY = 110;

  return (
    <svg
      viewBox="0 0 640 250"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: 640 }}
    >
      <defs>
        <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={C.green} />
        </marker>
      </defs>

      {/* Title */}
      <text x="320" y="26" textAnchor="middle" fill={C.textBright} fontSize="16" fontWeight="bold" fontFamily="monospace">
        Array-Speicherlayout
      </text>

      {/* Code line */}
      <text x="320" y="54" textAnchor="middle" fill={C.textDim} fontSize="12" fontFamily="monospace">
        int[] zahlen = {'{'} 10, 20, 30, 40, 50 {'}'};
      </text>

      {/* Variable box on stack */}
      <rect x="40" y={startY + 4} width="140" height="40" rx="6" fill={C.bgDark} stroke={C.blue} strokeWidth="1.8" />
      <text x="110" y={startY + 28} textAnchor="middle" fill={C.blue} fontSize="13" fontFamily="monospace" fontWeight="bold">
        zahlen
      </text>
      <text x="110" y={startY + 56} textAnchor="middle" fill={C.textDim} fontSize="10" fontFamily="monospace">
        (Referenz)
      </text>

      {/* Arrow from variable to array */}
      <line x1="180" y1={startY + 24} x2={startX - 6} y2={startY + 24} stroke={C.green} strokeWidth="2" markerEnd="url(#arrowGreen)" />

      {/* Index labels */}
      {values.map((_, i) => {
        const x = startX + i * (cellW + gap);
        return (
          <text
            key={`idx-${i}`}
            x={x + cellW / 2}
            y={startY - 10}
            textAnchor="middle"
            fill={C.textDim}
            fontSize="11"
            fontFamily="monospace"
          >
            [{i}]
          </text>
        );
      })}

      {/* Array cells */}
      {values.map((v, i) => {
        const x = startX + i * (cellW + gap);
        return (
          <g key={`cell-${i}`}>
            <rect x={x} y={startY} width={cellW} height={cellH} rx="4" fill={C.bgDark} stroke={C.green} strokeWidth="1.8" />
            <text x={x + cellW / 2} y={startY + cellH / 2 + 5} textAnchor="middle" fill={C.textBright} fontSize="16" fontWeight="bold" fontFamily="monospace">
              {v}
            </text>
          </g>
        );
      })}

      {/* Connecting lines between cells (inner borders) */}
      {values.slice(0, -1).map((_, i) => {
        const x = startX + (i + 1) * (cellW + gap) - gap;
        return (
          <line
            key={`conn-${i}`}
            x1={x}
            y1={startY + 10}
            x2={x + gap}
            y2={startY + 10}
            stroke={C.border}
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        );
      })}

      {/* Memory addresses */}
      {values.map((_, i) => {
        const x = startX + i * (cellW + gap);
        return (
          <text
            key={`addr-${i}`}
            x={x + cellW / 2}
            y={startY + cellH + 18}
            textAnchor="middle"
            fill={C.textDim}
            fontSize="9"
            fontFamily="monospace"
          >
            0x{(100 + i * 4).toString(16)}
          </text>
        );
      })}

      {/* Length info */}
      <text x="320" y={startY + cellH + 50} textAnchor="middle" fill={C.textDim} fontSize="11" fontFamily="monospace">
        zahlen.length = {values.length} | Typ: int[] | Groesse: {values.length * 4} Bytes
      </text>

      {/* Bracket spanning the array */}
      <line x1={startX} y1={startY + cellH + 28} x2={startX + totalW} y2={startY + cellH + 28} stroke={C.border} strokeWidth="1" />
      <line x1={startX} y1={startY + cellH + 24} x2={startX} y2={startY + cellH + 32} stroke={C.border} strokeWidth="1" />
      <line x1={startX + totalW} y1={startY + cellH + 24} x2={startX + totalW} y2={startY + cellH + 32} stroke={C.border} strokeWidth="1" />
    </svg>
  );
};

// ============================================================
// Registry: topicId -> component
// ============================================================
const visualizationMap: Record<string, React.FC> = {
  'referenzen-objekte': ReferenzenObjekteViz,
  'vererbung': VererbungViz,
  'oop-konzepte': OopKonzepteViz,
  'collections-framework': CollectionsFrameworkViz,
  'datentypen': DatentypenViz,
  'arrays': ArraysViz,
};

// ============================================================
// Public component
// ============================================================
interface TopicVisualizationProps {
  topicId: string;
}

const TopicVisualization: React.FC<TopicVisualizationProps> = ({ topicId }) => {
  const Viz = visualizationMap[topicId];
  if (!Viz) {
    return null;
  }
  return (
    <div style={{ width: '100%', padding: '16px 0' }}>
      <Viz />
    </div>
  );
};

export default TopicVisualization;
