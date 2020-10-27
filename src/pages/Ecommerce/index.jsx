import React, { useState, useEffect, useCallback } from 'react';

import { FiShoppingCart } from 'react-icons/fi';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';
import { Header, FabButton, Modal, Loader } from '../../components';

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
  CartFooter,
  CheckoutCartButton,
} from './styles.css';

const productsMock = [
  {
    product: {
      _id: '912n01m',
      name: 'Arroz',
      code: '020212',
      calculatedPrice: 10.5,
    },
    quantity: 12,
  },
  {
    product: {
      _id: '19031n',
      name: 'Feijao',
      code: '130284',
      calculatedPrice: 12.5,
    },
    quantity: 10,
  },
];

const Ecommerce = () => {
  const { addToast } = useToasts();
  const [isCartOpen, setCartOpen] = useState(false);
  const [productType, setProductType] = useState('all');
  const [products, setProducts] = useState([]);
  const [productsOnCart, setProductsOnCart] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

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
      const { data } = await api.get('recommended');
      if (data && data.recommended) {
        setProducts(data.recommended);
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
    setTimeout(() => {
      setShowLoader(false);
      setCartOpen(true);
    }, 1000);

    // setShowLoader(true);
    // try {
    //   const { data } = await api.get('shopping-cart');
    //   setShowLoader(false);
    //   if (data && data.products && data.products.productsQuantity) {
    //     setProductsOnCart(data.products.productsQuantity);
    //   }
    //   setProductsOnCart([]);
    //   setCartOpen(true);
    // } catch (err) {
    //   setProductsOnCart([]);
    //   setShowLoader(false);
    //   if (err.response) {
    //     addToast(err.response?.data?.error || err.response?.data?.message, {
    //       appearance: 'error',
    //     });
    //   }
    // }
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

  const checkoutProductsOnCart = async () => {
    setShowLoader(true);
    try {
      const { data } = await api.post('checkout');
      setShowLoader(false);
      if (data) {
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

  return (
    <>
      <Modal
        open={isCartOpen}
        width={500}
        height={500}
        title="Carrinho"
        handleClose={() => setCartOpen(false)}
      >
        {productsMock &&
          productsMock.map((pr) => (
            <ProductCard key={pr?.product?._id} isCart>
              <CardHeader>
                <h3>{pr?.product?.name}</h3>
                <span>R$ {pr?.quantity * pr?.product?.calculatedPrice}</span>
              </CardHeader>
              <CardBody>
                <p>
                  <b>Quantidade: </b>
                  {pr?.quantity}
                </p>
                <p>
                  <b>Preço unidade: </b>
                  {pr?.product?.calculatedPrice}
                </p>
              </CardBody>
            </ProductCard>
          ))}
        <CartFooter>
          <CheckoutCartButton onClick={checkoutProductsOnCart}>
            Finalizar compra
          </CheckoutCartButton>
        </CartFooter>
      </Modal>
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
