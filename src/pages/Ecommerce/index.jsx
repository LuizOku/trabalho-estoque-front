import React, { useState, useEffect, useCallback } from 'react';

import { FiShoppingCart } from 'react-icons/fi';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';
import { Header, FabButton, Loader } from '../../components';

import ModalCart from './ModalCart';
import {
  Container,
  Body,
  FilterContainer,
  Filter,
  ProductCard,
  ProductCardsContainer,
  CardHeader,
  CardBody,
  CardFooter,
  AddCartButton,
} from './styles.css';

const Ecommerce = () => {
  const { addToast } = useToasts();
  const [isCartOpen, setCartOpen] = useState(false);
  const [productType, setProductType] = useState('all');
  const [products, setProducts] = useState([]);
  const [productsOnCart, setProductsOnCart] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [shoppingCartId, setShoppingCartId] = useState('');

  const getAllProducts = useCallback(async () => {
    try {
      const { data } = await api.get('all-product');
      if (data && data.product) {
        setProducts(data.product);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setProducts([]);
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  }, [addToast]);

  const getCampaignProducts = useCallback(async () => {
    try {
      const { data } = await api.get('campaing');
      if (data && data.campaing && data.campaing.length > 0) {
        setProducts(data.campaing[0].products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setProducts([]);
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  }, [addToast]);

  const getRecommendedProducts = useCallback(async () => {
    try {
      const { data } = await api.get('recommendedProduct');
      if (data && data.productsRecommended) {
        setProducts(data.productsRecommended);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setProducts([]);
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  }, [addToast]);

  const getProducts = useCallback(async () => {
    setShowLoader(true);
    if (productType === 'all') {
      await getAllProducts();
    }
    if (productType === 'campaign') {
      await getCampaignProducts();
    }
    if (productType === 'recommended') {
      await getRecommendedProducts();
    }
    setShowLoader(false);
    return;
  }, [
    productType,
    getAllProducts,
    getCampaignProducts,
    getRecommendedProducts,
  ]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const getProductsOnCart = async () => {
    setShowLoader(true);
    try {
      const { data } = await api.get('active-shopping-cart');
      setShowLoader(false);
      if (data && data.shoppingCart && data.shoppingCart.length > 0) {
        setProductsOnCart(data.shoppingCart[0].productsQuantity);
        setShoppingCartId(data.shoppingCart[0]._id);
      } else {
        setProductsOnCart([]);
        setShoppingCartId('');
      }
      setCartOpen(true);
    } catch (err) {
      setProductsOnCart([]);
      setShowLoader(false);
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  };

  const addToCart = async (product) => {
    try {
      setShowLoader(true);
      const { status } = await api.post('shopping-cart', {
        product,
        quantity: 1,
      });
      setShowLoader(false);
      if (status === 200) {
        addToast('Produto adicionado ao carrinho', {
          appearance: 'success',
        });
      }
    } catch (err) {
      setShowLoader(false);
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  };

  const checkoutProductsOnCart = async (obj) => {
    setShowLoader(true);
    try {
      const { data } = await api.post('checkout', obj);
      setShowLoader(false);
      if (data) {
        setCartOpen(false);
        setProductsOnCart([]);
        setShoppingCartId('');
        addToast('Compra realizada com sucesso', {
          appearance: 'success',
        });
      }
    } catch (err) {
      setShowLoader(false);
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  };

  const cancelProductsOnCart = async () => {
    setShowLoader(true);
    try {
      const { data } = await api.patch(
        `shopping-cart/deactivate/${shoppingCartId}`
      );
      setShowLoader(false);
      if (data) {
        setCartOpen(false);
        setProductsOnCart([]);
        setShoppingCartId('');
        addToast('Compra cancelada com sucesso', {
          appearance: 'success',
        });
      }
    } catch (err) {
      setShowLoader(false);
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  };

  return (
    <>
      <ModalCart
        isCartOpen={isCartOpen}
        shoppingCartId={shoppingCartId}
        productsOnCart={productsOnCart}
        checkoutProductsOnCart={checkoutProductsOnCart}
        cancelProductsOnCart={cancelProductsOnCart}
        setCartOpen={setCartOpen}
      />
      <Loader showLoader={showLoader} />
      <Container>
        <Header />
        <Body>
          <FilterContainer>
            <Filter
              selected={productType === 'all'}
              onClick={() => setProductType('all')}
            >
              <span>Todos produtos</span>
            </Filter>
            <Filter
              selected={productType === 'campaign'}
              onClick={() => setProductType('campaign')}
            >
              <span>Destaques/Campanha</span>
            </Filter>
            <Filter
              selected={productType === 'recommended'}
              onClick={() => setProductType('recommended')}
            >
              <span>Recomendados</span>
            </Filter>
          </FilterContainer>
          <ProductCardsContainer>
            {products &&
              products.map((pr) => (
                <ProductCard key={pr?._id}>
                  <CardHeader>
                    <h3>{pr?.name}</h3>
                    <span>R$ {pr?.calculatedPrice}</span>
                  </CardHeader>
                  <CardBody>
                    <p>
                      <b>Código: </b>
                      {pr?.code}
                    </p>
                    <p>
                      <b>Disponível: </b>
                      {pr?.totalQuantity}
                    </p>
                  </CardBody>
                  <CardFooter>
                    <AddCartButton onClick={() => addToCart(pr?._id)}>
                      Adicionar ao carrinho
                    </AddCartButton>
                  </CardFooter>
                </ProductCard>
              ))}
          </ProductCardsContainer>
        </Body>
        <FabButton onClick={getProductsOnCart}>
          <FiShoppingCart />
        </FabButton>
      </Container>
    </>
  );
};

export default Ecommerce;
