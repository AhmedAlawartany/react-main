import * as pages from "pages";
import { AuthLayout } from "layout";
import { isEmpty, get, includes, find } from "lodash";

const pageRoutes = {
  dashboard: {
    Page: pages.Home,
    Layout: AuthLayout,
  },
  signin: {
    Page: pages.Signin,
    Layout: AuthLayout,
  },
  //   "404": {
  //     Page: pages.NotFound,
  //     Layout: AuthLayout,
  //   },
  //   loading: {
  //     Page: pages.Loading,
  //     Layout: DashboardLayout,
  //   },
};

const pageStructure = (route: any): any => {
  if (isEmpty(route)) {
    return "loading...";
  }

  const routePaths = Object.keys(get(route, "meta.params", {}));

  const pageRoute =
    find(routePaths.reverse(), (route: string) =>
      includes(Object.keys(pageRoutes), route)
    ) || "404";

  return pageRoutes[pageRoute as keyof typeof pageRoutes];
};

export default pageStructure;
