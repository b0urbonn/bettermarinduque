import React from 'react';

// BetterMarinduque mark: the Moriones helmet with its tricolour plume, the
// island of Marinduque behind it, and the eight-ray sun of the flag. Island
// outline derived from OpenStreetMap coastline data (© OpenStreetMap
// contributors, ODbL), mainland simplified for the mark.
// Standalone file: src/assets/brand/bettermarinduque-mark.svg
const ISLAND_PATH =
  'M128 337 143 340 153 346 164 366 164 371 168 371 171 374 169 377 173 377 179 382 185 390 200 393 201 392 204 396 210 398 234 398 238 394 248 381 256 359 259 353 261 339 258 334 252 329 250 325 253 315 257 312 267 309 272 301 271 297 273 289 279 281 290 278 298 269 299 267 298 265 300 263 304 265 311 261 316 257 318 253 320 253 323 251 325 253 326 250 329 248 328 246 334 241 333 239 334 229 338 223 349 215 353 214 359 216 359 214 361 214 357 207 356 206 353 209 348 205 348 203 352 199 355 195 349 192 345 193 343 192 341 194 335 193 334 190 332 192 330 184 327 182 325 177 322 175 321 173 319 173 319 168 311 161 311 153 308 148 311 145 314 146 320 153 327 156 329 144 324 140 330 141 331 139 334 140 338 131 337 124 333 118 322 107 319 106 316 100 308 97 293 87 285 89 280 94 281 100 274 98 273 100 270 98 265 100 259 100 256 95 251 92 250 88 251 86 257 86 260 91 263 92 265 91 263 86 260 82 255 72 255 70 258 71 257 70 253 69 255 66 254 62 252 60 237 63 229 61 242 55 238 49 238 45 235 40 231 40 231 36 228 35 222 29 217 28 217 25 214 23 210 25 208 30 209 31 209 35 215 36 216 38 210 38 204 37 198 42 203 45 205 49 201 51 199 50 194 51 192 49 189 50 188 49 182 54 180 50 173 46 173 44 170 44 167 42 167 45 154 40 151 42 146 42 140 36 143 32 138 32 136 30 131 28 128 31 129 37 123 41 125 41 126 46 121 48 116 48 111 46 112 44 111 43 106 42 105 40 100 42 96 38 92 33 94 32 97 32 90 26 92 24 88 18 89 13 86 15 88 19 86 22 81 19 80 17 78 20 72 18 73 15 77 13 75 11 75 8 72 8 73 7 72 6 70 1 64 0 60 6 55 7 52 6 55 14 63 21 57 33 58 36 57 37 58 35 61 33 64 34 66 32 67 29 72 32 72 35 69 38 68 37 65 39 63 38 65 47 57 49 55 53 52 54 49 52 47 53 48 54 46 57 52 60 50 66 44 67 44 68 48 68 48 70 45 71 45 69 42 70 40 78 36 78 38 79 39 84 33 97 16 112 9 121 5 128 7 129 7 134 15 147 17 155 17 165 21 184 20 198 17 202 20 206 19 220 15 236 16 243 32 252 40 259 44 269 51 279 56 294 63 305 87 317 108 320 109 323 113 324 115 327 122 330Z';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'light';
}

const SUN_RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

const Logo: React.FC<LogoProps> = ({ className, variant = 'color' }) => {
  const light = variant === 'light';
  const badge = light ? '#eef4ff' : '#14398d';
  const island = light ? '#bbd2fd' : '#3272de';
  const face = light ? '#eef4ff' : '#14398d';
  return (
    <svg
      viewBox="0 0 250 250"
      role="img"
      aria-label="BetterMarinduque logo"
      className={className}
    >
      <rect x="4" y="4" width="242" height="242" rx="72" fill={badge} />
      <g transform="translate(15 25) scale(0.45)">
        <path fill={island} d={ISLAND_PATH} />
      </g>
      <g transform="translate(62 62)" fill="#d83c3c">
        <circle r="15" />
        {SUN_RAYS.map(deg => (
          <path
            key={deg}
            transform={`rotate(${deg})`}
            d="M0 -32 L4.5 -20 L-4.5 -20 Z"
          />
        ))}
      </g>
      <path fill="#d83c3c" d="M142 88 Q148 38 196 26 Q170 48 160 90 Z" />
      <path fill="#e5b52a" d="M146 86 Q160 42 208 36 Q176 54 164 90 Z" />
      <path fill="#eef4ff" d="M150 84 Q170 50 216 52 Q182 62 168 90 Z" />
      <path
        fill="#e5b52a"
        d="M88 150 A52 58 0 0 1 192 150 L192 154 L88 154 Z"
      />
      <path
        fill="#c99a14"
        d="M140 96 A52 58 0 0 1 192 150 L192 154 L140 154 Z"
        opacity="0.35"
      />
      <path
        fill="#e5b52a"
        d="M70 156 Q140 192 210 156 Q203 144 140 140 Q77 144 70 156 Z"
      />
      <path fill="#e5b52a" d="M96 158 L124 160 L120 196 L94 188 Z" />
      <path fill="#e5b52a" d="M156 160 L184 158 L186 188 L160 196 Z" />
      <path fill={face} d="M126 192 L126 170 A14 14 0 0 1 154 170 L154 192 Z" />
    </svg>
  );
};

export default Logo;
