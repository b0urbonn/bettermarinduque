import './transparencyMotion.css';

export default function TransparencyGraphic() {
  return (
    <svg
      viewBox="0 0 152 112"
      className="h-auto w-22 sm:w-36"
      data-page-graphic="transparency"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="10"
        y="17"
        width="124"
        height="88"
        rx="9"
        className="fill-primary-50"
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
        d="M34 25h33m-33 9h21m-21 46h94"
        fill="none"
        className="stroke-primary-200"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g className="fill-primary-200">
        <rect
          className="transparency-graphic-bar"
          x="41"
          y="62"
          width="16"
          height="17"
          rx="2"
        />
        <rect
          className="transparency-graphic-bar"
          x="69"
          y="51"
          width="16"
          height="28"
          rx="2"
        />
        <rect
          className="transparency-graphic-bar"
          x="97"
          y="42"
          width="16"
          height="37"
          rx="2"
        />
      </g>
      <path
        d="m42 55 17-9 15 1 19-12 16-2 13-10"
        pathLength="1"
        fill="none"
        className="transparency-graphic-line stroke-primary-700"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
