import { atom, selector, useRecoilValue } from 'recoil';
import { getAllProduct } from '../utils/useAPI';

const productState = atom({
  key: 'productState',
  default: [],
});

const productList = selector({
  key: 'productList',
  get: async ({ get }) => {
    const products = get(productState);
    const data = await getAllProduct(true);

    return data;
  },
});
