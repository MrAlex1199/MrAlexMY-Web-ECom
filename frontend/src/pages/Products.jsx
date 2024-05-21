import React, { useState } from "react";
import { Link } from 'react-router-dom';

export const products = [
    { 
      id: "1",
      name: 'Basic Tee 6-Pack',
      price: '$192',
      href: '#',
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      imageAlt: "Two each of gray, white, and black shirts laying flat.",
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
    {
      id: "2",
      name: 'Basic Tee 6-Pack',
      price: '$500',
      href: '#',
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      imageAlt: "Two each of gray, white, and black shirts laying flat.",
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
    { 
      id: "3",
      name: 'Basic Tee 6-Pack',
      price: '$600',
      href: '#',
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      imageAlt: "Two each of gray, white, and black shirts laying flat.",
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
    { 
      id: "4",
      name: 'Basic Tee 6-Pack',
      price: '$192',
      href: '#',
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      imageAlt: "Two each of gray, white, and black shirts laying flat.",
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
    { 
      id: "5",
      name: 'Basic Tee 6-Pack',
      price: '$192',
      href: '#',
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      imageAlt: "Two each of gray, white, and black shirts laying flat.",
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
    { 
      id: "6",
      name: 'Basic Tee 6-Pack',
      price: '$192',
      href: '#',
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      imageAlt: "Two each of gray, white, and black shirts laying flat.",
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
    { 
      id: "7",
      name: 'Basic Tee 6-Pack',
      price: '$192',
      href: '#',
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      imageAlt: "Two each of gray, white, and black shirts laying flat.",
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
    { 
      id: "8",
      name: 'Basic Tee 6-Pack',
      price: '$192',
      href: '#',
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      imageAlt: "Two each of gray, white, and black shirts laying flat.",
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
    { 
      id: "9",
      name: 'Basic Tee 6-Pack',
      price: '$192',
      href: '#',
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      imageAlt: "Two each of gray, white, and black shirts laying flat.",
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
    { 
      id: "10",
      name: 'Basic Tee 6-Pack',
      price: '$192',
      href: '#',
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      imageAlt: "Two each of gray, white, and black shirts laying flat.",
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
    { 
      id: "11",
      name: 'Basic Tee 6-Pack',
      price: '$192',
      href: '#',
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      imageAlt: "Two each of gray, white, and black shirts laying flat.",
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
  ]
  
  const productsPerPage = 8;

  export default function Products() {
    const [currentPage, setCurrentPage] = useState(1);
  
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
      <div>
      {/* Products map */}
        <div className="card rounded-lg shadow-md mt-1 mx-10 bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="text-center text-2xl p-10 font-bold ">
              <p>ALL PRODUCTS</p>
            </div>
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {currentProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                </Link>
              ))}
            </div>
    
            {/* Pagination */}
            <nav className="mt-8" aria-label="Pagination">
              <ul className="flex justify-center">
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`${
                        i + 1 === currentPage ? "text-gray-900" : "text-gray-500"
                      } inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }

  

          
