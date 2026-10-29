import { motion as Motion } from 'motion/react';

// All character colors in one place, so they are easy to change.
const colors = {
  skin: '#c68863',
  skinShade: '#a9704f',
  hair: '#1a1410',
  hoodie: '#2d2e36',
  sleeve: '#383943',
  collar: '#23242a',
  frame: '#101012',
  lime: '#b6f23a',
};

function WavingCharacter({ className = '' }) {
  return (
    <div className={`relative mx-auto w-full max-w-[420px] ${className}`}>
      {/* Gentle floating. Motion turns this off when reduced motion is requested. */}
      <Motion.div
        className="relative"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          viewBox="0 0 400 440"
          role="img"
          aria-label="Cartoon illustration of Akshay, a friendly developer with glasses and a hoodie, waving hello"
          className="block h-auto w-full"
        >
          {/* Backdrop circle and dashed ring */}
          <circle
            cx="200"
            cy="235"
            r="175"
            fill="#131316"
            stroke="#26262b"
            strokeWidth="2"
          />
          <circle
            cx="200"
            cy="235"
            r="190"
            fill="none"
            stroke="#26262b"
            strokeWidth="1.5"
            strokeDasharray="4 10"
            strokeLinecap="round"
          />

          {/* Neck */}
          <rect
            x="181"
            y="246"
            width="38"
            height="68"
            rx="10"
            fill={colors.skinShade}
          />

          {/* Body (hoodie) */}
          <path
            d="M92 440 C92 352 124 304 200 304 C276 304 308 352 308 440 Z"
            fill={colors.hoodie}
          />

          {/* Hood collar, drawstrings and code symbol */}
          <ellipse cx="200" cy="308" rx="54" ry="20" fill={colors.collar} />
          <path
            d="M186 322 C184 340 186 352 185 366"
            fill="none"
            stroke={colors.lime}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M214 322 C216 340 214 352 215 366"
            fill="none"
            stroke={colors.lime}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="185" cy="369" r="4" fill={colors.lime} />
          <circle cx="215" cy="369" r="4" fill={colors.lime} />
          <text
            x="200"
            y="408"
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
            fontSize="26"
            fontWeight="700"
            fill={colors.lime}
          >
            {'</>'}
          </text>

          {/* Resting arm (left side of the picture) */}
          <path
            d="M132 340 C112 376 106 410 108 450"
            fill="none"
            stroke={colors.sleeve}
            strokeWidth="44"
            strokeLinecap="round"
          />

          {/* Raised arm: upper arm stays still */}
          <path
            d="M268 342 L322 378"
            fill="none"
            stroke={colors.sleeve}
            strokeWidth="44"
            strokeLinecap="round"
          />

          {/* Raised arm: forearm and hand wave around the elbow */}
          <g className="wave-forearm">
            {/* Fingers */}
            <rect
              x="316"
              y="208"
              width="10"
              height="40"
              rx="5"
              transform="rotate(-6 321 248)"
              fill={colors.skin}
              stroke={colors.skinShade}
              strokeWidth="1.5"
            />
            <rect
              x="327"
              y="202"
              width="10"
              height="44"
              rx="5"
              fill={colors.skin}
              stroke={colors.skinShade}
              strokeWidth="1.5"
            />
            <rect
              x="338"
              y="206"
              width="10"
              height="40"
              rx="5"
              fill={colors.skin}
              stroke={colors.skinShade}
              strokeWidth="1.5"
            />
            <rect
              x="349"
              y="216"
              width="9"
              height="34"
              rx="4.5"
              transform="rotate(8 353 250)"
              fill={colors.skin}
              stroke={colors.skinShade}
              strokeWidth="1.5"
            />
            {/* Thumb */}
            <ellipse
              cx="312"
              cy="256"
              rx="8"
              ry="15"
              transform="rotate(-30 312 256)"
              fill={colors.skin}
              stroke={colors.skinShade}
              strokeWidth="1.5"
            />
            {/* Palm (drawn last so it hides the finger bottoms) */}
            <ellipse cx="334" cy="254" rx="21" ry="24" fill={colors.skin} />
            {/* Sleeve and cuff */}
            <path
              d="M322 378 L333 284"
              fill="none"
              stroke={colors.sleeve}
              strokeWidth="40"
            />
            <path
              d="M314 282 L352 286"
              fill="none"
              stroke={colors.collar}
              strokeWidth="12"
            />
          </g>

          {/* Ears */}
          <circle cx="130" cy="194" r="13" fill={colors.skin} />
          <circle cx="130" cy="194" r="6" fill={colors.skinShade} />
          <circle cx="270" cy="194" r="13" fill={colors.skin} />
          <circle cx="270" cy="194" r="6" fill={colors.skinShade} />

          {/* Chin shadow on the neck, then the head */}
          <ellipse
            cx="200"
            cy="268"
            rx="34"
            ry="11"
            fill="#8f5a3d"
            opacity="0.5"
          />
          <ellipse cx="200" cy="190" rx="70" ry="76" fill={colors.skin} />

          {/* Hair */}
          <path
            d="M129 178 C121 118 158 94 202 94 C248 94 281 120 271 178 C262 150 244 138 220 132 C196 142 160 142 140 162 C135 167 131 172 129 178 Z"
            fill={colors.hair}
          />

          {/* Cheeks */}
          <ellipse
            cx="150"
            cy="216"
            rx="10"
            ry="6"
            fill="#e08a6b"
            opacity="0.35"
          />
          <ellipse
            cx="250"
            cy="216"
            rx="10"
            ry="6"
            fill="#e08a6b"
            opacity="0.35"
          />

          {/* Eyebrows */}
          <path
            d="M155 163 Q171 155 187 162"
            fill="none"
            stroke={colors.hair}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M213 162 Q229 155 245 163"
            fill="none"
            stroke={colors.hair}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Eyes (blink together) */}
          <g className="blink-eyes">
            <ellipse cx="172" cy="192" rx="9" ry="10.5" fill="#ffffff" />
            <circle cx="173" cy="194" r="6" fill={colors.hair} />
            <circle cx="175" cy="191.5" r="2" fill="#ffffff" />
            <ellipse cx="228" cy="192" rx="9" ry="10.5" fill="#ffffff" />
            <circle cx="229" cy="194" r="6" fill={colors.hair} />
            <circle cx="231" cy="191.5" r="2" fill="#ffffff" />
          </g>

          {/* Glasses */}
          <circle
            cx="172"
            cy="192"
            r="17"
            fill="#ffffff"
            fillOpacity="0.08"
            stroke={colors.frame}
            strokeWidth="3.5"
          />
          <circle
            cx="228"
            cy="192"
            r="17"
            fill="#ffffff"
            fillOpacity="0.08"
            stroke={colors.frame}
            strokeWidth="3.5"
          />
          <path
            d="M189 190 Q200 184 211 190"
            fill="none"
            stroke={colors.frame}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M155 190 L131 189"
            fill="none"
            stroke={colors.frame}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M245 190 L269 189"
            fill="none"
            stroke={colors.frame}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Nose and smile */}
          <path
            d="M200 203 Q194 214 202 214"
            fill="none"
            stroke={colors.skinShade}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M178 226 Q200 247 222 226"
            fill="none"
            stroke="#3b1a16"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        {/* Speech bubble */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.8,
            type: 'spring',
            stiffness: 260,
            damping: 18,
          }}
          className="absolute left-0 top-2 origin-bottom-right rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-lg sm:left-2 sm:text-base"
        >
          Hi! <span aria-hidden="true">👋</span> I'm Akshay.
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 bg-white"
          />
        </Motion.div>
      </Motion.div>
    </div>
  );
}

export default WavingCharacter;
