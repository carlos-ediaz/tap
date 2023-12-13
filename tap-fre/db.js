import { initializeApp } from "firebase/app";

import Constants from "expo-constants";

export const fdb = initializeApp(Constants.manifest.web.config.firebase);
