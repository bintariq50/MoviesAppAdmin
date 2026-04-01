import * as React from "react";
import Svg, { Path } from "react-native-svg";
const EmojiSad = (props) => (
  <Svg
    width={88}
    height={88}
    viewBox="0 0 88 88"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M32.9999 80.6667H54.9999C73.3332 80.6667 80.6666 73.3333 80.6666 55V33C80.6666 14.6667 73.3332 7.33334 54.9999 7.33334H32.9999C14.6666 7.33334 7.33325 14.6667 7.33325 33V55C7.33325 73.3333 14.6666 80.6667 32.9999 80.6667Z"
      stroke={props.strokeColor}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M25.6667 32.0833C29.3334 28.4167 35.3101 28.4167 39.0134 32.0833"
      stroke={props.strokeColor}
      strokeWidth={3}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M48.9868 32.0833C52.6535 28.4167 58.6301 28.4167 62.3335 32.0833"
      stroke={props.strokeColor}
      strokeWidth={3}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M30.8 64.9001H57.2C59.0333 64.9001 60.5 63.4334 60.5 61.6C60.5 52.47 53.13 45.1 44 45.1C34.87 45.1 27.5 52.47 27.5 61.6C27.5 63.4334 28.9667 64.9001 30.8 64.9001Z"
      stroke={props.strokeColor}
      strokeWidth={3}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EmojiSad;
