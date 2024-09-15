import React from "react";
import { Helmet } from "react-helmet-async";
import { NavBar } from "app/components/NavBar";
import Task from "./TaskForm";
import { PageWrapper } from "app/components/PageWrapper";

export function AddTransactionPage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Add a transaction" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Task />
      </PageWrapper>
    </>
  );
}
