'use client';

import React, { useEffect, useState } from 'react';
import { getAuthData } from '@/utils/getAuthData';

const ReportPage = () => {
  const [user, setUser] = useState(null);
  const [analysis, setAnalysis] = useState([]);
  const [products, setProducts] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [form, setForm] = useState({
    product: '',
    quantity: 1,
    pharmacy: '',
    notes: '',
  });

  // 1. Fetch user and analysis separately
  useEffect(() => {
    const u = getAuthData();
    setUser(u.user);

    if (u?.user?._id) {
      fetch(`http://localhost:8000/analysis/report/${u.user._id}`)
        .then(res => res.json())
        .then((data) => {
          setAnalysis(data)
          console.log('Fetched analysis data:', data);
        });
    }
  }, []);

  // 2. Only fetch products when analysis is available
  useEffect(() => {
    if (analysis[analysis.length -1]?.defects) {
      fetch(`http://localhost:8000/products/recommendations/${analysis[analysis.length -1].defects}`)
        .then(res => res.json())
        .then(data => setProducts(data.slice(0, 20)));
    }
  }, [analysis]);

  // 3. Fetch pharmacies separately (if always needed)
  // useEffect(() => {
  //   fetch('/api/pharmacies')
  //     .then(res => res.json())
  //     .then(data => setPharmacies(data));
  // }, []);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleCustomOrder = async e => {
    e.preventDefault();
    await fetch('/api/custom-order', {
      method: 'POST',
      body: JSON.stringify({ ...form, userId: user?.id }),
      headers: { 'Content-Type': 'application/json' },
    });
    alert('Order submitted!');
    setForm({ product: '', quantity: 1, pharmacy: '', notes: '' });
  };

  return (
    <div className="bg-[#fffceb] min-h-screen py-10 px-3 md:px-6 font-[Jost]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center">
          Skin Analysis Report
        </h1>

        {/* Display report details only if available */}
        {user && analysis ? (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col sm:flex-row gap-6 items-center">
            <div className="flex-shrink-0">
              <img
                src={analysis[analysis.length -1]?.image}
                alt="Skin Analysis"
                className="w-40 h-40 rounded-lg object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">Analysis Results</h2>
              <div className="space-y-1 mb-3">
                <div>
                  <span className="font-semibold text-pink-600">Name:</span> {user?.name}
                </div>
                <div>
                  <span className="font-semibold text-pink-600">Detected Issue/s:</span> {analysis[analysis.length -1]?.defects[0].oil_vs_dry?.label + " " + analysis[analysis.length -1]?.defects[0].acne?.label + " " + analysis[analysis.length -1]?.defects[0].wrinkles.label}
                </div>
                <div>
                  <span className="font-semibold text-pink-600">Report ID:</span> {analysis[analysis.length -1]?._id}
                </div>
                <div>
                  <span className="font-semibold text-pink-600">Issued On:</span> {analysis[analysis.length -1]?.createdAt}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center text-pink-600">
            Loading report details...
          </div>
        )}

        {/* Products only if fetched */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 text-center md:text-left">
            Recommended Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.length > 0 ? products.map(product => (
              <div
                key={product._id}
                className="bg-white border border-pink-200 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <a 
                  href={product.product_href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block overflow-hidden rounded-t-xl"
                  aria-label={`View details for ${product.product_name}`}
                >
                  <img
                    src={product.picture_src}
                    alt={product.product_name}
                    loading="lazy"
                    className="w-full h-48 object-cover rounded-t-xl filter brightness-90 hover:brightness-100 transition duration-300"
                  />
                </a>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-pink-600 text-lg mb-1 truncate" title={product.product_name}>
                      {product.product_name}
                    </h3>
                    <p className="text-gray-700 text-sm mb-2 line-clamp-3" title={product.description}>
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="text-pink-500 font-bold text-xl mb-2">
                      {product.price}
                    </div>
                    <div className="text-xs text-gray-500 italic mb-1 truncate" title={product.notable_effects}>
                      Effects: {product.notable_effects}
                    </div>
                    <div className="text-xs text-gray-400 truncate" title={product.skintype}>
                      Skin Type: {product.skintype}
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full w-full text-center text-gray-400 py-6">
                No recommended products. Please complete your analysis.
              </div>
            )}
          </div>
        </div>

        {/* AR Experience Card */}
        <div className="mt-10 flex justify-center mb-12">
          <div className="bg-pink-50 rounded-xl shadow-md p-8 flex items-center flex-col w-full max-w-md">
            <img
              src="/ar_view.jpg"
              className="w-32 h-32 mb-3 rounded-full bg-pink-100 object-cover"
            />
            <h3 className="text-lg font-semibold mb-2 text-gray-800">See AR View</h3>
            <p className="text-gray-600 mb-5 text-center">Try skincare virtually with our interactive AR experience and visualize your skin transformation.</p>
            <button className="bg-pink-500 px-6 py-2 rounded-lg text-white font-bold shadow hover:bg-pink-600 transition">
              Try AR View
            </button>
          </div>
        </div>

        {/* Custom Order Form */}
        <div className="bg-white rounded-xl shadow-md p-8 mt-8 max-w-xl mx-auto">
          <h2 className="text-xl font-bold mb-3 text-pink-500">Custom Order To Pharmacy (Only For Subscribed Users)</h2>
          <form onSubmit={handleCustomOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Product</label>
              <input
                name="product"
                value={form.product}
                onChange={handleFormChange}
                type="text"
                placeholder="Enter product name"
                className="w-full border rounded p-2 text-gray-700 focus:ring-2 focus:ring-pink-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Quantity</label>
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleFormChange}
                type="number"
                min={1}
                className="w-full border rounded p-2 text-gray-700 focus:ring-2 focus:ring-pink-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Select Pharmacy</label>
              <select
                name="pharmacy"
                value={form.pharmacy}
                onChange={handleFormChange}
                className="w-full border rounded p-2 text-gray-700 focus:ring-2 focus:ring-pink-200"
                required
              >
                <option value="">Select a pharmacy</option>
                {pharmacies.map(pharmacy => (
                  <option key={pharmacy.id} value={pharmacy.id}>
                    {pharmacy.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Additional Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleFormChange}
                placeholder="Any special instructions?"
                className="w-full border rounded p-2 text-gray-700 focus:ring-2 focus:ring-pink-200"
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="bg-pink-500 px-6 py-2 mt-2 rounded-lg text-white font-bold shadow hover:bg-pink-600 transition w-full"
            >
              Submit Custom Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
