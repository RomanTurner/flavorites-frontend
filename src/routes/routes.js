import NotFoundPage from "./NotFoundPage";
import PlanShow from "../features/plans/PlanShow";
import PlansIndex from "../features/plans/PlansIndex";
import Dashboard from "../features/session/Dashboard";
import RecipeShow from "../features/recipes/RecipeShow";
import RecipesIndex from "../features/recipes/RecipeIndex";
import UserPlansShow from "../features/user-plans/UserPlansShow";
import UserPlansExcerpt from "../features/user-plans/UserPlansExcerpt";

export const routes = [
  {
    path: "/meal_plans/:id",
    component: PlanShow,
  },
  {
    path: "/meal_plans",
    component: PlansIndex,
  },
  {
    path: "/user_plans/:id",
    component: UserPlansShow,
  },
  {
    path: "/user_plans",
    component: UserPlansExcerpt,
  },
  {
    path: "/recipes/:id",
    component: RecipeShow,
  },
  {
    path: "/recipes",
    component: RecipesIndex,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];
