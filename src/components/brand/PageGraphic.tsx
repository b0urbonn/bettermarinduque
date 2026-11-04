import {
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  FileSearch,
  FileText,
  HandCoins,
  HardHat,
  Landmark,
  Search,
  UsersRound,
  Wallet,
} from 'lucide-react';
import './civicMotion.css';

const icons = {
  about: UsersRound,
  audits: FileSearch,
  budgets: Wallet,
  document: FileText,
  government: Landmark,
  guide: BookOpen,
  infrastructure: HardHat,
  procurement: ClipboardCheck,
  search: Search,
  services: ClipboardList,
  settlement: HandCoins,
};

export type PageGraphicKind = keyof typeof icons;

export default function PageGraphic({ kind }: { kind: PageGraphicKind }) {
  const Icon = icons[kind];

  return (
    <svg
      viewBox="0 0 152 112"
      className="h-auto w-22 shrink-0 sm:w-36"
      data-page-graphic={kind}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="10"
        y="17"
        width="124"
        height="88"
        rx="9"
        className="fill-primary-100"
      />
      <rect
        x="19"
        y="8"
        width="124"
        height="88"
        rx="9"
        className="fill-white stroke-primary-200"
        strokeWidth="2"
      />
      <path
        d="M31 24h23M31 80h99m-16-13h16m-16-12h10"
        pathLength="1"
        className="civic-graphic-trace fill-none stroke-primary-300"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g className="civic-graphic-rise civic-graphic-delay-1">
        <circle cx="79" cy="50" r="29" className="fill-primary-50" />
        <Icon
          x={61}
          y={32}
          size={36}
          strokeWidth={1.65}
          className="text-primary-700"
        />
      </g>
      <circle
        cx="126"
        cy="25"
        r="4"
        className="civic-graphic-rise civic-graphic-delay-2 fill-accent-400"
      />
    </svg>
  );
}
