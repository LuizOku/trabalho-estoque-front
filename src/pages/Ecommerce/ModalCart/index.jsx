import React, { useState } from 'react';

import { Modal, InputCommon } from '../../../components';

import {
  CartFooter,
  PaymentMethod,
  PaymentOption,
  CheckoutCartButton,
  CancelCartButton,
  PaymentTitle,
} from './styles.css';
import { ProductCard, CardHeader, CardBody } from '../styles.css';

const ModalCart = ({
  isCartOpen,
  shoppingCartId,
  productsOnCart,
  checkoutProductsOnCart,
  cancelProductsOnCart,
  setCartOpen,
}) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState('slip');
  const [cardHash, setCardHash] = useState('');

  const closeCart = () => {
    setSelectedPaymentType('slip');
    setCardHash('');
    setCartOpen(false);
  };

  const cancelCart = () => {
    setSelectedPaymentType('slip');
    setCardHash('');
    cancelProductsOnCart();
  };

  const handleCheckout = async () => {
    const data = {
      isBankSlip: selectedPaymentType === 'slip',
      cardHash,
      shoppingCartId,
    };
    await checkoutProductsOnCart(data);
    setSelectedPaymentType('slip');
    setCardHash('');
  };

  return (
    <Modal
      open={isCartOpen}
      width={600}
      height={600}
      title={shoppingCartId ? 'Carrinho' : 'Carrinho está vazio'}
      handleClose={closeCart}
    >
      {productsOnCart &&
        productsOnCart.map((pr) => (
          <ProductCard key={pr._id} isCart>
            <CardHeader>
              <h3>{pr.product.name}</h3>
              <span>R$ {pr.quantity * pr.product.calculatedPrice}</span>
            </CardHeader>
            <CardBody>
              <p>
                <b>Quantidade: </b>
                {pr.quantity}
              </p>
              <p>
                <b>Preço unidade: </b>
                {pr.product.calculatedPrice}
              </p>
            </CardBody>
          </ProductCard>
        ))}
      {shoppingCartId && (
        <>
          <PaymentTitle>Forma de pagamento:</PaymentTitle>
          <PaymentMethod>
            <PaymentOption
              selected={selectedPaymentType === 'slip'}
              onClick={() => setSelectedPaymentType('slip')}
            >
              Boleto
            </PaymentOption>
            <PaymentOption
              selected={selectedPaymentType === 'card'}
              onClick={() => setSelectedPaymentType('card')}
            >
              Cartão
            </PaymentOption>
            {selectedPaymentType === 'card' && (
              <InputCommon
                placeholder="Número do cartão"
                value={cardHash}
                onChange={(e) => setCardHash(e.target.value)}
              />
            )}
          </PaymentMethod>
          <CartFooter>
            <CheckoutCartButton onClick={handleCheckout}>
              Finalizar compra
            </CheckoutCartButton>
            <CancelCartButton onClick={cancelCart}>
              Cancelar compra
            </CancelCartButton>
          </CartFooter>
        </>
      )}
    </Modal>
  );
};

export default ModalCart;
