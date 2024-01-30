import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const CategoryForm = () => {
  const top100Films = [{ label: "Vegetarian" }, { label: "Non Vegetarian" }];
  return (
    <div>
      <div className="flex flex-column justify-start items-center p-4">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Create New Category!</h2>
            <TextField
              required
              id="standard-basic"
              label="name"
              variant="standard"
            />
            <div className="card-actions justify-end">
              <button className="btn btn-warning">Done</button>
            </div>
          </div>
        </div>
        {/* end of create category name*/}

        <div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Update Category Name!</h2>
              <div className="flex justify-between items-center">
                <div></div>
                <div>
                  <TextField
                    required
                    id="standard-basic"
                    label="name"
                    variant="standard"
                  />
                </div>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-warning">Done</button>
              </div>
            </div>
          </div>
        </div>
        {/* end of update category name*/}
      </div>
    </div>
  );
};

export default CategoryForm;
