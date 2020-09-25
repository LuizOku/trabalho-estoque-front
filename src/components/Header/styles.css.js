import styled from "styled-components";

import Button from '../Button';
import colors from '../../styles/colors';

export const Nav = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed !important;
  top: 0;
  right: 0;
  left: 0;
  background: #ffffff;
  box-shadow: 0 2px 3px rgba(0,0,0,.08);
`;

export const Container = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SignOutButton = styled(Button)`
  width: 100px;
`;

export const MenuContainer = styled.div`
  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    margin-left: 36px;
    top: 25px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: ${() => colors.primary};
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: ${() => colors.tertiary};
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: ${() => colors.primary};
  }

  /*
  Sidebar wrapper styles
  Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
  */
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    background: #ffffff;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #ffffff;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }

  a {
    margin: 10px 0 10px 0;
    color: ${() => colors.primary};
    text-decoration: none;
    font-weight: bold;
    &:hover {
      color: ${() => colors.secondary};
  }
  }
`;