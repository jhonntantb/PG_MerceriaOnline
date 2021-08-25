import { combineReducers } from 'redux';
import bundleReducer from '../actions/bundle/reducer';
import categoryReducer from '../actions/category/reducer';
import loginReducer from '../actions/login/reducer';
import cartReducer from '../actions/cart/reducer';
import officeReducer from '../actions/office/reducer';
import orderReducer from '../actions/order/reducer';
import productReducer from '../actions/product/reducer';
import reviewReducer from '../actions/review/reducer';
import stockReducer from '../actions/stock/reducer';
import userReducer from '../actions/user/reducer';
import checkoutReducer from '../actions/checkout/reducer';
import wishlistReducer from '../actions/wishlist/reducer';
import mailReducer from '../actions/mail/reducer';
import scheduleReducer from '../actions/schedule/reducer';

const rootReducer = combineReducers(
    {
        bundleReducer,
        categoryReducer,
        loginReducer,
        officeReducer,
        orderReducer,
        productReducer,
        reviewReducer,
        stockReducer,
        userReducer,
        cartReducer,
        checkoutReducer,
        wishlistReducer,
        mailReducer,
        scheduleReducer
    }
);

export default rootReducer;
