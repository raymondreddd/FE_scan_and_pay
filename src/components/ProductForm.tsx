import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const ProductForm = () => {
  const top100Films = [{ label: "Vegetarian" }, { label: "Non Vegetarian" }];
  return (
    <div className="flex flex-column justify-center items-center p-4">
      {/* Name and quantity */}
      <div className="flex flex-row justify-between items-center p-4">
        <div>
          <TextField
            required
            id="standard-basic"
            label="name"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            required
            id="standard-basic"
            label="quantity"
            variant="standard"
          />
        </div>
      </div>

      {/* CP & SP */}
      <div className="flex flex-row justify-between items-center p-4">
        <div>
          <TextField
            required
            type="number"
            id="standard-basic"
            label="Cost Price"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            required
            type="number"
            id="standard-basic"
            label="Selling Price"
            variant="standard"
          />
        </div>
      </div>

      {/* Tag and category */}
      <div className="flex flex-row justify-between items-center p-4">
        <div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductForm;
