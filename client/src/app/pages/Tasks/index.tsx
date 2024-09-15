import React from "react";
import { Helmet } from "react-helmet-async";
import { NavBar } from "app/components/NavBar";
import Tasks from "./Tasks";
import { PageWrapper } from "app/components/PageWrapper";

export function TasksPage() {
  return (
    <>
      <Helmet>
        <title>Tasks Page</title>
        <meta name="description" content="Add a transaction" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Tasks />
      </PageWrapper>
    </>
  );
}
