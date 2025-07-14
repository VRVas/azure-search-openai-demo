// import { Sparkle28Filled } from "@fluentui/react-icons";

// export const AnswerIcon = () => {
//     return <Sparkle28Filled primaryFill={"rgba(115, 118, 225, 1)"} aria-hidden="true" aria-label="Answer logo" />;
// };

import applogo from "../../assets/applogo.svg";

export const AnswerIcon = () => {
    return (
        <img
            src={applogo}
            aria-hidden="true"
            alt="Answer logo"
            style={{ width: 32, height: 32 }} // Optional: Adjust size as needed
        />
    );
};
