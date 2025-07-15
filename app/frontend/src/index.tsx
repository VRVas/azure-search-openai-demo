import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import { initializeIcons } from "@fluentui/react";

import "./index.css";
import "./arabic-support.css";

import Chat from "./pages/chat/Chat";
import LayoutWrapper from "./layoutWrapper";
import i18next from "./i18n/config";

initializeIcons();

const router = createHashRouter([
    {
        path: "/",
        element: <LayoutWrapper />,
        children: [
            {
                index: true,
                element: <Chat />
            },
            {
                path: "qa",
                lazy: () => import("./pages/ask/Ask")
            },
            {
                path: "*",
                lazy: () => import("./pages/NoPage")
            }
        ]
    }
]);

// Helper to determine the direction based on language
const getDirection = (lng: string) => (lng === "ar" ? "rtl" : "ltr");

function AppRoot() {
    // This makes sure direction updates if the language is switched at runtime
    const [dir, setDir] = React.useState(getDirection(i18next.language));

    React.useEffect(() => {
        const handleLangChange = (lng: string) => setDir(getDirection(lng));
        i18next.on("languageChanged", handleLangChange);
        return () => {
            i18next.off("languageChanged", handleLangChange);
        };
    }, []);

    // Optionally, also set <body> dir for full page styling
    React.useEffect(() => {
        document.body.dir = dir;
    }, [dir]);

    return (
        <div dir={dir} style={{ minHeight: "100vh" }}>
            <I18nextProvider i18n={i18next}>
                <HelmetProvider>
                    <RouterProvider router={router} />
                </HelmetProvider>
            </I18nextProvider>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AppRoot />
    </React.StrictMode>
);
