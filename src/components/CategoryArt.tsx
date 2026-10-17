import { useId } from "react";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Ellipse,
  G,
  Path,
  Rect,
  Circle,
} from "react-native-svg";
import { CategoryId } from "../types";

/** Original, scalable illustrations with shaded volume; no emoji or remote icon dependency. */
export function CategoryArt({
  kind,
  size = 100,
}: {
  kind: CategoryId;
  size?: number;
}) {
  const id = useId().replace(/:/g, "");
  const fill = (name: string) => `url(#${id}${name})`;
  return (
    <Svg pointerEvents="none" width={size} height={size} viewBox="0 0 160 150">
      <Defs>
        {[
          ["bun", "#FFDB8B", "#C96E22"],
          ["red", "#FF6470", "#CC1831"],
          ["green", "#B5D779", "#478747"],
          ["gold", "#FFDB66", "#E8A425"],
          ["cream", "#FFFFFF", "#DCD9DC"],
          ["purple", "#BCA3EE", "#7550AF"],
          ["brown", "#AA6135", "#512B1B"],
        ].map(([name, a, b]) => (
          <LinearGradient
            key={name}
            id={`${id}${name}`}
            x1="0"
            y1="0"
            x2=".7"
            y2="1"
          >
            <Stop offset="0" stopColor={a} />
            <Stop offset="1" stopColor={b} />
          </LinearGradient>
        ))}
      </Defs>
      <Ellipse cx="82" cy="133" rx="53" ry="7" fill="#29211D" opacity=".10" />
      {kind === "restaurants" && (
        <G transform="rotate(-9 80 80)">
          <Path
            d="M29 107 Q79 95 133 108 L130 118 Q81 140 34 118Z"
            fill={fill("bun")}
          />
          <Rect
            x="27"
            y="92"
            width="108"
            height="20"
            rx="10"
            fill={fill("brown")}
          />
          <Path
            d="M25 90L43 80 65 86 89 79 115 86 139 82 130 98 111 102 94 96 78 104 58 95 39 102Z"
            fill={fill("green")}
          />
          <Path d="M34 77L127 72 119 91 88 83 61 96Z" fill={fill("gold")} />
          <Rect
            x="29"
            y="69"
            width="104"
            height="13"
            rx="6"
            fill={fill("red")}
          />
          <Path d="M26 67C28 6 130 6 137 67Q87 83 26 67Z" fill={fill("bun")} />
          <Path
            d="M39 49C51 24 101 20 120 45"
            stroke="#FFE4A4"
            strokeWidth="4"
            opacity=".6"
            fill="none"
          />
          {[
            [53, 45],
            [73, 34],
            [96, 39],
            [111, 53],
            [81, 56],
            [48, 59],
          ].map(([x, y], i) => (
            <Ellipse
              key={i}
              cx={x}
              cy={y}
              rx="3"
              ry="1.5"
              transform={`rotate(-25 ${x} ${y})`}
              fill="#FFF2CE"
            />
          ))}
        </G>
      )}
      {kind === "market" && (
        <G transform="rotate(8 80 80)">
          <Path d="M35 55L44 23 60 20 70 63" fill={fill("cream")} />
          <Path d="M45 22L57 20 58 30 43 32" fill={fill("red")} />
          <Path d="M81 72Q63 11 82 15Q94 17 99 71" fill={fill("bun")} />
          <Path d="M78 31L89 28M81 45L94 41" stroke="#C48B48" strokeWidth="3" />
          <Circle cx="110" cy="49" r="20" fill={fill("green")} />
          <Circle cx="126" cy="38" r="12" fill={fill("green")} />
          <Circle cx="115" cy="26" r="13" fill={fill("green")} />
          <Circle cx="57" cy="65" r="17" fill={fill("red")} />
          <Circle cx="86" cy="61" r="17" fill={fill("gold")} />
          <Path d="M26 69L139 62 123 123Q78 138 43 120Z" fill={fill("red")} />
          <Path
            d="M28 70L139 63"
            stroke="#FF8691"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <Path
            d="M52 86L58 111M77 83L80 116M102 80L100 113M125 77L117 107"
            stroke="#AA172A"
            strokeWidth="7"
            strokeLinecap="round"
            opacity=".6"
          />
          <Path
            d="M49 70Q77 10 119 64"
            fill="none"
            stroke="#C62035"
            strokeWidth="8"
          />
        </G>
      )}
      {kind === "pharmacy" && (
        <G transform="rotate(-12 80 80)">
          <Rect
            x="45"
            y="35"
            width="43"
            height="25"
            rx="8"
            fill="none"
            stroke="#D62942"
            strokeWidth="8"
          />
          <Rect
            x="26"
            y="51"
            width="87"
            height="73"
            rx="15"
            fill={fill("red")}
          />
          <Rect
            x="38"
            y="57"
            width="6"
            height="58"
            rx="3"
            fill="#FF8B94"
            opacity=".6"
          />
          <Path
            d="M60 68H79V83H94V101H79V116H60V101H45V83H60Z"
            fill={fill("cream")}
          />
          <Rect
            x="113"
            y="70"
            width="23"
            height="60"
            rx="10"
            fill={fill("cream")}
          />
          <Path d="M113 80Q124 70 136 80V101H113Z" fill={fill("gold")} />
          <Rect
            x="112"
            y="67"
            width="25"
            height="11"
            rx="3"
            fill={fill("red")}
          />
        </G>
      )}
      {kind === "drinks" && (
        <G transform="rotate(8 80 80)">
          <Path
            d="M40 19H59V50Q70 59 70 75V123Q54 138 30 122V75Q31 57 41 49Z"
            fill={fill("brown")}
          />
          <Rect
            x="38"
            y="16"
            width="25"
            height="12"
            rx="4"
            fill={fill("gold")}
          />
          <Path d="M31 79H70V108H31Z" fill={fill("red")} />
          <Circle cx="51" cy="94" r="10" fill="#FFF4DE" />
          <Path d="M80 59H134L125 128Q105 138 86 126Z" fill={fill("gold")} />
          <Ellipse cx="107" cy="60" rx="27" ry="8" fill="#FFF2B9" />
          <Path
            d="M113 82L122 28 138 21"
            fill="none"
            stroke="#F77464"
            strokeWidth="5"
          />
          <Rect
            x="90"
            y="70"
            width="7"
            height="45"
            rx="3"
            fill="#FFF1B2"
            opacity=".6"
          />
        </G>
      )}
      {kind === "shopping" && (
        <G transform="rotate(-9 80 80)">
          <Path d="M35 57L110 48 124 128 30 128Z" fill={fill("purple")} />
          <Path
            d="M52 61V39Q70 11 92 38V57"
            fill="none"
            stroke="#7853AA"
            strokeWidth="7"
          />
          <Path d="M81 73L134 80 130 135 79 128Z" fill={fill("red")} />
          <Path
            d="M93 80Q93 42 120 57L124 83"
            fill="none"
            stroke="#F64B60"
            strokeWidth="6"
          />
          <Path
            d="M47 69L43 113"
            stroke="#D6C4F4"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <Path d="M96 106Q109 90 121 107Q116 122 106 123Z" fill="#FFE3E6" />
        </G>
      )}
      {kind === "pets" && (
        <G>
          <Path
            d="M38 87Q32 26 53 36L71 47Q92 35 111 49L131 31Q142 63 130 94Z"
            fill={fill("bun")}
          />
          <Path d="M44 61L49 44 66 56M115 55L127 43 130 67" fill="#D58C66" />
          <Circle cx="69" cy="68" r="5" fill="#513729" />
          <Circle cx="111" cy="68" r="5" fill="#513729" />
          <Ellipse cx="89" cy="84" rx="11" ry="8" fill="#513729" />
          <Path d="M27 90H142L127 131Q82 147 41 127Z" fill={fill("gold")} />
          <Ellipse cx="85" cy="91" rx="57" ry="9" fill="#D7992E" />
          <Ellipse cx="84" cy="119" rx="10" ry="8" fill="#FFF1BF" />
          <Circle cx="72" cy="107" r="4" fill="#FFF1BF" />
          <Circle cx="84" cy="104" r="4" fill="#FFF1BF" />
          <Circle cx="96" cy="107" r="4" fill="#FFF1BF" />
        </G>
      )}
    </Svg>
  );
}
