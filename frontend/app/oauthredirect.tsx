import { Redirect } from "expo-router";
import React from "react";

export default function oauthredirect() {
  return <Redirect href="/HomeScreen" />;
}