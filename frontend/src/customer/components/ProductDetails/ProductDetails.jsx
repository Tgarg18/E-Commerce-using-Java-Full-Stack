import { useEffect, useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material';
import ProductReviewCard from './ProductReviewCard';
import { men_kurta } from '../../../Data/men_kurta';
import ProductCard from '../Product/ProductCard';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts, findProductsById } from '../../../State/Product/Action';
import { addItemToCart } from '../../../State/Cart/Action';
import { toast } from "react-toastify";
import ProductModal from './ProductModal';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const [selectedSize, setSelectedSize] = useState(null);
    const [openProductModal, setOpenProductModal] = useState(false);

    const params = useParams();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleOpen = () => {
        setOpenProductModal(true);
    };
    const handleClose = () => {
        setOpenProductModal(false);
    };

    const formatCategory = (str) => {
        if (!str) return "";
        return str
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    const { products } = useSelector(store => store);

    const handleAddToCart = () => {
        if (selectedSize == null) {
            toast.error("Please select a size!");
            return;
        }
        const data = {
            productId: params.productId,
            size: selectedSize.name
        }
        dispatch(addItemToCart(data));
        toast.success("Product added to cart successfully!");
    };

    useEffect(() => {
        const data = {
            productId: params.productId,
        }
        dispatch(findProductsById(data));
    }, [params.productId]);

    useEffect(() => {
        const decodedQueryString = decodeURIComponent(location.search);

        const searchParams = new URLSearchParams(decodedQueryString);
        const priceValue = searchParams.get('price');
        const discountValue = searchParams.get('discount');
        const sortValue = searchParams.get('sort');
        const pageNumber = searchParams.get('page') || 1;
        const stock = searchParams.get('stock');
        const [minPrice, maxPrice] = priceValue === null ? [0, 1000000] : priceValue.split('-').map(Number);

        const data = {
            category: products?.product?.data?.category?.name,
            colors: [],
            sizes: [],
            minPrice,
            maxPrice,
            minDiscount: discountValue || 0,
            sort: sortValue || 'price_low',
            pageNumber: pageNumber - 1,
            pageSize: 30,
            stock: stock,
        }

        dispatch(findProducts(data));

    }, [products?.product?.data?.category?.id]);

    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {products?.product?.data?.breadcrumbs?.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb?.name}
                                    </a>
                                    <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <span aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {formatCategory(products?.product?.data?.category?.parentCategory?.parentCategory?.name)}
                                {products?.product?.data?.category?.parentCategory?.name && " / "}
                                {formatCategory(products?.product?.data?.category?.parentCategory?.name)}
                                {products?.product?.data?.category?.name && " / "}
                                {formatCategory(products?.product?.data?.category?.name)}
                            </span>
                        </li>
                    </ol>
                </nav>
                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
                    {/* Image gallery */}
                    <div className="flex flex-col items-center">
                        <img
                            draggable={false}
                            alt={products?.product?.data?.imageUrl}
                            src={products?.product?.data?.imageUrl}
                            className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem] h-full w-full object-cover object-center"
                        />
                        <div className="flex justify-center space-x-5 flex-wrap w-full ">
                            {products?.product?.data?.images?.map((item, index) => <img
                                draggable={false}
                                alt={item.alt}
                                key={index}
                                src={item.src}
                                className="overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] h-full w-full mt-4 object-cover object-center"
                            />)}
                        </div>
                    </div>
                    {/* Product info */}
                    <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
                        <div className="lg:col-span-2">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{products.product?.data?.brand}</h1>
                            <h1 className='text-lg lg:text-xltext-gray-900 opacity-60 pt-1'>
                                {products.product?.data?.title}
                            </h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
                                <p className='font-semibold'>₹{products.product?.data?.discountedPrice}</p>
                                <p className='line-through opacity-50'>₹{products.product?.data?.price}</p>
                                <p className='text-green-600 font-semibold'>{products.product?.data?.discountPercent}% off</p>
                            </div>
                            {/* Reviews */}
                            <div className="mt-6">
                                <div className='flex items-center space-x-3'>
                                    {(() => {
                                        const ratingsArray = [
                                            ...(products?.product?.data?.ratings || []),
                                            ...(products?.product?.data?.reviews?.map(r => ({ rating: r.rating })) || [])
                                        ];
                                        const totalRatings = ratingsArray.length || 1;
                                        const averageRating = ratingsArray.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

                                        return (
                                            <>
                                                <Rating name="read-only" value={averageRating} precision={0.5} readOnly />
                                                <p className="opacity-50 text-sm">{ratingsArray.length} Ratings</p>
                                                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                    {products.product?.data?.reviews?.length || 0} Reviews
                                                </p>
                                            </>
                                        );
                                    })()}
                                </div>

                            </div>

                            <form className="mt-10">
                                {/* Sizes */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>

                                    </div>

                                    <fieldset aria-label="Choose a size" className="mt-4">
                                        <RadioGroup
                                            value={selectedSize}
                                            onChange={setSelectedSize}
                                            className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                        >
                                            {products?.product?.data?.sizes?.map((size) => (
                                                <Radio
                                                    key={size.name}
                                                    value={size}
                                                    disabled={size.quantity > 0 ? false : true}
                                                    className={classNames(
                                                        size.quantity > 0
                                                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                        'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                                                    )}
                                                >
                                                    <span>{size.name}</span>
                                                    {size.quantity > 0 ? (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                        />
                                                    ) : (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                        >
                                                            <svg
                                                                stroke="currentColor"
                                                                viewBox="0 0 100 100"
                                                                preserveAspectRatio="none"
                                                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                                                            >
                                                                <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    </fieldset>
                                </div>

                                <Button onClick={handleAddToCart} color='secondary' variant='contained' sx={{ px: '2rem', py: '1rem', bgcolor: "#9155fd", ":hover": { bgcolor: "#563295" }, mt: 5, width: '100%' }}>
                                    Add To Cart
                                </Button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="font-medium text-gray-900 py-2">{products?.product?.data?.description ? "Description" : ""}</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{products?.product?.data?.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">{products?.product?.data?.highlights ? "Highlights" : ""}</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {products?.product?.data?.highlights?.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">{products?.product?.data?.details ? "Details" : ""}</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{products?.product?.data?.details}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ratings and Reviews */}
                <section>
                    <div className='font-semibold text-lg mb-4 flex items-center gap-5'>
                        <h1>Recent Review & Rating</h1>
                        <Button onClick={() => {
                            handleOpen();
                            navigate(`/product/${products?.product?.data?.id}/addReview`);
                        }} color='secondary' variant='contained' sx={{ px: '2', py: '1', bgcolor: "#9155fd", ":hover": { bgcolor: "#563295" } }}>
                            Add Review
                        </Button>
                        <Button onClick={() => {
                            handleOpen();
                            navigate(`/product/${products?.product?.data?.id}/addRating`);
                        }} color='secondary' variant='contained' sx={{ px: '2', py: '1', bgcolor: "#9155fd", ":hover": { bgcolor: "#563295" } }}>
                            Add Rating
                        </Button>
                    </div>
                    <div className='border p-5'>
                        <Grid container spacing={7}>
                            <Grid item xs={7}>
                                <div className='space-y-5 h-full w-full'>
                                    {products?.product?.data?.reviews && products?.product?.data?.reviews?.length === 0 && <div className='flex items-center justify-center h-full w-full'><p className='font-semibold'>No Reviews on this Product.</p></div>}
                                    {products?.product?.data?.reviews && products?.product?.data?.reviews?.length > 0 && products?.product?.data?.reviews?.map((review, index) => (
                                        <ProductReviewCard key={index} review={review} />
                                    ))}
                                </div>
                            </Grid>
                            <Grid item xs={5}>
                                <h1 className='text-xl font-semibold pb-2'>Product Ratings</h1>
                                <div className='flex items-center space-x-3'>
                                    {/* Merge ratings from both ratings and reviews arrays */}
                                    {(() => {
                                        const ratingsArray = [
                                            ...(products?.product?.data?.ratings || []),
                                            ...(products?.product?.data?.reviews?.map(r => ({ rating: r.rating })) || [])
                                        ];
                                        const totalRatings = ratingsArray.length || 0;
                                        const averageRating = ratingsArray.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

                                        return (
                                            <>
                                                <Rating name="read-only" value={averageRating} precision={0.5} readOnly />
                                                <p className='opacity-60'>{totalRatings} Ratings</p>
                                            </>
                                        );
                                    })()}
                                </div>

                                {/* Rating Distribution */}
                                <Box className='mt-5 space-y-3'>
                                    {[
                                        { label: "Excellent", value: 5, color: "#4CAF50" },
                                        { label: "Very Good", value: 4, color: "#8BC34A" },
                                        { label: "Good", value: 3, color: "#FFD700" },
                                        { label: "Average", value: 2, color: "#FF9800" },
                                        { label: "Poor", value: 1, color: "#F44336" }
                                    ].map(({ label, value, color }) => {
                                        const ratingsArray = [
                                            ...(products?.product?.data?.ratings || []),
                                            ...(products?.product?.data?.reviews?.map(r => ({ rating: r.rating })) || [])
                                        ];
                                        const totalRatings = ratingsArray.length || 1;
                                        const count = ratingsArray.filter(r => r.rating === value).length || 0;
                                        const percentage = (count / totalRatings) * 100;

                                        return (
                                            <Grid container alignItems="center" gap={2} key={label}>
                                                <Grid item xs={2}>
                                                    <p>{label}</p>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <LinearProgress
                                                        variant='determinate'
                                                        value={percentage}
                                                        sx={{
                                                            bgcolor: '#d0d0d0',
                                                            borderRadius: 4,
                                                            height: 7,
                                                            '& .MuiLinearProgress-bar': { backgroundColor: color }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        );
                                    })}
                                </Box>
                            </Grid>
                        </Grid>

                    </div>
                    <ProductModal handleClose={handleClose} open={openProductModal} productId={products?.product?.data?.id} />
                </section>

                {/* Similar products */}
                <section className='pt-10'>
                    <h1 className='font-bold text-xl py-5'>Similar Products</h1>
                    <div className='flex flex-wrap space-y-5'>
                        {
                            products.products && products.products?.content?.map((item, index) => {
                                return <ProductCard product={item} key={index} />;
                            })
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}
