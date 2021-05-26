import React from "react"
import { Link } from "react-router-dom"

const RecipeExcerpt = ({title, id}) => {
    return (
        <div>
            <Link to={`/recipes/${id}`}>{title}</Link>
        </div>
    );
}

export default RecipeExcerpt; 
