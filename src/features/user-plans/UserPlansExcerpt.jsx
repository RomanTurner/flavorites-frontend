import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePlan } from "./planFetches";

const UserPlanExcerpt = ({ title, id }) => {
 
  const dispatch = useDispatch();
  const deleteMealPlanStatus = useSelector(state => state.userPlans.deleteMealPlanStatus)
  const error = useSelector((state) => state.userPlans.error);
    

  const handleDelete = () => {
    dispatch(deletePlan(+id));
  };

  
 let content;
 if (deleteMealPlanStatus === "loading") {
   content = <button disabled>Delete</button>;
 } else if (deleteMealPlanStatus === "idle") {
   content = <button onClick={() => handleDelete()}>Delete</button>;
 } else if (deleteMealPlanStatus === "error") {
   content = (
     <div>
       <button onClick={() => handleDelete()}>Delete</button>
       {error}
     </div>
   );
 }
  
  return (
    <div>
      <Link to={`/user_plans/${id}`}>{title}</Link>
      {content}
    </div>
  );
};

export default UserPlanExcerpt;
