import React from "react";
import { useHistory } from "react-router-dom";


const RenderRecipe = ({ recipe }) => {
  const {
    id,
    author,
    title,
    description,
    metadata,
    main_img,
    keywords,
    ingriedients,
    instructions,
    instruction_imgs,
    tips,
  } = recipe;
    
    const history = useHistory();
    
    const handleClick = () => {
      history.goBack();
    };

  return (
      <div>
          <h1>{title}</h1>
          <div>
          {author}
          </div>
          <div>  
          <img src={main_img} alt={title} />
          </div>
          <div>{description}</div>
          <button onClick={()=> handleClick()}>Go Back</button>
    </div>
  );
};



export default RenderRecipe;
