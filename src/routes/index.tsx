import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Page404 from "~/pages/Page404";

const lazyLoad = (Comp: React.LazyExoticComponent<React.ComponentType>) => {
  return (
    <Suspense fallback={<>加载中...</>}>
      <Comp />
    </Suspense>
  );
};
const HomeRoute = {
  path: "/",
  element: lazyLoad(React.lazy(() => import("~/App.tsx"))),
};
const ResetPasswordRoute = [
  {
    path: "/reset-password",
    element: lazyLoad(React.lazy(() => import("~/pages/RestPassword"))),
  },
  {
    path: "/reset-password-send-email",
    element: lazyLoad(React.lazy(() => import("~/pages/ResetPasswordMail"))),
  },
];

const routes = [
  HomeRoute,
  {
    path: "*",
    element: <Page404 />,
    icon: "logo",
  },
  ...ResetPasswordRoute,
];

const MYRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

export { MYRoutes, routes, HomeRoute };
