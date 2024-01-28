import { Router } from '@vaadin/router';

// console.log(import.meta.env.MODE);
// console.log(import.meta.env.BASE_URL);

const BASE = import.meta.env.MODE === 'production' ? import.meta.env.BASE_URL : '';

const outlet = document.querySelector('#outlet');
const router = new Router(outlet);

// eslint-disable-next-line import/prefer-default-export
export { router, BASE };