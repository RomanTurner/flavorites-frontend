import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePlan } from "../plans/planFetches";

const PlanExcerpt = ({ title, id }) => {
 
  const dispatch = useDispatch();
  const deleteStatus = useSelector(state => state.plans.deleteStatus)
  const error = useSelector((state) => state.plans.error);
  const handleDelete = () => {
    dispatch(deletePlan(+id));
  };

  
 let content;
 if (deleteStatus === "loading") {
   content = <button disabled>Delete</button>;
 } else if (deleteStatus === "idle") {
   content = <button onClick={() => handleDelete()}>Delete</button>;
 } else if (deleteStatus === "error") {
   content = (
     <div>
       <button onClick={() => handleDelete()}>Delete</button>
       {error}
     </div>
   );
 }
  
  return (
    <div>
      <Link to={`/meal_plans/${id}`}>{title}</Link>
      {sessionStorage.getItem("current") === "dashboard" && content}
    </div>
  );
};

export default PlanExcerpt;
