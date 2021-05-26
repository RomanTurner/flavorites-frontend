import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPlans, fetchPlans } from "./plansSlice";
import PlanExcerpt from "./PlanExcerpt";

const PlansList = () => {
  const dispatch = useDispatch();
  const plans = useSelector(selectAllPlans);
  const plansStatus = useSelector((state) => state.plans.status);
  const error = useSelector((state) => state.plans.error);

  useEffect(() => {
    if (plansStatus === "idle") {
      dispatch(fetchPlans());
    }
  }, [plansStatus, dispatch]);

  let content;
  if (plansStatus === "loading") {
    content = <div> Loading...</div>;
  } else if (plansStatus === "succeeded") {
    content = plans.map((plan) => (
      <PlanExcerpt key={plan.id} {...plan} />
    ));
  } else if (plansStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className='posts-list'>
      <h2>Meal Plans</h2>
      {content}
    </section>
  );
};

export default PlansList;
