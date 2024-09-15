/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalStyle } from "styles/global-styles";

import AddTask from "./pages/AddTask/Loadable";
import { NotFoundPage } from "./pages/NotFoundPage/Loadable";
import TasksPage from "./pages/Tasks/Loadable";
import SetupAccountPage from "./pages/SetupAccount/Loadable";
import LoadingOverlay from "react-loading-overlay-ts";
import { RootState, useSelector } from "./store";

export function App() {
  const isLoading = useSelector((state: RootState) => state.taskStore.isLoading);

  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Wallet" defaultTitle="React Wallet APP">
        <meta name="description" content="Wallet Transactions" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
      </Helmet>
      <LoadingOverlay active={isLoading} spinner text="Loading your content...">
        <Routes>
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:taskId" element={<AddTask />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/" element={<SetupAccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LoadingOverlay>
      <GlobalStyle />
    </BrowserRouter>
  );
}
