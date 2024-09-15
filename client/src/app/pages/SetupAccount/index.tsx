import React from "react";
import { Helmet } from "react-helmet-async";
import { NavBar } from "app/components/NavBar";
import SetupAccount from "./SetupAccount";
import { PageWrapper } from "app/components/PageWrapper";

export function SetupAccountPage() {
  return (
    <>
      <Helmet>
        <title>Setup Initial Account</title>
        <meta name="description" content="Setup Initial Account" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <SetupAccount />
      </PageWrapper>
    </>
  );
}
