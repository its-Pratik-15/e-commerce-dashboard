import React from 'react';
import { Package, Tag, Banknote, ShoppingBag } from 'lucide-react';

const ProductDetails = ({ product }) => {
    if (!product) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center pb-6 border-b border-gray-200">
                <div className="h-24 w-24 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                    <Package className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center">{product.name}</h3>
                <p className="text-sm font-mono text-gray-500 mt-1">{product.productId}</p>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center text-gray-500">
                                <Tag className="h-4 w-4 mr-2" />
                                <span>Category</span>
                            </div>
                            <span className="font-medium text-gray-900">{product.category}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center text-gray-500">
                                <Banknote className="h-4 w-4 mr-2" />
                                <span>Price</span>
                            </div>
                            <span className="font-medium text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center text-gray-500">
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                <span>Stock Status</span>
                            </div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                In Stock
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                    <div className="prose prose-sm text-gray-500">
                        <p>
                            High-quality {product.category.toLowerCase()} product. Only the best materials used.
                            Great addition to your collection.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
