import { useEffect, useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material';
import ProductReviewCard from './ProductReviewCard';
import { men_kurta } from '../../../Data/men_kurta';
import ProductCard from '../Product/ProductCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../../State/Product/Action';
import { addItemToCart } from '../../../State/Cart/Action';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const [selectedSize, setSelectedSize] = useState(null);

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const { products } = useSelector(store => store);

    const handleAddToCart = () => {
        const data = {
            productId: params.productId,
            size: selectedSize.name
        }
        dispatch(addItemToCart(data));
        navigate('/cart');
    };

    useEffect(() => {
        const data = {
            productId: params.productId,
        }
        dispatch(findProductsById(data));
    }, [params.productId]);

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
                            <a href={""} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {/* {products?.product?.data?.brand} */}
                                To do: Men/Clothing/Men Kurta
                            </a>
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
                                    <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                                    <p className="opacity-50 text-sm">56540 Ratings</p>
                                    <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">3870 Reviews</p>
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
                    <h1 className='font-semibold text-lg pb-4'>Recent Review & Rating</h1>
                    <div className='border p-5'>
                        <Grid container spacing={7}>
                            <Grid item xs={7}>
                                <div className='space-y-5'>
                                    {[1, 1, 1, 1].map((item, index) => <ProductReviewCard key={index} />)}

                                </div>
                            </Grid>
                            <Grid item xs={5}>
                                <h1 className='text-xl font-semibold pb-2'>Product Ratings</h1>
                                <div className='flex items-center space-x-3'>
                                    <Rating name="read-only" value={4.6} precision={0.5} readOnly />
                                    <p className='opacity-60'>54890 Ratings</p>
                                </div>
                                <Box className='mt-5 space-y-3'>
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p className=''>Excellent</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress variant='determinate' value={40} sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7, '& .MuiLinearProgress-bar': { backgroundColor: '#4CAF50' } }} />
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Very Good</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress variant='determinate' value={30} sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7, '& .MuiLinearProgress-bar': { backgroundColor: '#8BC34A' } }} />
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Good</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress variant='determinate' value={25} sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7, '& .MuiLinearProgress-bar': { backgroundColor: '#FFD700' } }} />
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Average</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress variant='determinate' value={20} sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7, '& .MuiLinearProgress-bar': { backgroundColor: '#FF9800' } }} />
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Poor</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress variant='determinate' value={10} sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7, '& .MuiLinearProgress-bar': { backgroundColor: '#F44336' } }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </section>

                {/* Similar products */}
                <section className='pt-10'>
                    <h1 className='font-bold text-xl py-5'>Similar Products</h1>
                    <div className='flex flex-wrap space-y-5'>
                        {
                            men_kurta.map((item, index) => {
                                return <ProductCard product={item} key={index} />;
                            })
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}
