import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Icategory } from '@/types/categoryType';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { TProduct, TProductCreate } from '@/types/productType';

// call back
const createProduct = async (data: TProductCreate) => {
  console.log('name in createProductCB', name);
  await axios
    .post('http://localhost:3000/api/v1/products/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Response creating catgeory:', response.data);
    })
    .catch((error) => {
      console.log('ERROR creating catgeory:', error);
    });
};

const fetchCategories = async (): Promise<Icategory[]> => {
  const response = await (
    await fetch('http://localhost:3000/api/v1/products/category/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  console.log('Resonse fetch categories :', response);
  return response.content.data;
};

const fetchProducts = async (): Promise<TProduct[]> => {
  const response = await (
    await fetch('http://localhost:3000/api/v1/products/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  console.log('Response fetch products:', response);
  return response.content.data;
};

export function ProductForm() {
  const [createText, setCreateText] = useState('');
  const [cp, setCp] = useState(0.0);
  const [sp, setSp] = useState(0.0);
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  const [vegTagCreate, setVegTagCreate] = useState(false);

  const handleVegTagCreate = (event) => {
    const value = event.target.value;
    const isVeg: boolean = value === 'veg';
    setVegTagCreate(isVeg);
  };

  const handleCategoryAdd = (event) => {
    const value = event.target.value;
    console.log('category selected:', value, ' now catgory:', categoryId);
    setCategoryId(value);
  };

  // Tansatck query hooks
  const createProductMutation = useMutation({
    mutationFn: createProduct,
  });

  const {
    isPending: isPendingCategories,
    error: errorCategories,
    data: categories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10000,
    refetchOnMount: false,
  });

  const {
    isPending: isPendingProducts,
    error: errorProducts,
    data: products,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 10000,
    refetchOnMount: false,
  });

  if (createProductMutation.isPending) {
    return <div> Creating...</div>;
  }

  if (createProductMutation.error) {
    return (
      <div>
        Error in creating product: {createProductMutation.error.message}
      </div>
    );
  }

  if (isPendingCategories || isPendingProducts) return <>Loading</>;
  if (errorProducts || errorCategories) {
    return (
      <>
        {errorProducts && <div>Error in Products: {errorProducts.message}</div>}
        {errorCategories && (
          <div>Error in Categories: {errorCategories.message}</div>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col justify-between p-4">
      <div className="m-2">
        <Card className="w-6/7">
          <CardHeader>
            <CardTitle className="text-base">Create Product</CardTitle>
            <CardDescription>Fill the form.</CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                {/** NAME PRODUCT */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name of your project"
                    value={createText}
                    onChange={(e) => {
                      setCreateText(e.target.value);
                    }}
                    required
                  />
                </div>

                {/** cost price PRODUCT */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="costPrice">Cost Price</Label>
                  <Input
                    id="costPrice"
                    placeholder="Price in number. example: 90.67"
                    value={cp === '' ? '' : cp.toString()}
                    onChange={(e) => {
                      const parsedValue = parseFloat(e.target.value);
                      setCp(isNaN(parsedValue) ? '' : parsedValue);
                    }}
                    required
                  />
                </div>

                {/** SELLING PRICE PRODUCT */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="sellingPrice">Selling Price</Label>
                  <Input
                    id="sellingPrice"
                    placeholder="Price in number. example: 90.67"
                    value={sp}
                    onChange={(e) => {
                      setSp(parseFloat(e.target.value));
                    }}
                    required
                  />
                </div>

                {/** QUANTITY PRODCUT */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="costPrice">Quantity</Label>
                  <Input
                    id="costPrice"
                    placeholder="Price in number. example: 90.67"
                    value={quantity}
                    type="number"
                    onChange={(e) => {
                      setQuantity(parseInt(e.target.value));
                    }}
                    required
                  />
                </div>

                {/** CATEGORY PRODUCT */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="categoryId">Category</Label>
                  <Select>
                    <SelectTrigger id="categoryCreate">
                      <SelectValue placeholder="Click to Select" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          onClick={handleCategoryAdd}
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/** veg tag PRODUCT */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="isVeg">Tag</Label>
                  <RadioGroup defaultValue="veg">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="veg"
                        id="veg"
                        onClick={handleVegTagCreate}
                      />
                      <Label htmlFor="veg">Veg</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="non-veg"
                        id="non-veg"
                        onClick={handleVegTagCreate}
                      />
                      <Label htmlFor="Non-veg">Non-Veg</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() =>
                createProductMutation.mutate({
                  name: createText,
                  costPrice: cp,
                  sellingPrice: sp,
                  quantity: quantity,
                  isVeg: vegTagCreate,
                  categoryId: categoryId,
                })
              }
            >
              Done
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* end: CREATE prodcut */}

      <div className="m-2">
        <Card className="w-6/7">
          <CardHeader>
            <CardTitle>Update Product</CardTitle>
            <CardDescription>
              Select the product to update. Leave blank if youdon't want to
              update.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Select Product to Update</Label>
                  <Select>
                    <SelectTrigger id="productUpdate">
                      <SelectValue placeholder="Click to select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="New Name of Category" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Done</Button>
          </CardFooter>
        </Card>
      </div>
      {/* end: update category CATEGORY */}
    </div>
  );
}
