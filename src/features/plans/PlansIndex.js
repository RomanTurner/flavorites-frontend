import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit"
import { selectAllPlans } from "./plansSlice";
import { fetchPlans } from "./planFetches";
import PlanExcerpt from "./PlanExcerpt";

const PlansIndex = () => {
  const dispatch = useDispatch();
  const plans = useSelector(selectAllPlans);
  const status = useSelector((state) => state.plans.status);
  const error = useSelector((state) => state.plans.error);

  useEffect(() => {
   if (status === "idle") {
      dispatch(fetchPlans());
    }
  }, [status, dispatch]);

  let content;
  if (status === "loading") {
    content = <div> Loading...</div>;
  } else if (status === "succeeded") {
    content = plans.map((plan) => <PlanExcerpt key={nanoid()} {...plan} />);
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className='posts-list'>
      <h2>Meal Plans</h2>
      {content}
    </section>
  );
};

export default PlansIndex;
