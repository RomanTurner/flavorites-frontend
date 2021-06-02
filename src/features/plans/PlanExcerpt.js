import React from "react";
import { Link } from "react-router-dom";

const PlanExcerpt = ({ title, id }) => {
 
  return (
    <div>
      <Link to={`/meal_plans/${id}`}>{title}</Link>
    </div>
  );
};

export default PlanExcerpt;
