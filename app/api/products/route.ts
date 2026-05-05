import { NextRequest, NextResponse } from 'next/server';

// Mock database
let products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 79.99,
    cost: 35.00,
    stock: 45,
    sku: 'WH-001',
    status: 'active',
    description: 'High-quality wireless headphones with noise cancellation',
    image: '/placeholder.jpg',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: '2',
    name: 'USB-C Cable',
    category: 'Accessories',
    price: 12.99,
    cost: 3.50,
    stock: 120,
    sku: 'USB-001',
    status: 'active',
    description: 'Durable USB-C charging cable',
    image: '/placeholder.jpg',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const product = products.find(p => p.id === id);
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newProduct = {
      id: String(Math.max(...products.map(p => parseInt(p.id)), 0) + 1),
      ...body,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    products.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    products[productIndex] = {
      ...products[productIndex],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    return NextResponse.json(products[productIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const deletedProduct = products.splice(productIndex, 1)[0];
    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 400 }
    );
  }
}
